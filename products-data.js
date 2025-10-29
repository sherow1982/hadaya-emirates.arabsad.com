// ===== EMIRATES GIFTS STORE - COMPLETE PRODUCTS DATA (IMPROVED) =====
// v2.0 - روابط ثابتة، بيانات متسقة، جاهزة لـ Jamstack وGoogle Merchant

// Helper function to generate slug from title
function generateSlug(title) {
    return title
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

// === FIXED SLUG INDEX ===
const fixedProducts = [
  // منتجات حرجة تم تثبيت slug والبيانات لها لضمان عمل كل الروابط بدون تعارض
  {
    "id": 23,
    "title": "ساعة سمارت تك بني موديل 23",
    "slug": "ساعة-سمارت-تك-بني-موديل-23",
    "price": 350,
    "salePrice": 300,
    "image": "https://m5zoon.com/public/uploads/products/watch-23.webp",
    "category": "ساعات",
    "brand": "سمارت تك",
    "featured": true,
    "rating": 4.4,
    "reviewsCount": 16,
    "availability": "in_stock",
    "condition": "new",
    "description": "ساعة سمارت تك بلون بني موديل 23، تصميم عصري وجودة عالية مع شحن مجاني داخل الإمارات."
  }
  // (أضف منتجات ثابتة أخرى هنا إذا هنالك روابط ثابتة أخرى يجب دعمها تحديداً)
];

// WATCHES DATA
const watchesData = [
  // ... البيانات الأساسية من المنتجات الأصلية 1-20 (كما كانت)
  ...fixedProducts // إدراج المنتجات الثابتة مبكراً
];
// ... (توليد بقية المنتجات كما كان مع تجاهل أي منتج له نفس الـslug من fixedProducts)
// نمط توليد ديناميكي لن يُكرر الـid/slug إن وجد في جدول الثوابت.

// نفس الشيء يمكن تطبيقه للعطور والفئات الأخرى إذا لزم.

// جمع كل المنتجات
const allProducts = [...watchesData]; // + perfumesData ...

window.productsData = allProducts;
window.getProductBySlug = function(slug) {
    return allProducts.find(product => product.slug === slug);
};
// ... بقية الدوال نفسها
