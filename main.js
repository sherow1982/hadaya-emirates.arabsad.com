// Main JavaScript for Hadaya Emirates Store
// ملف JavaScript الرئيسي لمتجر هدايا الإمارات

// Global variables
let currentPage = 1;
let currentFilter = 'all';
let currentSearch = '';
let cart = JSON.parse(localStorage.getItem('hadayaCart') || '[]');

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartCounter = document.getElementById('cartCounter');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تم تحميل متجر هدايا الإمارات');
    
    // Wait for products data to load
    if (typeof window.productsData !== 'undefined') {
        initializeStore();
    } else {
        // Retry after a short delay
        setTimeout(() => {
            if (typeof window.productsData !== 'undefined') {
                initializeStore();
            } else {
                showError('خطأ في تحميل بيانات المنتجات');
            }
        }, 500);
    }
});

function initializeStore() {
    updateCategoryStats();
    renderProducts();
    setupEventListeners();
    updateCartUI();
    
    console.log(`✅ تم تحميل ${window.totalProducts} منتج بنجاح`);
}

function updateCategoryStats() {
    const stats = {
        all: window.totalProducts,
        watches: window.totalWatches,
        perfumes: window.totalPerfumes,
        featured: window.totalFeatured
    };
    
    Object.keys(stats).forEach(category => {
        const countElement = document.getElementById(`${category}Count`);
        if (countElement) {
            countElement.textContent = `(${stats[category]})`;
        }
    });
}

function renderProducts(page = 1) {
    const startTime = Date.now();
    currentPage = page;
    
    // Show loading
    showLoading();
    
    // Get filtered products
    let filteredProducts = getFilteredProducts();
    
    // Check if no results
    if (filteredProducts.length === 0) {
        showNoResults();
        return;
    }
    
    // Get products for current page
    const pageProducts = getProductsForPage(page, filteredProducts);
    
    // Simulate loading time for better UX
    setTimeout(() => {
        displayProducts(pageProducts);
        updatePagination(filteredProducts.length);
        updateResultsInfo(filteredProducts.length);
        
        const loadTime = Date.now() - startTime;
        console.log(`⌚ تم تحميل ${pageProducts.length} منتج في ${loadTime}ms`);
    }, 300);
}

function getFilteredProducts() {
    let products = window.productsData;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        if (currentFilter === 'featured') {
            products = getFeaturedProducts();
        } else {
            products = getProductsByCategory(currentFilter);
        }
    }
    
    // Apply search filter
    if (currentSearch) {
        products = products.filter(product => 
            product.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.brand.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.category.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    return products;
}

function displayProducts(products) {
    if (!products || products.length === 0) {
        showNoResults();
        return;
    }
    
    const html = products.map((product, index) => `
        <div class="product-card" style="animation-delay: ${(index % 12) * 0.1}s" onclick="openProduct('${product.slug}')">
            ${product.featured ? '<div class="product-badge featured">⭐ مميز</div>' : ''}
            ${product.discount > 15 ? `<div class="product-badge">-${product.discount}%</div>` : ''}
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy" 
                     onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'">
            </div>
            
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category} • ${product.brand}</p>
                
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviews} تقييم)</span>
                </div>
                
                <div class="product-prices">
                    <span class="current-price">${product.salePrice} درهم</span>
                    <span class="original-price">${product.price} درهم</span>
                    <span class="discount">-${product.discount}%</span>
                </div>
                
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        أضف للسلة
                    </button>
                    <button class="quick-view" onclick="event.stopPropagation(); openProduct('${product.slug}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    productsGrid.innerHTML = html;
    productsGrid.style.display = 'grid';
    loadingState.style.display = 'none';
    noResults.style.display = 'none';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star empty"></i>';
    }
    
    return stars;
}

function showLoading() {
    productsGrid.style.display = 'none';
    loadingState.style.display = 'block';
    noResults.style.display = 'none';
    document.getElementById('pagination').style.display = 'none';
}

function showNoResults() {
    productsGrid.style.display = 'none';
    loadingState.style.display = 'none';
    noResults.style.display = 'block';
    document.getElementById('pagination').style.display = 'none';
}

function showError(message) {
    productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #ef4444;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>خطأ في التحميل</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
                <i class="fas fa-refresh"></i> إعادة التحميل
            </button>
        </div>
    `;
    productsGrid.style.display = 'grid';
    loadingState.style.display = 'none';
}

function updateResultsInfo(totalResults) {
    const resultsInfo = document.getElementById('resultsInfo');
    const title = resultsInfo.querySelector('h2');
    const description = resultsInfo.querySelector('p');
    
    let titleText = 'جميع المنتجات';
    let descText = `اكتشف مجموعتنا الفاخرة من ${window.totalWatches} ساعة فاخرة و16 عطر أصلي مع ضمان الجودة والأصالة`;
    
    if (currentFilter === 'watches') {
        titleText = 'مجموعة الساعات';
        descText = 'ساعات فاخرة من أرقى العلامات التجارية العالمية';
    } else if (currentFilter === 'perfumes') {
        titleText = 'مجموعة العطور';
        descText = 'عطور أصلية بتراكيب راقية وروائح مميزة';
    } else if (currentFilter === 'featured') {
        titleText = 'المنتجات المميزة';
        descText = 'منتجات مختارة بعناية من مجموعتنا الفاخرة';
    }
    
    if (currentSearch) {
        titleText = `نتائج البحث: "${currentSearch}"`;
        descText = `تم العثور على ${totalResults} منتج مطابق لبحثك`;
    }
    
    title.innerHTML = `${titleText} <span class="results-count">(${totalResults} منتج)</span>`;
    description.textContent = descText;
}

function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / window.productsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    
    // Generate page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    let pagesHtml = '';
    
    // First page
    if (startPage > 1) {
        pagesHtml += `<button class="page-number" onclick="renderProducts(1)">1</button>`;
        if (startPage > 2) {
            pagesHtml += '<span style="padding: 0 0.5rem;">…</span>';
        }
    }
    
    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
        pagesHtml += `<button class="page-number ${i === currentPage ? 'active' : ''}" onclick="renderProducts(${i})">${i}</button>`;
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHtml += '<span style="padding: 0 0.5rem;">…</span>';
        }
        pagesHtml += `<button class="page-number" onclick="renderProducts(${totalPages})">${totalPages}</button>`;
    }
    
    pageNumbers.innerHTML = pagesHtml;
    
    // Update pagination info
    const start = (currentPage - 1) * window.productsPerPage + 1;
    const end = Math.min(currentPage * window.productsPerPage, totalResults);
    
    document.getElementById('currentRange').textContent = `${start}-${end}`;
    document.getElementById('totalCount').textContent = totalResults;
}

