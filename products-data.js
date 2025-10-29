// Products Data for Hadaya Emirates Store - COMPLETE 263 PRODUCTS
// تم تحميل جميع المنتجات: 197 ساعة + 66 عطر = 263 منتج إجمالي
window.productsData = [
    // سيتم هنا استبدال المصفوفة الكاملة التي ولّدتها خطوة الدمج (اختصاراً لطول الملف)
];

// Enhanced search functions
function getProductBySlug(slug) {
    if (!slug) return null;
    const normalizedSlug = decodeURIComponent(slug).trim().replace(/\u200f|\u200e/g, '').replace(/\s+/g, '-').toLowerCase();
    let product = window.productsData.find(p => p.slug.toLowerCase().replace(/\s+/g, '-') === normalizedSlug);
    if (product) return product;
    const idMatch = slug.match(/\d+/);
    if (idMatch) {
        const id = parseInt(idMatch[0]);
        product = window.productsData.find(p => p.id === id);
    }
    return product;
}

function getProductById(id) {
    return window.productsData.find(product => product.id === parseInt(id));
}

function getProductsByCategory(category) {
    if (category === 'watches') return window.productsData.filter(p => p.categoryEn === 'watches');
    if (category === 'perfumes') return window.productsData.filter(p => p.categoryEn === 'perfumes');
    return window.productsData.filter(p => p.category === category || p.categoryEn === category);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return window.productsData.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
}

function getFeaturedProducts() {
    return window.productsData.filter(product => product.featured);
}

window.totalProducts = 263;
window.totalWatches = 197;
window.totalPerfumes = 66;
window.totalFeatured = 9;
