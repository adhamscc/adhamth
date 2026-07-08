/* ============================================================
   إعدادات قابلة للتعديل - Editable Settings
   ============================================================ */
const CONTACT = {
  whatsappNumber: "962780185888", // رقم واتساب أدهم بصيغة دولية بدون + أو 00
  email: "adhamthiabat@gmail.com"
};

/* ============================================================
   تبديل اللغة عربي / إنجليزي
   ============================================================ */
const langToggleBtn = document.getElementById("langToggle");
const htmlEl = document.documentElement;

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-ar][data-en]");
  elements.forEach((el) => {
    const text = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
    if (el.tagName === "TITLE" || el.hasAttribute("data-html")) {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });

  const placeholders = document.querySelectorAll("[data-ar-ph][data-en-ph]");
  placeholders.forEach((el) => {
    el.setAttribute("placeholder", lang === "ar" ? el.getAttribute("data-ar-ph") : el.getAttribute("data-en-ph"));
  });

  htmlEl.setAttribute("lang", lang);
  htmlEl.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  langToggleBtn.textContent = lang === "ar" ? "EN" : "AR";
  localStorage.setItem("site-lang", lang);
}

langToggleBtn.addEventListener("click", () => {
  const current = htmlEl.getAttribute("lang") === "ar" ? "en" : "ar";
  setLanguage(current);
});

// استرجاع اللغة المحفوظة عند فتح الصفحة
const savedLang = localStorage.getItem("site-lang");
if (savedLang) setLanguage(savedLang);

/* ============================================================
   قائمة الجوال (Mobile Menu)
   ============================================================ */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ============================================================
   نموذج طلب الخدمة -> واتساب أو إيميل
   ============================================================ */
const form = document.getElementById("serviceForm");
const sendWhatsappBtn = document.getElementById("sendWhatsapp");
const sendEmailBtn = document.getElementById("sendEmail");

function buildMessage() {
  const name = document.getElementById("fullName").value.trim();
  const contact = document.getElementById("contactMethod").value.trim();
  const serviceType = document.getElementById("serviceType").value;
  const details = document.getElementById("projectDetails").value.trim();

  const isAr = htmlEl.getAttribute("lang") === "ar";

  if (isAr) {
    return `مرحباً، اسمي ${name}.\nطريقة التواصل: ${contact}\nنوع الخدمة: ${serviceType}\nتفاصيل المشروع: ${details}`;
  }
  return `Hello, my name is ${name}.\nContact: ${contact}\nService type: ${serviceType}\nProject details: ${details}`;
}

let submitAction = "whatsapp";

sendWhatsappBtn.addEventListener("click", () => { submitAction = "whatsapp"; });
sendEmailBtn.addEventListener("click", () => { submitAction = "email"; });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const message = buildMessage();

  if (submitAction === "whatsapp") {
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  } else {
    const isAr = htmlEl.getAttribute("lang") === "ar";
    const subject = isAr ? "طلب خدمة جديد من الموقع" : "New service request from the website";
    const url = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
  }
});

/* ============================================================
   تظليل الخلفية للـ navbar عند التمرير
   ============================================================ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
  } else {
    navbar.style.boxShadow = "none";
  }
});
