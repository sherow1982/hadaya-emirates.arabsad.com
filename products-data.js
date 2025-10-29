// بيانات المنتجات - هدايا الإمارات
// Products Data - Hadaya Emirates

// دالة توليد وصف احترافي تلقائي من اسم المنتج
function buildDescription(title, category){
  const base = `اختبر تميز ${title} مع جودة عالية وتفاصيل مصممة بعناية. مناسب للاستخدام اليومي والمناسبات الخاصة، مع ضمان الرضا الكامل.`;
  if(category==='watch'){
    return `${base} تصميم أنيق ومواد متينة، لمسة فاخرة تعكس ذوقك الرفيع.`;
  }
  if(category==='perfume'){
    return `${base} رائحة فاخرة بثبات ممتاز تُكمل حضورك بأناقة.`;
  }
  return base;
}

// بيانات الساعات
const watchesData = [
 {"id": "1", "title": "ساعة رولكس يخت ماستر - فضي", "price": 370, "sale_price": 320, "image_link": "https://m5zoon.com/public/uploads/products/1689086291310824.webp", "description": buildDescription("ساعة رولكس يخت ماستر - فضي","watch")},
 {"id": "2", "title": "ساعة Rolex كلاسيكية 41 ملم 2022", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741223185271965.png", "description": buildDescription("ساعة Rolex كلاسيكية 41 ملم 2022","watch")},
 {"id": "3", "title": "ساعة rolex باللون الأسود.  R21", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1681005528571671.webp", "description": buildDescription("ساعة rolex باللون الأسود R21","watch")},
 {"id": "4", "title": "ساعة rolex 40ملم  R54", "price": 365, "sale_price": 315, "image_link": "https://m5zoon.com/public/uploads/products/1681164046332341.webp", "description": buildDescription("ساعة rolex 40ملم R54","watch")},
 {"id": "5", "title": "ساعة rolex باللون الأخضر الملكي.", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1741222920546873.png", "description": buildDescription("ساعة rolex باللون الأخضر الملكي","watch")},
 {"id": "6", "title": "ساعة rolex باللون الذهبي والأسود.", "price": 360, "sale_price": 310, "image_link": "https://m5zoon.com/public/uploads/products/1757284688463569.webp", "description": buildDescription("ساعة rolex باللون الذهبي والأسود","watch")},
 {"id": "7", "title": "ساعة rolex باللون الأسود والفضي.", "price": 390, "sale_price": 340, "image_link": "https://m5zoon.com/public/uploads/products/1741222642273682.png", "description": buildDescription("ساعة rolex باللون الأسود والفضي","watch")},
 {"id": "8", "title": "ساعة اوميغا سواتش بيبي بلو", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1720305672749191.webp", "description": buildDescription("ساعة اوميغا سواتش بيبي بلو","watch")},
 {"id": "9", "title": "ساعة اوميغا سواتش نبيتى", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741222388454456.png", "description": buildDescription("ساعة اوميغا سواتش نبيتى","watch")},
 {"id": "10", "title": "ساعة اوميغا سواتش صفراء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221412352160.png", "description": buildDescription("ساعة اوميغا سواتش صفراء","watch")},
 {"id": "11", "title": "ساعة اوميغا سواتش اسود", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/174122229293204.png", "description": buildDescription("ساعة اوميغا سواتش أسود","watch")},
 {"id": "12", "title": "ساعة اوميغا سواتش خضراء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741222202630361.png", "description": buildDescription("ساعة اوميغا سواتش خضراء","watch")},
 {"id": "13", "title": "ساعة اوميغا سواتش زرقاء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221794295947.png", "description": buildDescription("ساعة اوميغا سواتش زرقاء","watch")},
 {"id": "14", "title": "ساعة اوميغا سواتش رصاصي", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221694642499.png", "description": buildDescription("ساعة اوميغا سواتش رصاصي","watch")},
 {"id": "15", "title": "ساعة سربنتي توبوغاس", "price": 470, "sale_price": 420, "image_link": "https://m5zoon.com/public/uploads/products/1741220746882687.png", "description": buildDescription("ساعة سربنتي توبوغاس","watch")},
 {"id": "16", "title": "ساعة نسائية ديور - مينا صغير SL0012", "price": 385, "sale_price": 335, "image_link": "https://m5zoon.com/public/uploads/products/1741220693290036.png", "description": buildDescription("ساعة نسائية ديور - مينا صغير SL0012","watch")},
 {"id": "17", "title": "ساعة سربنتي توبوغاس gold", "price": 470, "sale_price": 420, "image_link": "https://m5zoon.com/public/uploads/products/1741220582559375.png", "description": buildDescription("ساعة سربنتي توبوغاس gold","watch")},
 {"id": "18", "title": "ساعة اوميغا سواتش بنى", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1731699670370340.webp", "description": buildDescription("ساعة اوميغا سواتش بني","watch")},
 {"id": "19", "title": "بوكس الساعة والايربودز  6 في 1", "price": 410, "sale_price": 360, "image_link": "https://m5zoon.com/public/uploads/products/1693928071589621.webp", "description": buildDescription("بوكس الساعة والايربودز 6 في 1","watch")},
 {"id": "20", "title": "ساعة Ultra مع ايربودز هدية", "price": 352, "sale_price": 302, "image_link": "https://m5zoon.com/public/uploads/products/1731698702725313.webp", "description": buildDescription("ساعة Ultra مع ايربودز هدية","watch")}
];

// بيانات العطور  
const perfumesData = [
 {"id": "1", "title": "عطر كوكو شانيل 100 مل", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1722352332177124.webp", "description": buildDescription("عطر كوكو شانيل 100 مل","perfume")},
 {"id": "2", "title": "عطر جوتشي فلورا", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344963790342.webp", "description": buildDescription("عطر جوتشي فلورا","perfume")},
 {"id": "3", "title": "عطر جوتشي بلوم", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344971935939.webp", "description": buildDescription("عطر جوتشي بلوم","perfume")},
 {"id": "4", "title": "عطر سوفاج ديور  100 مل", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344979304336.webp", "description": buildDescription("عطر سوفاج ديور 100 مل","perfume")},
 {"id": "5", "title": "عطر فرزاتشي ايروس", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720345001981811.webp", "description": buildDescription("عطر فرزاتشي ايروس","perfume")},
 {"id": "6", "title": "فواحة عطرية للسيارة قابلة لإعادة الشحن", "price": 364, "sale_price": 264, "image_link": "https://m5zoon.com/public/uploads/products/1722352237120309.webp", "description": buildDescription("فواحة عطرية للسيارة قابلة لإعادة الشحن","perfume")},
 {"id": "7", "title": "Eau The Audacity Penhaligons Green", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/175669385359976.webp", "description": buildDescription("Eau The Audacity Penhaligons Green","perfume")},
 {"id": "8", "title": "Eau The Audacity Penhaligons white", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/1756693962685036.webp", "description": buildDescription("Eau The Audacity Penhaligons white","perfume")},
 {"id": "9", "title": "Fleurs  Bohemes Inverness", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/1756694224611806.webp", "description": buildDescription("Fleurs Bohemes Inverness","perfume")},
 {"id": "10", "title": "Tom Ford Vanilla Sex", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/1757731212122499.webp", "description": buildDescription("Tom Ford Vanilla Sex","perfume")},
 {"id": "11", "title": "Tom Ford Myrrhe Mystere", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/175773127350287.webp", "description": buildDescription("Tom Ford Myrrhe Mystere","perfume")},
 {"id": "12", "title": "Tom Ford Eau De Soleil Blanc", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/175773142284159.webp", "description": buildDescription("Tom Ford Eau De Soleil Blanc","perfume")},
 {"id": "13", "title": "Tom Ford Ombre Leather", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/1757731526832014.webp", "description": buildDescription("Tom Ford Ombre Leather","perfume")},
 {"id": "14", "title": "Tomber", "price": 419, "sale_price": 319, "image_link": "https://m5zoon.com/public/uploads/products/175899730567885.webp", "description": buildDescription("Tomber","perfume")},
 {"id": "15", "title": "Aromatic", "price": 419, "sale_price": 319, "image_link": "https://m5zoon.com/public/uploads/products/1758997399436910.webp", "description": buildDescription("Aromatic","perfume")}
];

// دمج جميع المنتجات
const allProducts = {
    watches: watchesData,
    perfumes: perfumesData
};

// تصدير البيانات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { watchesData, perfumesData, allProducts };
}
