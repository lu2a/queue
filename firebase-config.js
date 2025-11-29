

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi5aUu2DN15ZYgV79SbJamndIv1ilr8QQ",
  authDomain: "queue-403b6.firebaseapp.com",
  databaseURL: "https://queue-403b6-default-rtdb.firebaseio.com",
  projectId: "queue-403b6",
  storageBucket: "queue-403b6.firebasestorage.app",
  messagingSenderId: "219447076856",
  appId: "1:219447076856:web:e7e187e29665b01917d80d",
  measurementId: "G-2TW7GHP5RR"
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
