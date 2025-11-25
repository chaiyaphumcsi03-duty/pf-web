// ใส่ URL Web App ของ Google Apps Script ตรงนี้
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwICmEHVEskXRbhjFHoNmtxEwX82YyysfetNKVYs9J3dGD7gnZQbIF_SjH96HHxUvpjeQ/exec";

/**
 *  รายชื่อ 29 สถานีตำรวจ
 *  👉 แก้ให้เป็นรายชื่อจริงของหน่วยคุณได้เลย
 */
const STATIONS = [
  "สภ.เมืองชัยภูมิ",
  "สภ.ภูเขียว",
  "สภ.จัตุรัส",
  "สภ.แก้งคร้อ",
  "สภ.คอนสวรรค์",
  "สภ.หนองบัวแดง",
  "สภ.บำเหน็จณรงค์",
  "สภ.เกษตรสมบูรณ์",
  "สภ.บ้านเขว้า",
  "สภ.บ้านแท่น",
  "สภ.คอนสาร",
  "สภ.หนองบัวระเหว",
  "สภ.เทพสถิต",
  "สภ.เนินสง่า",
  "สภ.ภักดีชุมพล",
  "สภ.ซับใหญ่",
  "สภ.บ้านค่าย",
  "สภ.ลาดใหญ่",
  "สภ.บ้านเป้า",
  "สภ.ห้วยยาง",
  "สภ.บ้านเดื่อ",
  "สภ.หนองบัวโคก",
  "สภ.วังตะเฆ่",
  "สภ.หัวทะเล",
  "สภ.โนนเหม่า",
  "สภ.บ้านเพชร",
  "สภ.ช่องสามหมอ",
  "สภ.หนองสังข์",
  "สภ.บ้านแก้ง"
];

function fillStationOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  STATIONS.forEach((st) => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st;
    select.appendChild(opt);
  });
}

// เติมสถานีตำรวจอัตโนมัติ
document.addEventListener("DOMContentLoaded", () => {
  fillStationOptions("stationAppointment");
  fillStationOptions("stationReport");
});

// ฟังก์ชันส่งฟอร์มทั่วไป
function handleFormSubmit(formId, statusId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const statusEl = document.getElementById(statusId);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "กำลังส่งข้อมูล...";
    statusEl.className = "status";

    const formData = new FormData(form);

    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: formData
    })
      .then((res) => res.text())
      .then((text) => {
        console.log("Response:", text);
        statusEl.textContent = "ส่งข้อมูลสำเร็จ ขอบคุณค่ะ/ครับ";
        statusEl.className = "status success";
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        statusEl.textContent = "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่";
        statusEl.className = "status error";
      });
  });
}

handleFormSubmit("appointmentForm", "appointmentStatus");

handleFormSubmit("reportForm", "reportStatus");
