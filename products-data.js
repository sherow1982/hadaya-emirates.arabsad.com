// 🏪 هدايا الإمارات - بيانات المنتجات المحسنة والشاملة
// Auto-generated: 2025-10-30 01:12:00

// بيانات الساعات المحسنة
window.watchesData = [
  {"id":"1","title":"ساعة كلاسيكية يخت ماستر فضي","price":370,"sale_price":320,"image_link":"https://m5zoon.com/public/uploads/products/1689086291310824.webp"},
  {"id":"2","title":"ساعة كلاسيكية 41 ملم 2022","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/1741223185271965.png"},
  {"id":"3","title":"ساعة كلاسيكية باللون الأسود R21","price":364,"sale_price":314,"image_link":"https://m5zoon.com/public/uploads/products/1681005528571671.webp"},
  {"id":"4","title":"ساعة كلاسيكية 40ملم R54","price":365,"sale_price":315,"image_link":"https://m5zoon.com/public/uploads/products/1681164046332341.webp"},
  {"id":"5","title":"ساعة كلاسيكية باللون الأخضر","price":364,"sale_price":314,"image_link":"https://m5zoon.com/public/uploads/products/1741222920546873.png"},
  {"id":"6","title":"ساعة كلاسيكية ذهبي وأسود","price":360,"sale_price":310,"image_link":"https://m5zoon.com/public/uploads/products/1757284688463569.webp"},
  {"id":"7","title":"ساعة كلاسيكية أسود وفضي","price":390,"sale_price":340,"image_link":"https://m5zoon.com/public/uploads/products/1741222642273682.png"},
  {"id":"8","title":"ساعة رياضية بيبي بلو","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/1720305672749191.webp"},
  {"id":"9","title":"ساعة رياضية عصرية نبيتي","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/1741222388454456.png"},
  {"id":"10","title":"ساعة رياضية عصرية صفراء","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/1741221412352160.png"},
  {"id":"11","title":"ساعة رياضية عصرية اسود","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/174122229293204.png"},
  {"id":"12","title":"ساعة رياضية عصرية خضراء","price":375,"sale_price":325,"image_link":"https://m5zoon.com/public/uploads/products/1741222202630361.png"}
];

// بيانات العطور المحسنة
window.perfumesData = [
  {"id":"1","title":"عطر راقي 100 مل","price":352,"sale_price":252,"image_link":"https://m5zoon.com/public/uploads/products/1722352332177124.webp"},
  {"id":"2","title":"عطر زهري","price":352,"sale_price":252,"image_link":"https://m5zoon.com/public/uploads/products/1720344963790342.webp"},
  {"id":"3","title":"عطر نسائي","price":352,"sale_price":252,"image_link":"https://m5zoon.com/public/uploads/products/1720344971935939.webp"},
  {"id":"4","title":"عطر رجالي 100 مل","price":352,"sale_price":252,"image_link":"https://m5zoon.com/public/uploads/products/1720344979304336.webp"},
  {"id":"5","title":"عطر مميز","price":352,"sale_price":252,"image_link":"https://m5zoon.com/public/uploads/products/1720345001981811.webp"},
  {"id":"6","title":"فواحة عطرية للسيارة قابلة لإعادة الشحن","price":364,"sale_price":264,"image_link":"https://m5zoon.com/public/uploads/products/1722352237120309.webp"},
  {"id":"7","title":"عطر أخضر مميز","price":385,"sale_price":285,"image_link":"https://m5zoon.com/public/uploads/products/175669385359976.webp"},
  {"id":"8","title":"عطر أبيض مميز","price":385,"sale_price":285,"image_link":"https://m5zoon.com/public/uploads/products/1756693962685036.webp"},
  {"id":"9","title":"عطر فاخر Fleurs","price":385,"sale_price":285,"image_link":"https://m5zoon.com/public/uploads/products/1756694224611806.webp"},
  {"id":"10","title":"عطر مميز Vanilla","price":365,"sale_price":265,"image_link":"https://m5zoon.com/public/uploads/products/1757731212122499.webp"},
  {"id":"11","title":"عطر مميز Myrrhe","price":365,"sale_price":265,"image_link":"https://m5zoon.com/public/uploads/products/175773127350287.webp"},
  {"id":"12","title":"عطر مميز Soleil Blanc","price":365,"sale_price":265,"image_link":"https://m5zoon.com/public/uploads/products/175773142284159.webp"}
];

