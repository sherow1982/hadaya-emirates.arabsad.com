// بيانات المنتجات - هدايا الإمارات
// Products Data - Hadaya Emirates

// بيانات الساعات
const watchesData = [
 {"id": "1", "title": "ساعة رولكس يخت ماستر - فضي", "price": 370, "sale_price": 320, "image_link": "https://m5zoon.com/public/uploads/products/1689086291310824.webp"},
 {"id": "2", "title": "ساعة Rolex كلاسيكية 41 ملم 2022", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741223185271965.png"},
 {"id": "3", "title": "ساعة rolex باللون الأسود.  R21", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1681005528571671.webp"},
 {"id": "4", "title": "ساعة rolex 40ملم  R54", "price": 365, "sale_price": 315, "image_link": "https://m5zoon.com/public/uploads/products/1681164046332341.webp"},
 {"id": "5", "title": "ساعة rolex باللون الأخضر الملكي.", "price": 364, "sale_price": 314, "image_link": "https://m5zoon.com/public/uploads/products/1741222920546873.png"},
 {"id": "6", "title": "ساعة rolex باللون الذهبي والأسود.", "price": 360, "sale_price": 310, "image_link": "https://m5zoon.com/public/uploads/products/1757284688463569.webp"},
 {"id": "7", "title": "ساعة rolex باللون الأسود والفضي.", "price": 390, "sale_price": 340, "image_link": "https://m5zoon.com/public/uploads/products/1741222642273682.png"},
 {"id": "8", "title": "ساعة اوميغا سواتش بيبي بلو", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1720305672749191.webp"},
 {"id": "9", "title": "ساعة اوميغا سواتش نبيتى", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741222388454456.png"},
 {"id": "10", "title": "ساعة اوميغا سواتش صفراء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221412352160.png"},
 {"id": "11", "title": "ساعة اوميغا سواتش اسود", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/174122229293204.png"},
 {"id": "12", "title": "ساعة اوميغا سواتش خضراء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741222202630361.png"},
 {"id": "13", "title": "ساعة اوميغا سواتش زرقاء", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221794295947.png"},
 {"id": "14", "title": "ساعة اوميغا سواتش رصاصي", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1741221694642499.png"},
 {"id": "15", "title": "ساعة سربنتي توبوغاس", "price": 470, "sale_price": 420, "image_link": "https://m5zoon.com/public/uploads/products/1741220746882687.png"},
 {"id": "16", "title": "ساعة نسائية ديور - مينا صغير SL0012", "price": 385, "sale_price": 335, "image_link": "https://m5zoon.com/public/uploads/products/1741220693290036.png"},
 {"id": "17", "title": "ساعة سربنتي توبوغاس gold", "price": 470, "sale_price": 420, "image_link": "https://m5zoon.com/public/uploads/products/1741220582559375.png"},
 {"id": "18", "title": "ساعة اوميغا سواتش بنى", "price": 375, "sale_price": 325, "image_link": "https://m5zoon.com/public/uploads/products/1731699670370340.webp"},
 {"id": "19", "title": "بوكس الساعة والايربودز  6 في 1", "price": 410, "sale_price": 360, "image_link": "https://m5zoon.com/public/uploads/products/1693928071589621.webp"},
 {"id": "20", "title": "ساعة Ultra مع ايربودز هدية", "price": 352, "sale_price": 302, "image_link": "https://m5zoon.com/public/uploads/products/1731698702725313.webp"}
];

// بيانات العطور  
const perfumesData = [
 {"id": "1", "title": "عطر كوكو شانيل 100 مل", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1722352332177124.webp"},
 {"id": "2", "title": "عطر جوتشي فلورا", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344963790342.webp"},
 {"id": "3", "title": "عطر جوتشي بلوم", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344971935939.webp"},
 {"id": "4", "title": "عطر سوفاج ديور  100 مل", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720344979304336.webp"},
 {"id": "5", "title": "عطر فرزاتشي ايروس", "price": 352, "sale_price": 252, "image_link": "https://m5zoon.com/public/uploads/products/1720345001981811.webp"},
 {"id": "6", "title": "فواحة عطرية للسيارة قابلة لإعادة الشحن", "price": 364, "sale_price": 264, "image_link": "https://m5zoon.com/public/uploads/products/1722352237120309.webp"},
 {"id": "7", "title": "Eau The Audacity Penhaligons Green", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/175669385359976.webp"},
 {"id": "8", "title": "Eau The Audacity Penhaligons white", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/1756693962685036.webp"},
 {"id": "9", "title": "Fleurs  Bohemes Inverness", "price": 385, "sale_price": 285, "image_link": "https://m5zoon.com/public/uploads/products/1756694224611806.webp"},
 {"id": "10", "title": "Tom Ford Vanilla Sex", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/1757731212122499.webp"},
 {"id": "11", "title": "Tom Ford Myrrhe Mystere", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/175773127350287.webp"},
 {"id": "12", "title": "Tom Ford Eau De Soleil Blanc", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/175773142284159.webp"},
 {"id": "13", "title": "Tom Ford Ombre Leather", "price": 365, "sale_price": 265, "image_link": "https://m5zoon.com/public/uploads/products/1757731526832014.webp"},
 {"id": "14", "title": "Tomber", "price": 419, "sale_price": 319, "image_link": "https://m5zoon.com/public/uploads/products/175899730567885.webp"},
 {"id": "15", "title": "Aromatic", "price": 419, "sale_price": 319, "image_link": "https://m5zoon.com/public/uploads/products/1758997399436910.webp"}
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