// Main JavaScript File - Hadaya Emirates Store
// ملف JavaScript الرئيسي - متجر هدايا الإمارات

// متغيرات عامة
let cart = JSON.parse(localStorage.getItem('hadaya-cart') || '[]');
let currentProduct = null;
let isLoading = false;

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    initializeStore();
    setupEventListeners();
    loadProducts();
    updateCartCount();
    
    // تتبع الأحداث للتحليلات
    trackPageView();
});

// تهيئة المتجر
function initializeStore() {
    console.log('تم تحميل متجر هدايا الإمارات');
    
    // تحميل معاملات UTM
    handleUTMParameters();
    
    // إعداد الرقم السنوي
    updateCopyrightYear();
    
    // إضافة مستمع التمرير
    setupScrollAnimations();
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // قائمة التنقل المحمول
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
    
    // إغلاق النافذة المنبثقة
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // مفاتيح اللوحة
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // رابط واتساب العائم
    const whatsappFloat = document.querySelector('.whatsapp-float a');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            trackEvent('WhatsApp', 'Click', 'Float Button');
        });
    }
}

// تحميل المنتجات
function loadProducts() {
    showLoading(true);
    
    setTimeout(() => {
        loadWatches();
        loadPerfumes();
        showLoading(false);
    }, 500);
}

// تحميل الساعات
function loadWatches() {
    const watchesGrid = document.getElementById('watches-grid');
    if (!watchesGrid || !watchesData) return;
    
    // عرض أول 8 ساعات
    const displayWatches = watchesData.slice(0, 8);
    
    watchesGrid.innerHTML = displayWatches.map(product => createProductCard(product, 'watch')).join('');
    
    // إضافة مستمعي النقر
    watchesGrid.querySelectorAll('.product-card').forEach((card, index) => {
        card.addEventListener('click', () => showProductModal(displayWatches[index], 'watch'));
    });
}

// تحميل العطور
function loadPerfumes() {
    const perfumesGrid = document.getElementById('perfumes-grid');
    if (!perfumesGrid || !perfumesData) return;
    
    // عرض أول 8 عطور
    const displayPerfumes = perfumesData.slice(0, 8);
    
    perfumesGrid.innerHTML = displayPerfumes.map(product => createProductCard(product, 'perfume')).join('');
    
    // إضافة مستمعي النقر
    perfumesGrid.querySelectorAll('.product-card').forEach((card, index) => {
        card.addEventListener('click', () => showProductModal(displayPerfumes[index], 'perfume'));
    });
}

// إنشاء بطاقة منتج
function createProductCard(product, type) {
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
    const slug = createSlug(product.title);
    
    return `
        <div class="product-card" data-id="${product.id}" data-type="${type}">
            <div class="product-image">
                <img src="${product.image_link}" alt="${product.title}" loading="lazy" onerror="handleImageError(this)">
                <div class="product-badge">${discount}% خصم</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">${product.sale_price} درهم</span>
                    <span class="original-price">${product.price} درهم</span>
                    <span class="discount">${discount}%</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-sm" onclick="addToCartFromCard('${product.id}', '${type}'); event.stopPropagation();">إضافة للسلة</button>
                    <button class="btn btn-secondary btn-sm" onclick="buyNowFromCard('${product.id}', '${type}'); event.stopPropagation();">شراء الآن</button>
                </div>
            </div>
        </div>
    `;
}

// عرض نافذة المنتج
function showProductModal(product, type) {
    currentProduct = { ...product, type };
    
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalSalePrice = document.getElementById('modalSalePrice');
    const modalDiscount = document.getElementById('modalDiscount');
    
    if (modal && modalImage && modalTitle && modalPrice && modalSalePrice && modalDiscount) {
        modalImage.src = product.image_link;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalPrice.textContent = `${product.price} درهم`;
        modalSalePrice.textContent = `${product.sale_price} درهم`;
        
        const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
        modalDiscount.textContent = `${discount}% خصم`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // تتبع عرض المنتج
        trackEvent('Product', 'View', product.title);
    }
}

// إغلاق النافذة المنبثقة
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentProduct = null;
    }
}

// إضافة للسلة من البطاقة
function addToCartFromCard(productId, type) {
    const products = type === 'watch' ? watchesData : perfumesData;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        addToCart(product, type);
        showNotification(`تم إضافة ${product.title} إلى السلة`, 'success');
        trackEvent('Cart', 'Add', product.title);
    }
}

// شراء مباشر من البطاقة
function buyNowFromCard(productId, type) {
    const products = type === 'watch' ? watchesData : perfumesData;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        buyNow(product);
    }
}

// إضافة للسلة
function addToCart(product = currentProduct, type = null) {
    if (!product) return;
    
    const cartItem = {
        id: `${type || product.type}_${product.id}`,
        productId: product.id,
        title: product.title,
        price: product.sale_price,
        originalPrice: product.price,
        image: product.image_link,
        type: type || product.type,
        quantity: 1,
        timestamp: Date.now()
    };
    
    const existingIndex = cart.findIndex(item => item.id === cartItem.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('hadaya-cart', JSON.stringify(cart));
    updateCartCount();
    
    // تتبع الإضافة للسلة
    trackEvent('Cart', 'Add', product.title, product.sale_price);
    
    // Meta Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
            content_name: product.title,
            content_ids: [product.id],
            content_type: 'product',
            value: product.sale_price,
            currency: 'AED'
        });
    }
}

