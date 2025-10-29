# تحسين سرعة الصور (دون تغيير روابط image_link)

- تترك الصور الأصلية كما هي (image_link).
- للاستخدام في الإنتاج يمكنك تمرير الصورة عبر خدمة وسيطة (مثل imgproxy/cloudflare images) هكذا:

https://cdn.example.com/insecure/plain/{IMAGE_URL}@webp/quality:70/resize:fit:800

- في الشفرة الحالية يوجد fallback تلقائي لصورة مضغوطة إذا فشل التحميل.
- يمكن إضافة طبقة CDN بسهولة لاحقاً دون تعديل البيانات.
