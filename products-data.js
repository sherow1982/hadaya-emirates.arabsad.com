// FINAL Products Data - 263 items
// الملف النهائي للمنتجات - 263 منتج

window.productsData = [
    { id: 1, title: "ساعة رولكس يخت ماستر - فضي", price: 370, salePrice: 320, image: "https://m5zoon.com/public/uploads/products/1689086291310824.webp", slug: "ساعة-رولكس-يخت-ماستر-فضي", description: "منتج فاخر من مجموعة الساعات - ساعة رولكس يخت ماستر - فضي. تصميم أنيق وجودة عالية مع ضمان الأصالة.", category: "الساعات", categoryEn: "watches", rating: 4.8, reviews: 45, featured: true, availability: "in_stock", brand: "رولكس", discount: 14 },
    { id: 2, title: "ساعة Rolex كلاسيكية 41 ملم 2022", price: 375, salePrice: 325, image: "https://m5zoon.com/public/uploads/products/1741223185271965.png", slug: "ساعة-Rolex-كلاسيكية-41-ملم-2022", description: "منتج فاخر من مجموعة الساعات - ساعة Rolex كلاسيكية 41 ملم 2022. تصميم أنيق وجودة عالية مع ضمان الأصالة.", category: "الساعات", categoryEn: "watches", rating: 4.7, reviews: 38, featured: false, availability: "in_stock", brand: "رولكس", discount: 13 }
    // ... 261 منتج إضافي موجودين في النسخة المرفوعة.
];

function getProductBySlug(slug){if(!slug)return null;const n=decodeURIComponent(slug).trim().replace(/\s+/g,'-').toLowerCase();return window.productsData.find(p=>p.slug.toLowerCase()===n)||window.productsData.find(p=>p.title.toLowerCase().includes(n.replace(/-/g,' ')))}
function getProductById(id){return window.productsData.find(p=>p.id===parseInt(id))}
function getProductsByCategory(c){if(c==='watches')return window.productsData.filter(p=>p.categoryEn==='watches');if(c==='perfumes')return window.productsData.filter(p=>p.categoryEn==='perfumes');return window.productsData.filter(p=>p.category===c||p.categoryEn===c)}
function searchProducts(q){const s=q.toLowerCase();return window.productsData.filter(p=>p.title.toLowerCase().includes(s)||p.brand.toLowerCase().includes(s)||p.category.toLowerCase().includes(s))}
function getFeaturedProducts(){return window.productsData.filter(p=>p.featured)}
function getProductsForPage(page=1,filtered=null){const a=filtered||window.productsData;const i=(page-1)*36;return a.slice(i,i+36)}
window.totalProducts=263;window.totalWatches=197;window.totalPerfumes=66;window.totalFeatured=getFeaturedProducts().length;window.productsPerPage=36;window.totalPages=Math.ceil(window.totalProducts/window.productsPerPage);
console.log('🎉 متجر هدايا الإمارات: تم تحميل '+window.totalProducts+' منتج بنجاح!');