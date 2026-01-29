// بيانات المنتجات - هدايا الإمارات
const WATCHES_DATA = [
    {"id": "w1", "title": "ساعة كلاسيكية فضية", "price": 370, "sale_price": 320, "image_link": "https://m5zoon.com/public/uploads/products/1689086291310824.webp"},
    {"id": "w2", "title": "ساعة كلاسيكية 41 ملم", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741223185271965.png"},
    {"id": "w3", "title": "ساعة أنيقة سوداء", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1681005528571671.webp"},
    {"id": "w4", "title": "ساعة رياضية 40 ملم", "price": 365, "sale_price": 315, "image_link": "https://m5zoon.com/public/uploads/products/1681164046332341.webp"},
    {"id": "w5", "title": "ساعة خضراء مميزة", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1741222920546873.png"},
    {"id": "w6", "title": "ساعة ذهبية أنيقة", "price": 360, "sale_price": 310, "image_link": "https://m5zoon.com/public/uploads/products/1757284688463569.webp"}
];

const PERFUMES_DATA = [
    {"id": "p1", "title": "عطر فاخر 100 مل", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1722352332177124.webp"},
    {"id": "p2", "title": "عطر أنيق للجنسين", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344963790342.webp"},
    {"id": "p3", "title": "عطر زهري مميز", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344971935939.webp"},
    {"id": "p4", "title": "عطر راقي كلاسيكي", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344979304336.webp"},
    {"id": "p5", "title": "عطر عصري مميز", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720345001981811.webp"},
    {"id": "p6", "title": "فواحة سيارة عطرية", "price": 364, "sale_price": 264, "image_link": "https://m5zoon.com/public/uploads/products/1722352237120309.webp"}
];

/**
 * دالة إنشاء بطاقة المنتج
 */
function createProductCard(product, type = 'watch') {
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
    
    // تصحيح: الرابط يجب أن يوجه إلى مجلد products وملف product.html
    // استخدام المسار النسبي بدون سلاش في البداية ليعمل على GitHub Pages
    const productPageUrl = `products/product.html?id=${product.id}`; 
    
    return `
        <div class="product-card" data-id="${product.id}" data-title="${product.title}" style="transition: all 0.3s ease; cursor: pointer;">
            <a href="${productPageUrl}" class="product-link-wrapper" style="text-decoration: none; color: inherit; display: block;">
                <div class="product-image" style="position: relative; overflow: hidden; border-radius: 10px;">
                    <img src="${product.image_link}" alt="${product.title}" loading="lazy" style="width: 100%; display: block;">
                    <div class="discount-badge" style="position: absolute; top: 10px; right: 10px; background: #ff6b6b; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;">${discount}% خصم</div>
                </div>
                <div class="product-info" style="padding: 15px 0;">
                    <h3 class="product-title" style="margin: 0 0 10px 0; font-size: 1.1rem;">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price" style="color: #667eea; font-weight: bold; font-size: 1.2rem;">${product.sale_price} درهم</span>
                        <span class="old-price" style="text-decoration: line-through; color: #999; margin-right: 10px; font-size: 0.9rem;">${product.price} درهم</span>
                    </div>
                </div>
            </a>
            <div class="product-actions" style="margin-top: 10px;">
                <a href="https://wa.me/201110760081?text=مرحباً، أريد طلب ${product.title} بسعر ${product.sale_price} درهم" 
                   class="btn btn-primary" 
                   target="_blank"
                   style="display: block; background: #25d366; color: white; text-align: center; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold;"
                   onclick="event.stopPropagation();">🛒 اطلب عبر واتساب</a>
            </div>
        </div>
    `;
}

function loadWatches() {
    const grid = document.getElementById('watches-grid');
    if (grid) grid.innerHTML = WATCHES_DATA.map(w => createProductCard(w, 'watch')).join('');
}

function loadPerfumes() {
    const grid = document.getElementById('perfumes-grid'); 
    if (grid) grid.innerHTML = PERFUMES_DATA.map(p => createProductCard(p, 'perfume')).join('');
}

function initInteractions() {
    document.querySelectorAll('.product-card').forEach(card => {
        // تأثيرات الحركة عند تمرير الماوس
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
        
        // تتبع النقرات لـ Google Analytics
        card.addEventListener('click', function(e) {
            const title = this.getAttribute('data-title');
            if (typeof gtag === 'function') {
                gtag('event', 'select_content', {
                    'content_type': 'product',
                    'item_id': title
                });
            }
        });
    });
}

function loadAllProducts() {
    loadWatches();
    loadPerfumes();
    initInteractions();
}

// التشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadAllProducts);

// تصدير البيانات للاستخدام في صفحات أخرى
window.HADAYA_PRODUCTS = {
    watches: WATCHES_DATA, 
    perfumes: PERFUMES_DATA, 
    loadAll: loadAllProducts
};
