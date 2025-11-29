// firebase-config.js

// 1. تهيئة تطبيق Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // استبدل هذا
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // استبدل هذا
    projectId: "YOUR_PROJECT_ID", // استبدل هذا
    storageBucket: "YOUR_PROJECT_ID.appspot.com", // استبدل هذا
    messagingSenderId: "YOUR_SENDER_ID", // استبدل هذا
    appId: "YOUR_APP_ID", // استبدل هذا
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com" // استبدل هذا لـ Realtime DB
};

// تهيئة التطبيق
const app = firebase.initializeApp(firebaseConfig);

// تعريف المتغيرات للوصول السريع
const auth = firebase.auth();
const db = firebase.firestore(); // Firestore
const rtdb = firebase.database(); // Realtime Database

// دالة مساعدة لتحويل الأرقام إلى العربية الهندية
function toArabicNumbers(number) {
    const arabicMap = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(number).replace(/[0-9]/g, (d) => arabicMap[d]);
}

// دالة لجلب جميع العيادات لملء قوائم الاختيار
async function fetchClinics() {
    const clinicsSnapshot = await db.collection('Clinics').get();
    const clinics = [];
    clinicsSnapshot.forEach(doc => {
        clinics.push({ id: doc.id, ...doc.data() });
    });
    return clinics;
}

// دالة لملء قائمة الاختيار (Select) بالعيادات
function populateClinicSelect(elementId, clinics) {
    const selectElement = document.getElementById(elementId);
    if (!selectElement) return;

    // مسح الخيارات الحالية باستثناء الخيار الافتراضي
    selectElement.innerHTML = '<option value="">اختر العيادة</option>';

    clinics.forEach(clinic => {
        const option = document.createElement('option');
        option.value = clinic.id;
        option.textContent = clinic.clinicName;
        selectElement.appendChild(option);
    });
}
