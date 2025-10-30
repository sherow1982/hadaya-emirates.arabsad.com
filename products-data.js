// بيانات المنتجات - هدايا الإمارات
const WATCHES_DATA = [
  {
    "id": "1",
    "title": "ساعة كلاسيكية يخت ماستر فضي",
    "price": 370,
    "sale_price": 320,
    "image_link": "https://m5zoon.com/public/uploads/products/1689086291310824.webp"
  },
  {
    "id": "2",
    "title": "ساعة كلاسيكية 41 ملم",
    "price": 375,
    "sale_price": 325,
    "image_link": "https://m5zoon.com/public/uploads/products/1741223185271965.png"
  },
  {
    "id": "3",
    "title": "ساعة أنيقة باللون الأسود",
    "price": 364,
    "sale_price": 314,
    "image_link": "https://m5zoon.com/public/uploads/products/1681005528571671.webp"
  },
  {
    "id": "4",
    "title": "ساعة رياضية 40 ملم",
    "price": 365,
    "sale_price": 315,
    "image_link": "https://m5zoon.com/public/uploads/products/1681164046332341.webp"
  },
  {
    "id": "5",
    "title": "ساعة بألوان ملكية خضراء",
    "price": 364,
    "sale_price": 314,
    "image_link": "https://m5zoon.com/public/uploads/products/1741222920546873.png"
  },
  {
    "id": "6",
    "title": "ساعة ذهبية وأسود أنيقة",
    "price": 360,
    "sale_price": 310,
    "image_link": "https://m5zoon.com/public/uploads/products/1757284688463569.webp"
  }
];

const PERFUMES_DATA = [
  {
    "id": "1",
    "title": "عطر كوكو شانيل 100 مل",
    "price": 352,
    "sale_price": 252,
    "image_link": "https://m5zoon.com/public/uploads/products/1722352332177124.webp"
  },
  {
    "id": "2",
    "title": "عطر جوتشي فلورا",
    "price": 352,
    "sale_price": 252,
    "image_link": "https://m5zoon.com/public/uploads/products/1720344963790342.webp"
  },
  {
    "id": "3",
    "title": "عطر جوتشي بلوم",
    "price": 352,
    "sale_price": 252,
    "image_link": "https://m5zoon.com/public/uploads/products/1720344971935939.webp"
  },
  {
    "id": "4",
    "title": "عطر سوفاج ديور 100 مل",
    "price": 352,
    "sale_price": 252,
    "image_link": "https://m5zoon.com/public/uploads/products/1720344979304336.webp"
  },
  {
    "id": "5",
    "title": "عطر فرزاتشي ايروس",
    "price": 352,
    "sale_price": 252,
    "image_link": "https://m5zoon.com/public/uploads/products/1720345001981811.webp"
  },
  {
    "id": "6",
    "title": "فواحة عطرية للسيارة",
    "price": 364,
    "sale_price": 264,
    "image_link": "https://m5zoon.com/public/uploads/products/1722352237120309.webp"
  }
];

function createSlug(title) {
    return title
        .replace(/[أإآا]/g, 'ا')
        .replace(/[ة]/g, 'ه')
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FF\w-]/g, '')
        .replace(/--+/g, '-')
        .replace(/^-|-$/g, '');
}

function createProductCard(product, type = 'watch') {
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
    const slug = createSlug(product.title);
    const link = `products/${slug}.html`;
    
    return `
        <div class="product-card" onclick="trackProductClick('${product.title}', '${type}')">
            <div class="product-image">
                <img src="${product.image_link}" alt="${product.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300/667eea/ffffff?text=منتج'">
                <div class="discount-badge">${discount}% خصم</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${product.sale_price} درهم</span>
                    <span class="old-price">${product.price} درهم</span>
                </div>
                <div class="product-actions">
                    <a href="${link}" class="btn btn-primary">شاهد المزيد</a>
                    <a href="https://wa.me/201110760081?text=مرحباً، أريد شراء ${product.title} بسعر ${product.sale_price} درهم" class="btn btn-secondary" target="_blank">اشتر الآن 🛒</a>
                </div>
            </div>
        </div>
    `;
}

function trackProductClick(title, type) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'product_click', {
            'event_category': 'products',
            'event_label': title,
            'custom_parameters': {
                'product_type': type
            }
        });
    }
}

function loadWatches() {
    const watchesGrid = document.getElementById('watches-grid');
    if (watchesGrid) {
        watchesGrid.innerHTML = WATCHES_DATA.map(watch => createProductCard(watch, 'watch')).join('');
    }
}

function loadPerfumes() {
    const perfumesGrid = document.getElementById('perfumes-grid');
    if (perfumesGrid) {
        perfumesGrid.innerHTML = PERFUMES_DATA.map(perfume => createProductCard(perfume, 'perfume')).join('');
    }
}

function loadAllProducts() {
    loadWatches();
    loadPerfumes();
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.03)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllProducts();
    if (typeof gtag !== 'undefined') {
        gtag('event', 'products_loaded', {
            'event_category': 'catalog',
            'watches_count': WATCHES_DATA.length,
            'perfumes_count': PERFUMES_DATA.length
        });
    }
    console.log('✅ تم تحميل المنتجات بنجاح:', {
        'ساعات': WATCHES_DATA.length,
        'عطور': PERFUMES_DATA.length
    });
});

window.HADAYA_PRODUCTS = {
    watches: WATCHES_DATA,
    perfumes: PERFUMES_DATA,
    loadAll: loadAllProducts
};