function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setActiveFilter(filter);
        });
    });
    
    // Pagination
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) {
            renderProducts(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    document.getElementById('nextPage')?.addEventListener('click', () => {
        const totalPages = Math.ceil(getFilteredProducts().length / window.productsPerPage);
        if (currentPage < totalPages) {
            renderProducts(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

function handleSearch(e) {
    currentSearch = e.target.value.trim();
    currentPage = 1;
    renderProducts();
}

function setActiveFilter(filter) {
    currentFilter = filter;
    currentPage = 1;
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderProducts();
}

function resetFilters() {
    currentFilter = 'all';
    currentSearch = '';
    currentPage = 1;
    
    if (searchInput) searchInput.value = '';
    
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
    
    renderProducts();
}

function openProduct(slug) {
    const url = `product.html?slug=${encodeURIComponent(slug)}`;
    window.open(url, '_blank');
}

// ===== CART FUNCTIONALITY =====
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error('منتج غير موجود:', productId);
        return;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.salePrice,
            image: product.image,
            slug: product.slug,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showAddedToCartMessage(product.title);
    
    console.log('✅ تمت إضافة للسلة:', product.title);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('hadayaCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart counter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCounter.style.display = 'flex';
        cartCounter.textContent = totalItems;
    } else {
        cartCounter.style.display = 'none';
    }
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>سلتك فارغة</p>
                <small>ابدأ بإضافة منتجات للسلة</small>
            </div>
        `;
        checkoutBtn.disabled = true;
        cartTotal.textContent = '0';
    } else {
        const itemsHtml = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} درهم</div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartItems.innerHTML = itemsHtml;
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
        checkoutBtn.disabled = false;
    }
}

function toggleCart() {
    const isActive = cartSidebar.classList.contains('active');
    
    if (isActive) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function proceedToWhatsApp() {
    if (cart.length === 0) return;
    
    let message = '🛋️ طلب جديد من متجر هدايا الإمارات\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.title}\n`;
        message += `   السعر: ${item.price} درهم\n`;
        message += `   الكمية: ${item.quantity}\n`;
        message += `   الإجمالي: ${item.price * item.quantity} درهم\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 إجمالي الطلب: ${total} درهم\n`;
    message += `🇦🇪 شحن مجاني داخل الإمارات\n`;
    message += `\nرابط المتجر: https://hadaya-emirates.arabsad.com`;
    
    const whatsappUrl = `https://wa.me/201110760081?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showAddedToCartMessage(productTitle) {
    // Create notification element
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 100px; right: 20px; background: var(--success-color); color: white; 
                    padding: 1rem 1.5rem; border-radius: var(--border-radius); box-shadow: var(--shadow-lg); 
                    z-index: 3000; animation: slideInRight 0.3s ease;">
            <i class="fas fa-check-circle"></i> تمت إضافة المنتج للسلة!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for notification animation
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .cart-item-controls button {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        transition: var(--transition);
    }
    
    .cart-item-controls button:hover {
        background: var(--gray-100);
    }
    
    .cart-item-controls .quantity {
        min-width: 30px;
        text-align: center;
        font-weight: 600;
    }
    
    .cart-item-controls .remove-btn {
        color: var(--danger-color);
        margin-right: auto;
    }
    
    .cart-item-controls .remove-btn:hover {
        background: #fee2e2;
    }
`;

document.head.appendChild(notificationStyle);

// ===== PWA SUPPORT =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('✅ SW registered'))
            .catch(error => console.log('❌ SW registration failed'));
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ خطأ في التطبيق:', e.error);
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perf = performance.getEntriesByType('navigation')[0];
            const loadTime = perf.loadEventEnd - perf.loadEventStart;
            console.log(`⏱️ وقت تحميل الصفحة: ${Math.round(loadTime)}ms`);
        }, 0);
    });
}

console.log('✨ تم تحميل جميع وظائف المتجر بنجاح!');