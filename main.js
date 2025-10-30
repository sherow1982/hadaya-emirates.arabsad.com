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
    trackPageView();
});

function initializeStore() {
    handleUTMParameters();
    setupScrollAnimations();
}

function setupEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function loadProducts() {
    showLoading(true);
    setTimeout(() => {
        loadWatches();
        loadPerfumes();
        showLoading(false);
    }, 300);
}

function loadWatches() {
    const watchesGrid = document.getElementById('watches-grid');
    if (!watchesGrid || !watchesData) return;
    const displayWatches = watchesData.slice(0, 8);
    watchesGrid.innerHTML = displayWatches.map(p => createProductCard(p, 'watch')).join('');
}

function loadPerfumes() {
    const perfumesGrid = document.getElementById('perfumes-grid');
    if (!perfumesGrid || !perfumesData) return;
    const displayPerfumes = perfumesData.slice(0, 8);
    perfumesGrid.innerHTML = displayPerfumes.map(p => createProductCard(p, 'perfume')).join('');
}

// البطاقة المبسطة: الاسم + الصورة + زرين (شاهد المزيد، اشتري عبر واتساب)
function createProductCard(product, type) {
    const slug = createSlug(product.title);
    const productUrl = `/products/${slug}.html`;
    const wa = `https://wa.me/201110760081?text=${encodeURIComponent('مرحبا، أريد شراء ' + product.title + ' بسعر ' + product.sale_price + ' درهم')}`;
    return `
        <div class="product-card" data-id="${product.id}" data-type="${type}">
            <div class="product-image">
                <img src="${product.image_link}" alt="${product.title}" loading="lazy" onerror="handleImageError(this)">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-actions">
                    <a class="btn btn-primary btn-sm" href="${productUrl}" target="_blank" rel="noopener">شاهد المزيد</a>
                    <a class="btn btn-secondary btn-sm" href="${wa}" target="_blank" rel="noopener">اشتريه عبر واتساب</a>
                </div>
            </div>
        </div>
    `;
}

// وظائف مساعدة
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = show ? 'flex' : 'none';
}

function handleImageError(img) {
    img.src = 'https://via.placeholder.com/300x250/667eea/ffffff?text=صورة+غير+متاحة';
}

function createSlug(title) {
    return title.toLowerCase()
        .replace(/[^\u0600-\u06FF\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function handleUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    if (utmSource || utmMedium || utmCampaign) {
        const utmData = { source: utmSource, medium: utmMedium, campaign: utmCampaign, timestamp: Date.now() };
        localStorage.setItem('utm-data', JSON.stringify(utmData));
    }
}

function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', { page_title: document.title, page_location: window.location.href });
    }
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    setTimeout(() => {
        document.querySelectorAll('.product-card, .feature-card, .offer-card').forEach(el => observer.observe(el));
    }, 800);
}

// تصدير الدوال الضرورية فقط
window.HadayaStore = { trackPageView };