// شراء الآن
function buyNow(product = currentProduct) {
    if (!product) return;
    
    const message = `مرحبا، أريد شراء هذا المنتج:\n\n${product.title}\nالسعر: ${product.sale_price} درهم`;
    const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent(message)}`;
    
    // تتبع الشراء
    trackEvent('Purchase', 'Initiate', product.title, product.sale_price);
    
    // Meta Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            content_name: product.title,
            content_ids: [product.id],
            content_type: 'product',
            value: product.sale_price,
            currency: 'AED',
            num_items: 1
        });
    }
    
    // Snapchat Pixel
    if (typeof snaptr !== 'undefined') {
        snaptr('track', 'START_CHECKOUT', {
            'item_category': product.type || 'product',
            'item_ids': [product.id],
            'price': product.sale_price,
            'currency': 'AED'
        });
    }
    
    // TikTok Pixel
    if (typeof ttq !== 'undefined') {
        ttq.track('InitiateCheckout', {
            'content_name': product.title,
            'content_id': product.id,
            'content_type': 'product',
            'value': product.sale_price,
            'currency': 'AED'
        });
    }
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

// تحديث عداد السلة
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// عرض جميع الساعات
function showAllWatches() {
    const watchesGrid = document.getElementById('watches-grid');
    if (!watchesGrid || !watchesData) return;
    
    showLoading(true);
    
    setTimeout(() => {
        watchesGrid.innerHTML = watchesData.map(product => createProductCard(product, 'watch')).join('');
        
        // إضافة مستمعي النقر
        watchesGrid.querySelectorAll('.product-card').forEach((card, index) => {
            card.addEventListener('click', () => showProductModal(watchesData[index], 'watch'));
        });
        
        // إخفاء زر عرض المزيد
        const showMoreBtn = document.querySelector('#watches .section-footer button');
        if (showMoreBtn) {
            showMoreBtn.style.display = 'none';
        }
        
        showLoading(false);
        trackEvent('Products', 'View All', 'Watches');
    }, 300);
}

// عرض جميع العطور
function showAllPerfumes() {
    const perfumesGrid = document.getElementById('perfumes-grid');
    if (!perfumesGrid || !perfumesData) return;
    
    showLoading(true);
    
    setTimeout(() => {
        perfumesGrid.innerHTML = perfumesData.map(product => createProductCard(product, 'perfume')).join('');
        
        // إضافة مستمعي النقر
        perfumesGrid.querySelectorAll('.product-card').forEach((card, index) => {
            card.addEventListener('click', () => showProductModal(perfumesData[index], 'perfume'));
        });
        
        // إخفاء زر عرض المزيد
        const showMoreBtn = document.querySelector('#perfumes .section-footer button');
        if (showMoreBtn) {
            showMoreBtn.style.display = 'none';
        }
        
        showLoading(false);
        trackEvent('Products', 'View All', 'Perfumes');
    }, 300);
}

// اشتراك في النشرة
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // حفظ البريد في التخزين المحلي
    localStorage.setItem('newsletter-email', email);
    
    showNotification('شكراً لك! تم اشتراكك بنجاح في النشرة الإخبارية', 'success');
    form.reset();
    
    trackEvent('Newsletter', 'Subscribe', email);
}

// عرض الإشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '⚠' : '📝'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // إضافة التنسيق
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// عرض/إخفاء رمز التحميل
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }
    isLoading = show;
}

// معالجة أخطاء الصور
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/300x250/667eea/ffffff?text=صورة+غير+متاحة';
    img.alt = 'صورة غير متاحة';
}

// إنشاء رابط صديق للبحث
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\u0600-\u06FF\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// تحديث السنة
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => el.textContent = currentYear);
}

// معالجة UTM parameters
function handleUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource || utmMedium || utmCampaign) {
        const utmData = {
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign,
            timestamp: Date.now()
        };
        
        localStorage.setItem('utm-data', JSON.stringify(utmData));
        
        // تتبع مصدر الزيارة
        trackEvent('Traffic', 'UTM', `${utmSource}_${utmMedium}_${utmCampaign}`);
    }
}

// تتبع عرض الصفحة
function trackPageView() {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Meta Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
    }
    
    // Snapchat Pixel
    if (typeof snaptr !== 'undefined') {
        snaptr('track', 'PAGE_VIEW');
    }
    
    // TikTok Pixel
    if (typeof ttq !== 'undefined') {
        ttq.page();
    }
}

// تتبع الأحداث
function trackEvent(category, action, label, value) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    
    // طباعة في وحدة التحكم
    console.log(`Event: ${category} - ${action} - ${label}`, value || '');
}

// إعداد حركات التمرير
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // مراقبة عناصر المنتجات
    setTimeout(() => {
        document.querySelectorAll('.product-card, .feature-card, .offer-card').forEach(el => {
            observer.observe(el);
        });
    }, 1000);
}

// إضافة أنماط CSS للحركات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .notification-icon {
        font-size: 18px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// تصدير الدوال للاستخدام العام
window.HadayaStore = {
    addToCart,
    buyNow,
    showProductModal,
    closeModal,
    showAllWatches,
    showAllPerfumes,
    subscribeNewsletter,
    trackEvent
};