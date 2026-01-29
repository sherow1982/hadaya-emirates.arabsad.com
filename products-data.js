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
 * أضفت هنا رابط حول البطاقة بالكامل لضمان التوجه لصفحة المنتج
 */
function createProductCard(product, type = 'watch') {
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
    // نفترض أن رابط صفحة المنتج يعتمد على الـ ID
    const productPageUrl = `product-details.html?id=${product.id}`; 
    
    return `
        <div class="product-card" data-id="${product.id}" data-title="${product.title}">
            <a href="${productPageUrl}" class="product-link-wrapper" style="text-decoration: none; color: inherit; display: block;">
                <div class="product-image">
                    <img src="${product.image_link}" alt="${product.title}" loading="lazy">
                    <div class="discount-badge">${discount}% خصم</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.sale_price} درهم</span>
                        <span class="old-price">${product.price} درهم</span>
                    </div>
                </div>
            </a>
            <div class="product-actions">
                <a href="https://wa.me/201110760081?text=مرحباً، أريد طلب ${product.title} بسعر ${product.sale_price} درهم" 
                   class="btn btn-primary" 
                   target="_blank"
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
        // تأثيرات الحركة
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
        
        // تتبع النقرات لـ Google Analytics
        card.addEventListener('click', function(e) {
            const title = this.getAttribute('data-title');
            if (typeof gtag === 'function') {
                gtag('event', 'view_item', {
                    'item_name': title,
                    'item_category': 'products'
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

window.HADAYA_PRODUCTS = {watches: WATCHES_DATA, perfumes: PERFUMES_DATA, loadAll: loadAllProducts};
