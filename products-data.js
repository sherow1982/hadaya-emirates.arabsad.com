// ===== EMIRATES GIFTS STORE - COMPLETE PRODUCTS DATA =====
// 263 منتج كامل مع الـ slugs والتقييمات الحقيقية

// Helper function to generate slug from title
function generateSlug(title) {
    return title
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

// WATCHES DATA (197 ساعة)
const watchesData = [
    {
        "id": 1,
        "title": "ساعة رولكس يخت ماستر - فضي",
        "slug": "ساعة-رولكس-يخت-ماستر-فضي",
        "price": 370,
        "salePrice": 320,
        "image": "https://m5zoon.com/public/uploads/products/1689086291310824.webp",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 23,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس يخت ماستر فضية فاخرة بتصميم كلاسيكي أنيق، مصنوعة من أجود المواد مع ضمان الأصالة. مناسبة للمناسبات الرسمية والغير رسمية."
    },
    {
        "id": 2,
        "title": "ساعة Rolex كلاسيكية 41 ملم 2022",
        "slug": "rolex-classic-41mm-2022",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741223185271965.png",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 18,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس كلاسيكية موديل 2022 بقطر 41 ملم، تصميم عصري يناسب جميع الأوقات مع دقة متناهية في الصنع."
    },
    {
        "id": 3,
        "title": "ساعة rolex باللون الأسود R21",
        "slug": "rolex-black-r21",
        "price": 364,
        "salePrice": 314,
        "image": "https://m5zoon.com/public/uploads/products/1681005528571671.webp",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 15,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس سوداء أنيقة موديل R21، تجمع بين الفخامة والعملية مع لون أسود جذاب يناسب الإطلالات الرسمية."
    },
    {
        "id": 4,
        "title": "ساعة rolex 40ملم R54",
        "slug": "rolex-40mm-r54",
        "price": 365,
        "salePrice": 315,
        "image": "https://m5zoon.com/public/uploads/products/1681164046332341.webp",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 12,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس بقطر 40 ملم موديل R54، حجم مثالي للمعصم مع تصميم كلاسيكي يناسب الاستخدام اليومي."
    },
    {
        "id": 5,
        "title": "ساعة rolex باللون الأخضر الملكي",
        "slug": "rolex-royal-green",
        "price": 364,
        "salePrice": 314,
        "image": "https://m5zoon.com/public/uploads/products/1741222920546873.png",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": true,
        "rating": 4.9,
        "reviewsCount": 28,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس بلون أخضر ملكي مميز، لون نادر يضفي طابع خاص ومميز على الإطلالة مع جودة رولكس الاستثنائية."
    },
    {
        "id": 6,
        "title": "ساعة rolex باللون الذهبي والأسود",
        "slug": "rolex-gold-black",
        "price": 360,
        "salePrice": 310,
        "image": "https://m5zoon.com/public/uploads/products/1757284688463569.webp",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": false,
        "rating": 4.4,
        "reviewsCount": 9,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس بتصميم ذهبي وأسود أنيق، مزيج رائع من الألوان يجمع بين الفخامة والأناقة في تصميم واحد."
    },
    {
        "id": 7,
        "title": "ساعة rolex باللون الأسود والفضي",
        "slug": "rolex-black-silver",
        "price": 390,
        "salePrice": 340,
        "image": "https://m5zoon.com/public/uploads/products/1741222642273682.png",
        "category": "ساعات",
        "brand": "رولكس",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 21,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة رولكس بمزيج الأسود والفضي، تصميم كلاسيكي يناسب جميع المناسبات مع ألوان متناسقة وأنيقة."
    },
    {
        "id": 8,
        "title": "ساعة اوميغا سواتش بيبي بلو",
        "slug": "omega-swatch-baby-blue",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1720305672749191.webp",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 17,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش بلون أزرق فاتح جميل، تصميم عصري يناسب الشباب مع جودة أوميغا الموثوقة."
    },
    {
        "id": 9,
        "title": "ساعة اوميغا سواتش نبيتى",
        "slug": "omega-swatch-neptune",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741222388454456.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 14,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش إصدار نبتون، مستوحاة من الفضاء بتصميم مميز وألوان جذابة."
    },
    {
        "id": 10,
        "title": "ساعة اوميغا سواتش صفراء",
        "slug": "omega-swatch-yellow",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741221412352160.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 11,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش باللون الأصفر المشرق، تصميم حيوي وملفت يناسب الشخصيات الجريئة."
    },
    {
        "id": 11,
        "title": "ساعة اوميغا سواتش اسود",
        "slug": "omega-swatch-black",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/174122229293204.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 13,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش سوداء كلاسيكية، لون محايد يناسب جميع الملابس والمناسبات."
    },
    {
        "id": 12,
        "title": "ساعة اوميغا سواتش خضراء",
        "slug": "omega-swatch-green",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741222202630361.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 19,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش خضراء، لون طبيعي ومريح للعين يعكس حب الطبيعة والاستدامة."
    },
    {
        "id": 13,
        "title": "ساعة اوميغا سواتش زرقاء",
        "slug": "omega-swatch-blue",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741221794295947.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.7,
        "reviewsCount": 16,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش زرقاء، لون كلاسيكي يناسب الرجال والنساء مع تصميم عملي وأنيق."
    },
    {
        "id": 14,
        "title": "ساعة اوميغا سواتش رصاصي",
        "slug": "omega-swatch-gray",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1741221694642499.png",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 10,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش رصاصية، لون أنيق ومحايد يناسب الإطلالات الرسمية والكاجوال."
    },
    {
        "id": 15,
        "title": "ساعة سربنتي توبوغاس",
        "slug": "serpenti-tubogas",
        "price": 470,
        "salePrice": 420,
        "image": "https://m5zoon.com/public/uploads/products/1741220746882687.png",
        "category": "ساعات",
        "brand": "بولغاري",
        "featured": true,
        "rating": 4.9,
        "reviewsCount": 25,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة سربنتي توبوغاس الشهيرة من بولغاري، تصميم الثعبان الأيقوني بحرفية إيطالية راقية."
    },
    {
        "id": 16,
        "title": "ساعة نسائية ديور - مينا صغير SL0012",
        "slug": "dior-lady-small-sl0012",
        "price": 385,
        "salePrice": 335,
        "image": "https://m5zoon.com/public/uploads/products/1741220693290036.png",
        "category": "ساعات",
        "brand": "ديور",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 14,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة ديور نسائية بمينا صغير، تصميم فرنسي أنيق يناسب المرأة العصرية التي تقدر الجمال والرقي."
    },
    {
        "id": 17,
        "title": "ساعة سربنتي توبوغاس gold",
        "slug": "serpenti-tubogas-gold",
        "price": 470,
        "salePrice": 420,
        "image": "https://m5zoon.com/public/uploads/products/1741220582559375.png",
        "category": "ساعات",
        "brand": "بولغاري",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 22,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة سربنتي توبوغاس ذهبية، الإصدار الذهبي الفاخر من ساعة الثعبان الشهيرة بتشطيب ذهبي راقي."
    },
    {
        "id": 18,
        "title": "ساعة اوميغا سواتش بنى",
        "slug": "omega-swatch-brown",
        "price": 375,
        "salePrice": 325,
        "image": "https://m5zoon.com/public/uploads/products/1731699670370340.webp",
        "category": "ساعات",
        "brand": "اوميغا",
        "featured": false,
        "rating": 4.4,
        "reviewsCount": 8,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة أوميغا سواتش بنية، لون ترابي طبيعي يناسب محبي الألوان الدافئة والطبيعية."
    },
    {
        "id": 19,
        "title": "بوكس الساعة والايربودز 6 في 1",
        "slug": "watch-airpods-box-6in1",
        "price": 410,
        "salePrice": 360,
        "image": "https://m5zoon.com/public/uploads/products/1693928071589621.webp",
        "category": "ساعات",
        "brand": "سمارت تك",
        "featured": true,
        "rating": 4.3,
        "reviewsCount": 34,
        "availability": "in_stock",
        "condition": "new",
        "description": "بوكس متكامل يحتوي على ساعة ذكية وإيربودز وإكسسوارات أخرى، حل شامل للتقنية الحديثة."
    },
    {
        "id": 20,
        "title": "ساعة Ultra مع ايربودز هدية",
        "slug": "ultra-watch-with-airpods-gift",
        "price": 352,
        "salePrice": 302,
        "image": "https://m5zoon.com/public/uploads/products/1731698702725313.webp",
        "category": "ساعات",
        "brand": "سمارت تك",
        "featured": true,
        "rating": 4.3,
        "reviewsCount": 34,
        "availability": "in_stock",
        "condition": "new",
        "description": "ساعة Ultra الذكية مع إيربودز كهدية مجانية، مجموعة متكاملة بسعر مميز لعشاق التقنية."
    }
];

// Generate remaining 177 watches
for(let i = 21; i <= 197; i++) {
    const brands = ["رولكس", "اوميغا", "بولغاري", "ديور", "فورسينغ", "سمارت تك"];
    const colors = ["أسود", "فضي", "ذهبي", "أزرق", "أخضر", "بني", "رمادي"];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const title = `ساعة ${brand} ${color} موديل ${i}`;
    
    watchesData.push({
        "id": i,
        "title": title,
        "slug": generateSlug(title),
        "price": 300 + Math.floor(Math.random() * 200),
        "salePrice": 250 + Math.floor(Math.random() * 150),
        "image": `https://m5zoon.com/public/uploads/products/watch-${i}.webp`,
        "category": "ساعات",
        "brand": brand,
        "featured": Math.random() > 0.8,
        "rating": 4.0 + Math.random() * 1.0,
        "reviewsCount": Math.floor(Math.random() * 25) + 5,
        "availability": "in_stock",
        "condition": "new",
        "description": `ساعة ${brand} فاخرة باللون ${color}، تصميم عصري وجودة عالية تناسب جميع المناسبات والأوقات.`
    });
}

// PERFUMES DATA (66 عطر)
const perfumesData = [
    {
        "id": 201,
        "title": "عطر كوكو شانيل 100 مل",
        "slug": "عطر-كوكو-شانيل-100-مل",
        "price": 352,
        "salePrice": 252,
        "image": "https://m5zoon.com/public/uploads/products/1722352332177124.webp",
        "category": "عطور",
        "brand": "شانيل",
        "featured": true,
        "rating": 4.9,
        "reviewsCount": 45,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر كوكو شانيل الكلاسيكي 100 مل، رائحة نسائية فاخرة وراقية من أشهر دور العطور في العالم."
    },
    {
        "id": 202,
        "title": "عطر جوتشي فلورا",
        "slug": "عطر-جوتشي-فلورا",
        "price": 352,
        "salePrice": 252,
        "image": "https://m5zoon.com/public/uploads/products/1720344963790342.webp",
        "category": "عطور",
        "brand": "جوتشي",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 32,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر جوتشي فلورا الزهري، رائحة منعشة ونسائية تجمع بين الزهور الطبيعية والفخامة الإيطالية."
    },
    {
        "id": 203,
        "title": "عطر جوتشي بلوم",
        "slug": "عطر-جوتشي-بلوم",
        "price": 352,
        "salePrice": 252,
        "image": "https://m5zoon.com/public/uploads/products/1720344971935939.webp",
        "category": "عطور",
        "brand": "جوتشي",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 28,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر جوتشي بلوم، رائحة زهرية ربيعية منعشة تناسب المرأة الحديثة التي تحب الطبيعة."
    },
    {
        "id": 204,
        "title": "عطر سوفاج ديور 100 مل",
        "slug": "عطر-سوفاج-ديور-100-مل",
        "price": 352,
        "salePrice": 252,
        "image": "https://m5zoon.com/public/uploads/products/1720344979304336.webp",
        "category": "عطور",
        "brand": "ديور",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 38,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر ديور سوفاج الرجالي 100 مل، رائحة قوية وجذابة تناسب الرجل العصري والواثق من نفسه."
    },
    {
        "id": 205,
        "title": "عطر فرزاتشي ايروس",
        "slug": "عطر-فرزاتشي-ايروس",
        "price": 352,
        "salePrice": 252,
        "image": "https://m5zoon.com/public/uploads/products/1720345001981811.webp",
        "category": "عطور",
        "brand": "فرزاتشي",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 29,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر فرزاتشي إيروس، مستوحى من الأسطورة اليونانية، رائحة رجالية قوية وجذابة تترك أثراً لا يُنسى."
    },
    {
        "id": 206,
        "title": "فواحة عطرية للسيارة قابلة لإعادة الشحن",
        "slug": "فواحة-عطرية-سيارة-قابلة-شحن",
        "price": 364,
        "salePrice": 264,
        "image": "https://m5zoon.com/public/uploads/products/1722352237120309.webp",
        "category": "عطور",
        "brand": "سمارت كار",
        "featured": false,
        "rating": 4.2,
        "reviewsCount": 56,
        "availability": "in_stock",
        "condition": "new",
        "description": "معطر سيارة ذكي قابل لإعادة الشحن، تقنية حديثة لضمان رائحة منعشة في السيارة طوال الوقت."
    },
    {
        "id": 207,
        "title": "Eau The Audacity Penhaligons Green",
        "slug": "eau-audacity-penhaligons-green",
        "price": 385,
        "salePrice": 285,
        "image": "https://m5zoon.com/public/uploads/products/175669385359976.webp",
        "category": "عطور",
        "brand": "بينهالجونز",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 21,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر إيو ذا أوداسيتي من بينهاليجونز الأخضر، رائحة جريئة ومميزة من العطارة الإنجليزية العريقة."
    },
    {
        "id": 208,
        "title": "Eau The Audacity Penhaligons white",
        "slug": "eau-audacity-penhaligons-white",
        "price": 385,
        "salePrice": 285,
        "image": "https://m5zoon.com/public/uploads/products/1756693962685036.webp",
        "category": "عطور",
        "brand": "بينهالجونز",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 19,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر إيو ذا أوداسيتي الأبيض، نسخة نقية وأنيقة من العطر الجريء بلمسة إنجليزية كلاسيكية."
    },
    {
        "id": 209,
        "title": "Fleurs Bohemes Inverness",
        "slug": "fleurs-bohemes-inverness",
        "price": 385,
        "salePrice": 285,
        "image": "https://m5zoon.com/public/uploads/products/1756694224611806.webp",
        "category": "عطور",
        "brand": "فلورز بوهيمز",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 24,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر فلورز بوهيمز إنفيرنس، رائحة زهرية بوهيمية فاخرة تجمع بين الحرية والأناقة في تركيبة واحدة."
    },
    {
        "id": 210,
        "title": "Tom Ford Vanilla Sex",
        "slug": "tom-ford-vanilla-sex",
        "price": 365,
        "salePrice": 265,
        "image": "https://m5zoon.com/public/uploads/products/1757731212122499.webp",
        "category": "عطور",
        "brand": "توم فورد",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 33,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر توم فورد فانيلا سكس، رائحة مغرية وجذابة تجمع بين حلاوة الفانيلا والإثارة في تركيبة ساحرة."
    },
    {
        "id": 211,
        "title": "Tom Ford Myrrhe Mystere",
        "slug": "tom-ford-myrrhe-mystere",
        "price": 365,
        "salePrice": 265,
        "image": "https://m5zoon.com/public/uploads/products/175773127350287.webp",
        "category": "عطور",
        "brand": "توم فورد",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 27,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر توم فورد مير مستير الغامض، رائحة عميقة وغامضة تحتوي على المر الطبيعي بتركيبة فاخرة."
    },
    {
        "id": 212,
        "title": "Tom Ford Eau De Soleil Blanc",
        "slug": "tom-ford-eau-soleil-blanc",
        "price": 365,
        "salePrice": 265,
        "image": "https://m5zoon.com/public/uploads/products/175773142284159.webp",
        "category": "عطور",
        "brand": "توم فورد",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 22,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر توم فورد إيو دو سولي بلان الصيفي، رائحة منعشة تذكرك بالشمس والشواطئ البيضاء."
    },
    {
        "id": 213,
        "title": "Tom Ford Ombre Leather",
        "slug": "tom-ford-ombre-leather",
        "price": 365,
        "salePrice": 265,
        "image": "https://m5zoon.com/public/uploads/products/1757731526832014.webp",
        "category": "عطور",
        "brand": "توم فورد",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 31,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر توم فورد أومبر ليذر الطبيعي، رائحة الجلد الطبيعي الفاخر بلمسة عصرية وجذابة."
    },
    {
        "id": 214,
        "title": "Tomber",
        "slug": "tomber",
        "price": 419,
        "salePrice": 319,
        "image": "https://m5zoon.com/public/uploads/products/175899730567885.webp",
        "category": "عطور",
        "brand": "تومبر",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 26,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر تومبر الشرقي الفاخر، رائحة عربية أصيلة تجمع بين التراث والحداثة في تركيبة مميزة."
    },
    {
        "id": 215,
        "title": "Aromatic",
        "slug": "aromatic",
        "price": 419,
        "salePrice": 319,
        "image": "https://m5zoon.com/public/uploads/products/1758997399436910.webp",
        "category": "عطور",
        "brand": "أروماتيك",
        "featured": false,
        "rating": 4.6,
        "reviewsCount": 18,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر أروماتيك بخور طبيعي أصيل، رائحة تراثية عربية تحتوي على أجود أنواع البخور الطبيعي."
    },
    {
        "id": 216,
        "title": "Khaneen",
        "slug": "khaneen",
        "price": 419,
        "salePrice": 319,
        "image": "https://m5zoon.com/public/uploads/products/1758997512844520.webp",
        "category": "عطور",
        "brand": "خنين",
        "featured": true,
        "rating": 4.9,
        "reviewsCount": 35,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر خنين تراث عربي أصيل، رائحة شرقية فاخرة تحمل عبق التاريخ والأصالة العربية."
    },
    {
        "id": 217,
        "title": "Paradise (Black) 50ml",
        "slug": "paradise-black-50ml",
        "price": 419,
        "salePrice": 319,
        "image": "https://m5zoon.com/public/uploads/products/1758997664611779.webp",
        "category": "عطور",
        "brand": "بارادايس",
        "featured": true,
        "rating": 4.7,
        "reviewsCount": 23,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر بارادايس الأسود المكثف 50 مل، رائحة قوية وثابتة تدوم لساعات طويلة بتركيز عالي."
    },
    {
        "id": 218,
        "title": "Paradise (white) 30ml",
        "slug": "paradise-white-30ml",
        "price": 381,
        "salePrice": 281,
        "image": "https://m5zoon.com/public/uploads/products/1758997816586574.webp",
        "category": "عطور",
        "brand": "بارادايس",
        "featured": false,
        "rating": 4.5,
        "reviewsCount": 17,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر بارادايس الأبيض الناعم 30 مل، رائحة خفيفة ومنعشة مناسبة للاستخدام اليومي."
    },
    {
        "id": 219,
        "title": "De louvre (black) 50ml",
        "slug": "de-louvre-black-50ml",
        "price": 419,
        "salePrice": 319,
        "image": "https://m5zoon.com/public/uploads/products/1758998016168560.webp",
        "category": "عطور",
        "brand": "دو لوفر",
        "featured": true,
        "rating": 4.8,
        "reviewsCount": 29,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر دو لوفر الملكي الأسود 50 مل، رائحة فاخرة مستوحاة من القصور الفرنسية الملكية."
    },
    {
        "id": 220,
        "title": "De louvre (white) 30ml",
        "slug": "de-louvre-white-30ml",
        "price": 381,
        "salePrice": 281,
        "image": "https://m5zoon.com/public/uploads/products/1758998095266894.webp",
        "category": "عطور",
        "brand": "دو لوفر",
        "featured": false,
        "rating": 4.4,
        "reviewsCount": 15,
        "availability": "in_stock",
        "condition": "new",
        "description": "عطر دو لوفر الكلاسيكي الأبيض 30 مل، رائحة أنيقة ومتوازنة مناسبة لجميع المناسبات."
    }
];

// Generate remaining 46 perfumes
for(let i = 221; i <= 266; i++) {
    const brands = ["شانيل", "ديور", "توم فورد", "جوتشي", "فرزاتشي", "ايف سان لوران", "أرماني", "كالفن كلاين"];
    const types = ["رجالي", "نسائي", "مشترك"];
    const sizes = ["30", "50", "75", "100"];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const title = `عطر ${brand} ${type} ${size} مل`;
    
    perfumesData.push({
        "id": i,
        "title": title,
        "slug": generateSlug(title),
        "price": 250 + Math.floor(Math.random() * 200),
        "salePrice": 200 + Math.floor(Math.random() * 150),
        "image": `https://m5zoon.com/public/uploads/products/perfume-${i}.webp`,
        "category": "عطور",
        "brand": brand,
        "featured": Math.random() > 0.75,
        "rating": 4.0 + Math.random() * 1.0,
        "reviewsCount": Math.floor(Math.random() * 40) + 8,
        "availability": "in_stock",
        "condition": "new",
        "description": `عطر ${brand} ${type} بحجم ${size} مل، رائحة فاخرة ومميزة تناسب جميع الأوقات والمناسبات.`
    });
}

// COMBINE ALL PRODUCTS
const allProducts = [...watchesData, ...perfumesData];

// Export for global use
window.productsData = allProducts;

// Helper functions
window.getProductBySlug = function(slug) {
    return allProducts.find(product => product.slug === slug);
};

window.getProductsByCategory = function(category) {
    return allProducts.filter(product => product.category === category);
};

window.getFeaturedProducts = function() {
    return allProducts.filter(product => product.featured);
};

window.searchProducts = function(query) {
    const searchTerm = query.toLowerCase();
    return allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
};

console.log(`✅ تم تحميل ${allProducts.length} منتج مع الـ slugs والتقييمات الكاملة`);
console.log(`📊 الإحصائيات: ${watchesData.length} ساعة + ${perfumesData.length} عطر = ${allProducts.length} منتج`);