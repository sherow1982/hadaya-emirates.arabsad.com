// ===== EMIRATES GIFTS STORE - PROFESSIONAL E-COMMERCE ENGINE =====
// v4.0 - محرك متجر إلكتروني متقدم مع سلة تسوق وبحث ذكي

(function() {
    'use strict';
    
    // === MAIN STORE OBJECT ===
    const EmiratesGiftsStore = {
        // Data
        products: [],
        filteredProducts: [],
        displayedProducts: [],
        cart: [],
        
        // State
        currentPage: 1,
        productsPerPage: 20,
        loadedProducts: 0,
        currentFilter: 'all',
        searchQuery: '',
        initialized: false,
        
        // === INITIALIZATION ===
        init() {
            console.log('🚀 بدء تحميل متجر هدايا الإمارات الاحترافي...');
            
            if (typeof window.productsData === 'undefined') {
                console.log('⏳ في انتظار تحميل بيانات المنتجات...');
                setTimeout(() => this.init(), 500);
                return;
            }
            
            this.products = window.productsData || [];
            this.filteredProducts = [...this.products];
            this.initialized = true;
            
            this.loadCart();
            this.setupEventListeners();
            this.checkURLParameters();
            this.renderProducts();
            this.updateCounters();
            this.hideLoading();
            
            console.log(`✅ تم تحميل ${this.products.length} منتج بنجاح`);
            console.log(`📋 تفاصيل: ${this.getWatches().length} ساعة + ${this.getPerfumes().length} عطر`);
        },
        
        // === EVENT LISTENERS ===
        setupEventListeners() {
            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const filter = btn.getAttribute('data-filter');
                    this.applyFilter(filter);
                });
            });
            
            // Search functionality
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                let searchTimeout;
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        this.searchQuery = e.target.value.trim();
                        this.applyFilters();
                        this.updateURL();
                    }, 300);
                });
                
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.searchQuery = e.target.value.trim();
                        this.applyFilters();
                    }
                });
            }
            
            // Load more button
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
            }
        },
        
        // === URL MANAGEMENT ===
        checkURLParameters() {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            const search = urlParams.get('search');
            
            if (category) {
                this.currentFilter = category;
                this.updateFilterButtons();
            }
            
            if (search) {
                this.searchQuery = search;
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = search;
            }
            
            if (category || search) {
                this.applyFilters();
            }
        },
        
        updateURL() {
            const url = new URL(window.location);
            
            if (this.currentFilter && this.currentFilter !== 'all') {
                url.searchParams.set('category', this.currentFilter);
            } else {
                url.searchParams.delete('category');
            }
            
            if (this.searchQuery) {
                url.searchParams.set('search', this.searchQuery);
            } else {
                url.searchParams.delete('search');
            }
            
            window.history.replaceState({}, '', url);
        },
        
        // === FILTERING & SEARCH ===
        applyFilter(filter) {
            this.currentFilter = filter;
            this.updateFilterButtons();
            this.applyFilters();
            this.updateURL();
        },
        
        applyFilters() {
            let filtered = [...this.products];
            
            // Category filter
            if (this.currentFilter === 'watches') {
                filtered = filtered.filter(p => p.category === 'ساعات');
            } else if (this.currentFilter === 'perfumes') {
                filtered = filtered.filter(p => p.category === 'عطور');
            } else if (this.currentFilter === 'featured') {
                filtered = filtered.filter(p => p.featured);
            }
            
            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(p => 
                    p.title.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );
            }
            
            this.filteredProducts = filtered;
            this.loadedProducts = 0;
            this.renderProducts();
            this.updateResultsInfo();
        },
        
        // === PRODUCT RENDERING ===
        renderProducts() {
            const productsGrid = document.getElementById('productsGrid');
            const noResults = document.getElementById('noResults');
            
            if (!productsGrid) return;
            
            if (this.filteredProducts.length === 0) {
                productsGrid.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }
            
            noResults.style.display = 'none';
            productsGrid.style.display = 'grid';
            
            const productsToShow = Math.min(this.productsPerPage, this.filteredProducts.length);
            const displayProducts = this.filteredProducts.slice(0, productsToShow);
            this.displayedProducts = displayProducts;
            this.loadedProducts = productsToShow;
            
            productsGrid.innerHTML = displayProducts.map(product => this.createProductCard(product)).join('');
            this.updateLoadMoreButton();
        },
        
        createProductCard(product) {
            const discount = product.price > (product.salePrice || product.price) 
                ? Math.round((product.price - (product.salePrice || product.price)) / product.price * 100)
                : 0;
            
            const rating = product.rating || 4.5;
            const reviewsCount = product.reviewsCount || 0;
            
            return `
                <article class="product-card" data-product-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}" loading="lazy" 
                             onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center'">
                        <div class="product-badges">
                            ${discount > 0 ? `<span class="badge discount">خصم ${discount}%</span>` : ''}
                            ${product.featured ? `<span class="badge featured">⭐ مميز</span>` : ''}
                        </div>
                        <div class="product-overlay">
                            <button onclick="EmiratesGiftsStore.openProductPage('${product.slug}')" class="overlay-btn" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="EmiratesGiftsStore.addToCart(${product.id})" class="overlay-btn" title="أضف للسلة">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button onclick="EmiratesGiftsStore.shareProduct(${product.id})" class="overlay-btn" title="مشاركة">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-content">
                        <div class="product-meta">
                            <span class="product-category">${product.category}</span>
                            <span class="product-brand">${product.brand}</span>
                        </div>
                        <h3 class="product-title" onclick="EmiratesGiftsStore.openProductPage('${product.slug}')">${product.title}</h3>
                        <div class="product-rating">
                            <div class="stars">${this.generateStars(rating)}</div>
                            <span class="rating-number">${rating.toFixed(1)}</span>
                            ${reviewsCount > 0 ? `<span class="reviews-count">(${reviewsCount})</span>` : ''}
                        </div>
                        <div class="product-pricing">
                            <span class="current-price">${product.salePrice || product.price} درهم</span>
                            ${product.price > (product.salePrice || product.price) ? `<span class="original-price">${product.price} درهم</span>` : ''}
                            ${discount > 0 ? `<span class="savings">وفر ${product.price - (product.salePrice || product.price)} درهم!</span>` : ''}
                        </div>
                        <div class="product-actions">
                            <button onclick="EmiratesGiftsStore.addToCart(${product.id})" class="btn btn-primary">
                                <i class="fas fa-shopping-cart"></i>
                                أضف للسلة
                            </button>
                            <a href="/product.html?slug=${encodeURIComponent(product.slug)}" target="_blank" class="btn btn-outline-primary">
                                <i class="fas fa-eye"></i>
                                التفاصيل
                            </a>
                        </div>
                    </div>
                </article>
            `;
        },
        
        generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            let starsHTML = '';
            
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }
            
            return starsHTML;
        },
        
        // === SHOPPING CART ===
        addToCart(productId) {
            const product = this.products.find(p => p.id === parseInt(productId));
            if (!product) return;
            
            const existingItem = this.cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                });
            }
            
            this.saveCart();
            this.updateCartUI();
            this.showNotification(`تم إضافة "${product.title}" للسلة! 🛍️`, 'success');
        },
        
        removeFromCart(productId) {
            this.cart = this.cart.filter(item => item.id !== parseInt(productId));
            this.saveCart();
            this.updateCartUI();
            this.showNotification('تم إزالة المنتج من السلة', 'info');
        },
        
        updateCartQuantity(productId, quantity) {
            const item = this.cart.find(item => item.id === parseInt(productId));
            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(productId);
                } else {
                    item.quantity = quantity;
                    this.saveCart();
                    this.updateCartUI();
                }
            }
        },
        
        updateCartUI() {
            const cartCounter = document.getElementById('cartCounter');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const checkoutBtn = document.getElementById('checkoutBtn');
            
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = this.cart.reduce((sum, item) => sum + ((item.salePrice || item.price) * item.quantity), 0);
            
            // Update counter
            if (cartCounter) {
                if (totalItems > 0) {
                    cartCounter.textContent = totalItems;
                    cartCounter.style.display = 'flex';
                } else {
                    cartCounter.style.display = 'none';
                }
            }
            
            // Update cart items
            if (cartItems) {
                if (this.cart.length === 0) {
                    cartItems.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <p>سلتك فارغة</p>
                            <small>ابدأ بإضافة منتجات للسلة</small>
                        </div>
                    `;
                } else {
                    cartItems.innerHTML = this.cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.title}" width="60" height="60">
                            <div class="cart-item-details">
                                <h4>${item.title}</h4>
                                <div class="cart-item-price">${item.salePrice || item.price} درهم</div>
                                <div class="quantity-controls">
                                    <button onclick="EmiratesGiftsStore.updateCartQuantity(${item.id}, ${item.quantity - 1})" class="qty-btn">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button onclick="EmiratesGiftsStore.updateCartQuantity(${item.id}, ${item.quantity + 1})" class="qty-btn">+</button>
                                </div>
                            </div>
                            <button onclick="EmiratesGiftsStore.removeFromCart(${item.id})" class="remove-item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('');
                }
            }
            
            // Update total
            if (cartTotal) {
                cartTotal.textContent = totalPrice.toFixed(2);
            }
            
            // Update checkout button
            if (checkoutBtn) {
                checkoutBtn.disabled = this.cart.length === 0;
            }
        },
        
        proceedToWhatsApp() {
            if (this.cart.length === 0) return;
            
            const orderDetails = this.cart.map(item => 
                `• ${item.title}\n   الكمية: ${item.quantity}\n   السعر: ${(item.salePrice || item.price)} درهم\n   الإجمالي: ${((item.salePrice || item.price) * item.quantity)} درهم`
            ).join('\n\n');
            
            const totalPrice = this.cart.reduce((sum, item) => sum + ((item.salePrice || item.price) * item.quantity), 0);
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            
            const message = `مرحباً 👋\n\n🛍️ أريد طلب هذه المنتجات من متجر هدايا الإمارات:\n\n${orderDetails}\n\n📊 ملخص الطلب:\nعدد المنتجات: ${totalItems} قطعة\nالإجمالي: ${totalPrice.toFixed(2)} درهم (شامل الشحن المجاني)\n\n✨ أرجو تأكيد الطلب وإعلامي بوقت التوصيل\n\nشكراً لكم ❤️ 🇦🇪`;
            
            window.open(`https://wa.me/201110760081?text=${encodeURIComponent(message)}`, '_blank');
        },
        
        // === CART STORAGE ===
        saveCart() {
            localStorage.setItem('emirates_cart', JSON.stringify(this.cart));
        },
        
        loadCart() {
            try {
                const saved = localStorage.getItem('emirates_cart');
                this.cart = saved ? JSON.parse(saved) : [];
                this.updateCartUI();
            } catch (e) {
                this.cart = [];
            }
        },
        
        // === UI HELPERS ===
        updateFilterButtons() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === this.currentFilter) {
                    btn.classList.add('active');
                }
            });
        },
        
        updateCounters() {
            const counts = {
                all: this.products.length,
                watches: this.getWatches().length,
                perfumes: this.getPerfumes().length,
                featured: this.getFeaturedProducts().length
            };
            
            Object.entries(counts).forEach(([key, count]) => {
                const element = document.getElementById(`${key}Count`);
                if (element) element.textContent = `(${count})`;
            });
        },
        
        updateResultsInfo() {
            const resultsInfo = document.getElementById('resultsInfo');
            if (!resultsInfo) return;
            
            const count = this.filteredProducts.length;
            const filterText = this.getFilterText();
            
            resultsInfo.innerHTML = `
                <h2>${filterText} <span class="results-count">(${count} منتج)</span></h2>
                <p class="results-description">${this.getFilterDescription()}</p>
            `;
        },
        
        getFilterText() {
            switch (this.currentFilter) {
                case 'watches': return 'الساعات الفاخرة';
                case 'perfumes': return 'العطور الأصلية';
                case 'featured': return 'المنتجات المميزة';
                default: return this.searchQuery ? `نتائج البحث: "${this.searchQuery}"` : 'جميع المنتجات';
            }
        },
        
        getFilterDescription() {
            if (this.searchQuery) {
                return `عرض نتائج البحث عن "${this.searchQuery}" في مجموعتنا الفاخرة`;
            }
            
            switch (this.currentFilter) {
                case 'watches': return 'استكشف مجموعتنا الحصرية من الساعات الفاخرة من أشهر العلامات العالمية';
                case 'perfumes': return 'عطور أصلية 100% من أرقى دور العطور في العالم';
                case 'featured': return 'مجموعتنا المختارة بعناية من أفضل المنتجات وأكثرها طلباً';
                default: return 'اكتشف مجموعتنا الفاخرة من 197 ساعة فاخرة و 66 عطر أصلي مع ضمان الجودة والأصالة';
            }
        },
        
        updateLoadMoreButton() {
            const loadMoreContainer = document.getElementById('loadMoreContainer');
            const remainingCount = document.getElementById('remainingCount');
            
            if (!loadMoreContainer) return;
            
            const total = this.filteredProducts.length;
            const loaded = this.loadedProducts;
            const remaining = total - loaded;
            
            if (remaining > 0) {
                loadMoreContainer.style.display = 'block';
                if (remainingCount) {
                    remainingCount.textContent = `متبقي ${remaining} منتج من أصل ${total}`;
                }
            } else {
                loadMoreContainer.style.display = 'none';
            }
        },
        
        hideLoading() {
            const loading = document.getElementById('loadingState');
            const grid = document.getElementById('productsGrid');
            if (loading) loading.style.display = 'none';
            if (grid) grid.style.display = 'grid';
        },
        
        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.style.cssText = `
                position: fixed; top: 20px; right: 20px; background: white;
                padding: 1rem 1.5rem; border-radius: 0.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                border-left: 4px solid ${type === 'success' ? '#22c55e' : '#ef4444'};
                z-index: 10000; transform: translateX(400px); opacity: 0;
                transition: all 0.3s ease; max-width: 300px;
            `;
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="color: ${type === 'success' ? '#22c55e' : '#ef4444'};"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
                notification.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 4000);
        },
        
        // === PUBLIC METHODS ===
        loadMoreProducts() {
            const btn = document.getElementById('loadMoreBtn');
            if (!btn) return;
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            btn.disabled = true;
            
            setTimeout(() => {
                const grid = document.getElementById('productsGrid');
                const currentLoaded = this.loadedProducts;
                const nextBatch = Math.min(this.productsPerPage, this.filteredProducts.length - currentLoaded);
                
                if (nextBatch > 0) {
                    const nextProducts = this.filteredProducts.slice(currentLoaded, currentLoaded + nextBatch);
                    const newHTML = nextProducts.map(product => this.createProductCard(product)).join('');
                    grid.insertAdjacentHTML('beforeend', newHTML);
                    
                    this.loadedProducts += nextBatch;
                    this.displayedProducts = [...this.displayedProducts, ...nextProducts];
                }
                
                this.updateLoadMoreButton();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        },
        
        openProductPage(slug) {
            const url = `/product.html?slug=${encodeURIComponent(slug)}`;
            window.open(url, '_blank', 'noopener');
        },
        
        shareProduct(productId) {
            const product = this.products.find(p => p.id === parseInt(productId));
            if (!product) return;
            
            const shareData = {
                title: `${product.title} - متجر هدايا الإمارات`,
                text: `اكتشف ${product.title} بسعر ${product.salePrice || product.price} درهم`,
                url: `${window.location.origin}/product.html?slug=${encodeURIComponent(product.slug)}`
            };
            
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
                    .then(() => this.showNotification('تم نسخ رابط المنتج! 📋', 'success'));
            }
        },
        
        resetFilters() {
            this.currentFilter = 'all';
            this.searchQuery = '';
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            
            this.updateFilterButtons();
            this.applyFilters();
            this.updateURL();
        },
        
        // === HELPER METHODS ===
        getWatches() {
            return this.products.filter(p => p.category === 'ساعات');
        },
        
        getPerfumes() {
            return this.products.filter(p => p.category === 'عطور');
        },
        
        getFeaturedProducts() {
            return this.products.filter(p => p.featured);
        }
    };
    
    // === GLOBAL FUNCTIONS ===
    window.EmiratesGiftsStore = EmiratesGiftsStore;
    
    // Cart functions
    window.toggleCart = function() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        } else {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        }
    };
    
    window.proceedToWhatsApp = () => EmiratesGiftsStore.proceedToWhatsApp();
    window.resetFilters = () => EmiratesGiftsStore.resetFilters();
    
    // === INITIALIZATION ===
    document.addEventListener('DOMContentLoaded', () => {
        EmiratesGiftsStore.init();
        console.log('✨ متجر هدايا الإمارات جاهز للعمل الاحترافي!');
    });

})();

console.log('🎆 متجر هدايا الإمارات الاحترافي جاهز مع سلة تسوق! 🇦🇪');