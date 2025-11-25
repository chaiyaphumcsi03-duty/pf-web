// ใส่ URL Web App ของ Google Apps Script ตรงนี้
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwICmEHVEskXRbhjFHoNmtxEwX82YyysfetNKVYs9J3dGD7gnZQbIF_SjH96HHxUvpjeQ/exec";

/**
 *  รายชื่อ 29 สถานีตำรวจ
 *  👉 แก้ให้เป็นรายชื่อจริงของหน่วยคุณได้เลย
 */
const STATIONS = [
  "สภ.เมืองตัวอย่าง",
  "สภ.บ้านตัวอย่าง 1",
  "สภ.บ้านตัวอย่าง 2",
  "สภ.ตัวอย่างเหนือ",
  "สภ.ตัวอย่างใต้",
  "สภ.ตัวอย่างตะวันออก",
  "สภ.ตัวอย่างตะวันตก",
  "สภ.ตัวอย่าง 8",
  "สภ.ตัวอย่าง 9",
  "สภ.ตัวอย่าง 10",
  "สภ.ตัวอย่าง 11",
  "สภ.ตัวอย่าง 12",
  "สภ.ตัวอย่าง 13",
  "สภ.ตัวอย่าง 14",
  "สภ.ตัวอย่าง 15",
  "สภ.ตัวอย่าง 16",
  "สภ.ตัวอย่าง 17",
  "สภ.ตัวอย่าง 18",
  "สภ.ตัวอย่าง 19",
  "สภ.ตัวอย่าง 20",
  "สภ.ตัวอย่าง 21",
  "สภ.ตัวอย่าง 22",
  "สภ.ตัวอย่าง 23",
  "สภ.ตัวอย่าง 24",
  "สภ.ตัวอย่าง 25",
  "สภ.ตัวอย่าง 26",
  "สภ.ตัวอย่าง 27",
  "สภ.ตัวอย่าง 28",
  "สภ.ตัวอย่าง 29"
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