// إحصائيات
console.log('🏪 متجر هدايا الإمارات تم تحميله بنجاح!');
console.log('⌚ الساعات:', window.watchesData.length, 'منتج');
console.log('🌸 العطور:', window.perfumesData.length, 'منتج');

// دوال مساعدة متقدمة
window.createSlug = function(title) {
  return title.toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

window.searchProducts = function(query) {
  const all = [...window.watchesData, ...window.perfumesData];
  return all.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    window.createSlug(p.title).includes(query.toLowerCase())
  );
};

// Social Proof محسن مع أسماء منتجات حقيقية
window.showAdvancedSocialProof = function() {
  const names = ['أحمد', 'فاطمة', 'سالم', 'عائشة', 'محمد', 'نورا', 'علي', 'مريم'];
  const cities = ['دبي', 'أبوظبي', 'الشارقة', 'عجمان', 'رأس الخيمة'];
  const allProducts = [...window.watchesData, ...window.perfumesData];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const product = allProducts[Math.floor(Math.random() * allProducts.length)];
  
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="position:fixed;bottom:20px;left:20px;background:white;padding:15px;border-radius:12px;
                box-shadow:0 8px 25px rgba(0,0,0,0.15);z-index:1000;max-width:320px;
                transform:translateX(-400px);transition:all 0.5s ease;border-left:4px solid #10b981;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;background:linear-gradient(135deg,#667eea,#764ba2);
                   border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">👤</div>
        <div>
          <div style="font-weight:600;font-size:13px;color:#333;margin-bottom:2px;">${name} من ${city}</div>
          <div style="font-size:12px;color:#666;">اشترى للتو: "${product.title}" ✅</div>
        </div>
      </div>
    </div>`;
  
  document.body.appendChild(notification);
  
  // تشغيل الصوت الخفيف
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuGzvLZiTYIGGq+7+OZURgMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606eeoVRQKRp/g8r5sIQUrhc7y2Yk2CBhqvu/jmVEYDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACgQ7');
    audio.volume = 0.08;
    audio.play().catch(() => {});
  } catch (e) {}
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    setTimeout(() => {
      notification.style.transform = 'translateX(-400px)';
      setTimeout(() => notification.remove(), 500);
    }, 6000);
  }, 100);
};

// تحميل المنتجات في التبويبات - متعدد الطرق للتأكد
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔄 بدء تحميل التبويبات...');
  
  // تحميل فوري
  if (typeof loadTabProducts === 'function') {
    loadTabProducts('watches');
    loadTabProducts('perfumes');
    console.log('✅ تم التحميل عبر loadTabProducts');
  }
  
  // نسخة احتياطية بعد 500ms
  setTimeout(() => {
    if (typeof loadTab === 'function') {
      loadTab('watches');
      loadTab('perfumes');
      console.log('✅ تم التحميل عبر loadTab');
    }
  }, 500);
  
  // نسخة أخيرة بعد ثانية للتأكد التام
  setTimeout(() => {
    const watchesGrid = document.getElementById('grid-watches');
    const perfumesGrid = document.getElementById('grid-perfumes');
    
    if (watchesGrid && !watchesGrid.innerHTML.trim()) {
      console.log('🔄 إعادة محاولة أخيرة...');
      // تحميل يدوي مباشر
      if (window.watchesData) {
        watchesGrid.innerHTML = window.watchesData.slice(0, 8).map(w => `
          <div class="product-card">
            <div class="product-image">
              <img src="${w.image_link}" alt="${w.title}" loading="lazy">
            </div>
            <div class="product-info">
              <h3 class="product-title">${w.title}</h3>
              <div class="product-actions">
                <a class="btn btn-primary btn-sm" href="/products/${window.createSlug(w.title)}.html">شاهد المزيد</a>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
    
    if (perfumesGrid && !perfumesGrid.innerHTML.trim()) {
      if (window.perfumesData) {
        perfumesGrid.innerHTML = window.perfumesData.slice(0, 8).map(p => `
          <div class="product-card">
            <div class="product-image">
              <img src="${p.image_link}" alt="${p.title}" loading="lazy">
            </div>
            <div class="product-info">
              <h3 class="product-title">${p.title}</h3>
              <div class="product-actions">
                <a class="btn btn-primary btn-sm" href="/products/${window.createSlug(p.title)}.html">شاهد المزيد</a>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }, 1000);
  
  // تفعيل Social Proof بعد دقيقة
  setTimeout(() => {
    window.showAdvancedSocialProof();
    setInterval(window.showAdvancedSocialProof, 75000);
  }, 60000);
});