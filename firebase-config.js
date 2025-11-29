// يجب التأكد من تحميل مكتبات Firebase عبر <script> tags في ملفات HTML قبل هذا الملف.

// إعدادات Firebase المقدمة من المستخدم
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

// تعريف المتغيرات في النطاق العالمي (window) لضمان الوصول إليها من كل صفحة
window.db = null;
window.rtdb = null;
window.auth = null;


// دالة لتهيئة Firebase وضمان أنها تعمل مرة واحدة فقط
window.initFirebase = function() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    // تخصيص متغيرات النطاق العالمي بعد التهيئة
    window.auth = firebase.auth();
    window.db = firebase.firestore(); // Firestore
    window.rtdb = firebase.database(); // Realtime Database
    console.log("✅ Firebase initialized successfully.");
}

// دالة مساعدة لتحويل الأرقام إلى العربية الهندية (متاحة عالمياً)
window.toArabicNumbers = function(number) {
    if (typeof number === 'string' && !/^\d+$/.test(number)) {
        return number;
    }
    const arabicMap = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(number).replace(/[0-9]/g, (d) => arabicMap[d]);
}

// دالة لجلب جميع العيادات لملء قوائم الاختيار (متاحة عالمياً)
window.fetchClinics = async function() {
    initFirebase(); // التأكد من التهيئة
    try {
        // يجب استخدام المتغير العالمي window.db
        const clinicsSnapshot = await window.db.collection('Clinics').get();
        const clinics = [];
        clinicsSnapshot.forEach(doc => {
            clinics.push({ id: doc.id, ...doc.data() });
        });
        console.log(`✅ Clinics fetched: ${clinics.length} found.`);
        return clinics;
    } catch (error) {
        // إذا فشل الجلب، تحقق من أنك قمت بإنشاء كوليكشن 'Clinics' وأن قواعد الأمان تسمح بالقراءة
        console.error("❌ Error fetching clinics from Firestore (Check Rules!):", error);
        return [];
    }
}

// دالة لملء قائمة الاختيار (Select) بالعيادات (متاحة عالمياً)
window.populateClinicSelect = function(elementId, clinics) {
    const selectElement = document.getElementById(elementId);
    if (!selectElement) return;

    selectElement.innerHTML = '<option value="">اختر العيادة</option>';

    if (clinics.length > 0) {
        clinics.forEach(clinic => {
            const option = document.createElement('option');
            option.value = clinic.id;
            option.textContent = clinic.clinicName;
            selectElement.appendChild(option);
        });
    } else {
         console.warn(`No clinics found for select element: ${elementId}`);
    }
}
