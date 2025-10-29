// === Emirates Gifts Store - Enhanced Main JavaScript ===
// External script to avoid CSP inline issues
(function(){
  'use strict';
  
  // === STORE OBJECT ===
  window.store = {
    products: [],
    filteredProducts: [],
    displayedProducts: [],
    currentPage: 1,
    productsPerPage: 20,
    loadedProducts: 0,
    initialized: false,
    
    init: function() {
      console.log('🚀 بدء تحميل متجر هدايا الإمارات...');
      
      if (typeof window.productsData === 'undefined') {
        console.log('⏳ في انتظار تحميل بيانات المنتجات...');
        setTimeout(() => this.init(), 500);
        return;
      }
      
      this.products = window.productsData || [];
      this.filteredProducts = [...this.products];
      this.initialized = true;
      
      this.updateCounters();
      this.renderProducts();
      this.checkURLFilters();
      this.setupEventListeners();
      
      console.log(`✅ تم تحميل ${this.products.length} منتج بنجاح`);
      console.log(`📊 التفاصيل: ${this.products.filter(p => p.category === 'ساعات').length} ساعة + ${this.products.filter(p => p.category === 'عطور').length} عطر`);
    },
    
    setupEventListeners: function() {
      // Filter buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const filter = btn.getAttribute('data-filter');
          if (filter) {
            this.filterProducts(filter);
          }
        });
      });
      
      // Search functionality
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            this.updateURL();
            this.applyFilters();
          }, 300);
        });
        
        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.applyFilters();
          }
        });
      }
      
      // Search button
      const searchBtn = document.querySelector('.search-btn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          this.applyFilters();
        });
      }
      
      // Load more button
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
          this.loadMoreProducts();
        });
      }
    },
    
    checkURLFilters: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');
      const search = urlParams.get('search');
      
      if (category) {
        this.filterProducts(category);
      }
      
      if (search) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.value = search;
          this.applyFilters();
        }
      }
    },
    
    updateCounters: function() {
      const total = this.products.length;
      const watches = this.products.filter(p => p.category === 'ساعات').length;
      const perfumes = this.products.filter(p => p.category === 'عطور').length;
      const featured = this.products.filter(p => p.featured).length;
      
      const updateElement = (id, count) => {
        const element = document.getElementById(id);
        if (element) element.textContent = `(${count})`;
      };
      
      updateElement('allCount', total);
      updateElement('allNavCount', total);
      updateElement('watchesCount', watches);
      updateElement('watchesNavCount', watches);
      updateElement('perfumesCount', perfumes);
      updateElement('perfumesNavCount', perfumes);
      updateElement('featuredCount', featured);
      updateElement('featuredNavCount', featured);
    },
    
    renderProducts: function() {
      const productsGrid = document.getElementById('productsGrid');
      if (!productsGrid) return;
      
      if (this.filteredProducts.length === 0) {
        productsGrid.innerHTML = this.createNoProductsHTML();
        return;
      }
      
      const productsToShow = Math.min(this.productsPerPage, this.filteredProducts.length);
      const displayProducts = this.filteredProducts.slice(0, productsToShow);
      this.displayedProducts = displayProducts;
      this.loadedProducts = productsToShow;
      
      const productsHTML = displayProducts.map(product => this.createProductCard(product)).join('');
      productsGrid.innerHTML = productsHTML;
      
      this.updateLoadMoreButton();
    },
    
    createNoProductsHTML: function() {
      return `
        <div class="no-products">
          <i class="fas fa-search-minus"></i>
          <h3>لا توجد منتجات مطابقة</h3>
          <p>لم نجد منتجات تطابق معايير البحث الخاصة بك</p>
          <button onclick="window.store.resetFilters()" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-refresh"></i> إعادة تعيين الفلاتر
          </button>
        </div>
      `;
    },
    
    createProductCard: function(product) {
      const discount = product.price > (product.salePrice || product.price) 
        ? Math.round((product.price - (product.salePrice || product.price)) / product.price * 100)
        : 0;
      
      const rating = product.rating || 4.5;
      const reviewsCount = product.reviewsCount || 0;
      
      return `
        <article class="product-card" data-product-id="${product.id}" role="gridcell">
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center'">
            <div class="product-badges">
              ${discount > 0 ? `<span class="product-badge">خصم ${discount}%</span>` : ''}
              ${product.featured ? `<span class="product-badge featured">⭐ مميز</span>` : ''}
            </div>
            <div class="product-overlay">
              <button onclick="window.store.openProductPage('${product.slug}')" class="overlay-btn" title="عرض التفاصيل" aria-label="عرض تفاصيل ${product.title}">
                <i class="fas fa-eye"></i>
              </button>
              <button onclick="window.store.orderWhatsApp(${product.id})" class="overlay-btn" title="اطلب عبر واتساب" aria-label="اطلب ${product.title} عبر واتساب">
                <i class="fab fa-whatsapp"></i>
              </button>
              <button onclick="window.store.shareProduct(${product.id})" class="overlay-btn" title="مشاركة" aria-label="مشاركة ${product.title}">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
          <div class="product-content">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="product-brand">${product.brand}</span>
            </div>
            <h3 class="product-title" onclick="window.store.openProductPage('${product.slug}')" title="اضغط لعرض التفاصيل">${product.title}</h3>
            <div class="product-rating" role="img" aria-label="تقييم ${rating.toFixed(1)} من 5 نجوم">
              <div class="stars">${this.generateStars(rating)}</div>
              <div class="rating-info">
                <span class="rating-number">${rating.toFixed(1)}</span>
                ${reviewsCount > 0 ? `<span class="reviews-count">(${reviewsCount} تقييم)</span>` : ''}
              </div>
            </div>
            <div class="product-pricing">
              <div class="price-row">
                <span class="current-price">${product.salePrice || product.price} درهم</span>
                ${product.price > (product.salePrice || product.price) ? `<span class="original-price">${product.price} درهم</span>` : ''}
                ${discount > 0 ? `<span class="savings">وفر ${product.price - (product.salePrice || product.price)} درهم</span>` : ''}
              </div>
            </div>
            <div class="product-buttons">
              <a href="/product.html?slug=${encodeURIComponent(product.slug)}" target="_blank" rel="noopener" class="btn btn-primary" aria-label="عرض تفاصيل ${product.title}">
                <i class="fas fa-eye"></i>
                شاهد التفاصيل
              </a>
              <button onclick="window.store.orderWhatsApp(${product.id})" class="btn btn-whatsapp" aria-label="اطلب ${product.title} عبر واتساب">
                <i class="fab fa-whatsapp"></i>
                اطلب الآن
              </button>
            </div>
          </div>
        </article>
      `;
    },
    
    generateStars: function(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      let starsHTML = '';
      
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star" aria-hidden="true"></i>';
      }
      
      if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt" aria-hidden="true"></i>';
      }
      
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star" aria-hidden="true"></i>';
      }
      
      return starsHTML;
    },
    
    updateLoadMoreButton: function() {
      const loadMoreContainer = document.getElementById('loadMoreContainer');
      const remainingCount = document.getElementById('remainingCount');
      
      if (!loadMoreContainer) return;
      
      const totalProducts = this.filteredProducts.length;
      const loadedProducts = this.loadedProducts;
      const remainingProducts = totalProducts - loadedProducts;
      
      if (remainingProducts > 0) {
        loadMoreContainer.style.display = 'block';
        if (remainingCount) {
          remainingCount.textContent = `متبقي ${remainingProducts} منتج أخر من أصل ${totalProducts} منتج`;
        }
      } else {
        loadMoreContainer.style.display = 'none';
      }
    },
    
    // === PUBLIC METHODS ===
    filterProducts: function(category) {
      if (!this.initialized) return;
      
      // Update active filter button
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
          btn.classList.add('active');
        }
      });
      
      // Filter products
      let filtered = [...this.products];
      
      if (category === 'watches') {
        filtered = filtered.filter(p => p.category === 'ساعات');
      } else if (category === 'perfumes') {
        filtered = filtered.filter(p => p.category === 'عطور');
      } else if (category === 'featured') {
        filtered = filtered.filter(p => p.featured);
      }
      
      // Apply search filter
      const searchInput = document.getElementById('searchInput');
      if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          (p.description && p.description.toLowerCase().includes(searchTerm))
        );
      }
      
      this.filteredProducts = filtered;
      this.loadedProducts = 0;
      this.renderProducts();
      
      // Update URL
      this.updateURL(category);
      
      // Track filter usage
      if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_products', {
          filter_category: category,
          results_count: filtered.length
        });
      }
    },
    
    applyFilters: function() {
      const activeBtn = document.querySelector('.filter-btn.active');
      const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      this.filterProducts(category);
    },
    
    resetFilters: function() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      this.filterProducts('all');
      
      // Clear URL parameters
      const url = new URL(window.location);
      url.search = '';
      window.history.replaceState({}, '', url);
    },
    
    updateURL: function(category) {
      const url = new URL(window.location);
      const searchInput = document.getElementById('searchInput');
      
      if (category && category !== 'all') {
        url.searchParams.set('category', category);
      } else {
        url.searchParams.delete('category');
      }
      
      if (searchInput && searchInput.value.trim()) {
        url.searchParams.set('search', searchInput.value.trim());
      } else {
        url.searchParams.delete('search');
      }
      
      window.history.replaceState({}, '', url);
    },
    
    loadMoreProducts: function() {
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (!loadMoreBtn) return;
      
      const originalContent = loadMoreBtn.innerHTML;
      loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
      loadMoreBtn.disabled = true;
      
      setTimeout(() => {
        const productsGrid = document.getElementById('productsGrid');
        const totalProducts = this.filteredProducts.length;
        const currentLoaded = this.loadedProducts;
        const nextBatch = Math.min(this.productsPerPage, totalProducts - currentLoaded);
        
        if (nextBatch > 0) {
          const nextProducts = this.filteredProducts.slice(currentLoaded, currentLoaded + nextBatch);
          const newProductsHTML = nextProducts.map(product => this.createProductCard(product)).join('');
          productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
          
          this.loadedProducts += nextBatch;
          this.displayedProducts = [...this.displayedProducts, ...nextProducts];
          
          this.updateLoadMoreButton();
          
          // Track load more
          if (typeof gtag !== 'undefined') {
            gtag('event', 'load_more_products', {
              loaded_count: nextBatch,
              total_loaded: this.loadedProducts
            });
          }
        }
        
        loadMoreBtn.innerHTML = originalContent;
        loadMoreBtn.disabled = false;
      }, 800);
    },
    
    openProductPage: function(slug) {
      const url = `/product.html?slug=${encodeURIComponent(slug)}`;
      window.open(url, '_blank', 'noopener');
      
      // Track product view
      if (typeof gtag !== 'undefined') {
        const product = this.products.find(p => p.slug === slug);
        if (product) {
          gtag('event', 'view_item', {
            currency: 'AED',
            value: product.salePrice || product.price,
            items: [{
              item_id: product.id,
              item_name: product.title,
              item_category: product.category,
              item_brand: product.brand,
              price: product.salePrice || product.price,
              quantity: 1
            }]
          });
        }
      }
    },
    
    orderWhatsApp: function(productId) {
      const product = this.products.find(p => p.id === parseInt(productId));
      if (!product) return;
      
      const message = `مرحباً 👋\n\n🛍️ أريد طلب هذا المنتج من متجر هدايا الإمارات:\n\n📦 *${product.title}*\n💰 السعر: *${product.salePrice || product.price} درهم* (شامل الشحن المجاني)\n🏷️ الفئة: ${product.category}\n🏪 العلامة التجارية: ${product.brand}\n⭐ التقييم: ${product.rating ? product.rating.toFixed(1) : 'جديد'}/5\n\n🔗 رابط المنتج: ${window.location.origin}/product.html?slug=${encodeURIComponent(product.slug)}\n\nشكراً لكم ❤️ 🇦🇪`;
      
      window.open(`https://wa.me/201110760081?text=${encodeURIComponent(message)}`, '_blank');
      
      // Track WhatsApp order
      if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
          currency: 'AED',
          value: product.salePrice || product.price,
          items: [{
            item_id: product.id,
            item_name: product.title,
            item_category: product.category,
            item_brand: product.brand,
            price: product.salePrice || product.price,
            quantity: 1
          }]
        });
      }
    },
    
    shareProduct: function(productId) {
      const product = this.products.find(p => p.id === parseInt(productId));
      if (!product) return;
      
      const shareData = {
        title: `${product.title} - متجر هدايا الإمارات 🇦🇪`,
        text: `اكتشف ${product.title} بسعر ${product.salePrice || product.price} درهم مع شحن مجاني في الإمارات`,
        url: `${window.location.origin}/product.html?slug=${encodeURIComponent(product.slug)}`
      };
      
      if (navigator.share) {
        navigator.share(shareData);
      } else {
        const text = `${shareData.text}\n${shareData.url}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            this.showNotification('تم نسخ رابط المنتج بنجاح! 📋', 'success');
          });
        }
      }
    },
    
    showNotification: function(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-xl);
        border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
      `;
      
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" style="color: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};"></i>
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
    }
  };
  
  // === INITIALIZATION ===
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء تحميل متجر هدايا الإمارات الفاخر...');
    
    // Wait for products data to be available
    setTimeout(() => {
      window.store.init();
      console.log('✨ المتجر جاهز بكامل المنتجات والمميزات!');
      window.store.showNotification('مرحباً بك في متجر هدايا الإمارات! 🇦🇪', 'success');
    }, 1000);
  });
  
  // === GLOBAL FUNCTIONS FOR COMPATIBILITY ===
  window.filterProducts = function(category) {
    if (window.store && window.store.filterProducts) {
      window.store.filterProducts(category);
    }
  };
  
  window.applyFilters = function() {
    if (window.store && window.store.applyFilters) {
      window.store.applyFilters();
    }
  };
  
  window.resetFilters = function() {
    if (window.store && window.store.resetFilters) {
      window.store.resetFilters();
    }
  };
  
  window.loadMoreProducts = function() {
    if (window.store && window.store.loadMoreProducts) {
      window.store.loadMoreProducts();
    }
  };
  
  window.openProductPage = function(slug) {
    if (window.store && window.store.openProductPage) {
      window.store.openProductPage(slug);
    }
  };
  
  window.orderWhatsApp = function(productId) {
    if (window.store && window.store.orderWhatsApp) {
      window.store.orderWhatsApp(productId);
    }
  };
  
  window.shareProduct = function(productId) {
    if (window.store && window.store.shareProduct) {
      window.store.shareProduct(productId);
    }
  };
  
  // === ANALYTICS AND PERFORMANCE ===
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: 'Homepage - 263 Products',
      page_location: window.location.href,
      content_group1: 'Homepage'
    });
  }
  
  window.addEventListener('load', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'page_load',
        value: performance.now()
      });
    }
  });
  
  console.log('🎉 متجر هدايا الإمارات - النسخة المتطورة جاهزة بـ 263 منتج فاخر! 🇦🇪✨');

})();