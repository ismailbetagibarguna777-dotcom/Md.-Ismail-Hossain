import { AlphabetItem, KarSignItem, KarWordsGroup, ConjunctUsageItem, KarSentencesGroup, KarSentenceItem, BanglaProgressiveGroup, AntonymLevel, SadhuCholitLevel, SynonymLevel, SynonymItem } from './types';

export const BENGALI_ALPHABET: AlphabetItem[] = [
  {
    id: "v1",
    letter: "অ",
    type: "vowel",
    color: "bg-gradient-to-br from-rose-400 to-rose-600",
    words: [
      { word: "অজগর", emoji: "🐍", img: "https://bn.mtnews24.com/uploads/1474393570.gif" },
      { word: "অলি", emoji: "🌺", img: "https://i.ytimg.com/vi/hBDcXUCDiIY/sddefault.jpg" },
      { word: "অরণ্য", emoji: "🌳", img: "https://assets.telegraphindia.com/abp/2020/12/9/1609152702_5fe9b8bea90c8_forest.jpg" },
      { word: "অটোরিকশা", emoji: "🛺", img: "https://desherpotro.com/storage/news/autorishkat.jpg" },
      { word: "অঙ্কুর", emoji: "🌱", img: "https://xobdo.org/photo/IDEA0005892.jpg" },
      { word: "অশ্ব", emoji: "🐎", img: "https://lh5.googleusercontent.com/proxy/bdaLf_JQDa0E9ipVgK696rzYguUf_x1UvgNXJ-s9-VVrAz3qXanxPpAMBN3BzcHlAEDC5XuVXAewaMq8Y1SGSvh6s-SY9x7H43hfc4rhdkiG" },
      { word: "অট্টালিকা", emoji: "🏢", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLPxdGZ2uOy36v2P59-LfkwvjxLi66Cv_o3w&s" },
      { word: "অলংকার", emoji: "💍", img: "https://img.drz.lazcdn.com/static/bd/p/9b7610781efd8b4603311c57a2597a6f.jpg_720x720q80.jpg" },
      { word: "অগ্নি", emoji: "🔥", img: "https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg" },
      { word: "অসি", emoji: "🗡️", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHWSWBm3ZLRSJV7Hq803Vpp5u3_W7aTGC-Gg&s" },
      { word: "অক্টোপাস", emoji: "🐙", img: "https://images.stockcake.com/public/f/0/7/f07ed459-d90e-44d5-9688-de0b112b0f24_large/majestic-underwater-octopus-stockcake.jpg" },
      { word: "অক্ষি", emoji: "👁️", img: "https://www.aucklandeye.co.nz/wp-content/uploads/2023/08/Blue-eyes.jpg" },
      { word: "অর্ধচন্দ্র", emoji: "🌙", img: "https://images.stockcake.com/public/1/4/5/145e4b25-3db6-41c0-a31e-4dcb5bff0c0d_large/glowing-crescent-moon-stockcake.jpg" },
      { word: "অলিভ", emoji: "🫒", img: "https://teachers.gov.bd/shared/frontend/blogs/images/2021-01-09/PFUwqWkxFXf2TAY1RgVqp4ENRRLDO518ocBZHChJ.jpeg" }
    ]
  },
  {
    id: "v2",
    letter: "আ",
    type: "vowel",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    words: [
      { word: "আম", emoji: "🥭", img: "https://static.vecteezy.com/system/resources/previews/026/795/003/non_2x/mango-fruit-tropical-transparent-png.png" },
      { word: "আপেল", emoji: "🍎", img: "https://www.hardyfruittrees.ca/app/uploads/2024/11/pommier-oiase-apple-tree-f1.jpg" },
      { word: "আনারস", emoji: "🍍", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrYRz544qCsVxewwoqABPncABTqBqw-Pmcow&s" },
      { word: "আঙ্গুর", emoji: "🍇", img: "https://static.wikia.nocookie.net/fruit/images/a/a1/Download_%286%29.jpg/revision/latest?cb=20250214145209" },
      { word: "আতা", emoji: "🍈", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OZVAZDbbRCT799L4mfOZejRwR35O-s9lwg&s" },
      { word: "আলু", emoji: "🥔", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yJ7suZJJWRplrR92oRROL36zHMcsRT8uvA&s" },
      { word: "আদা", emoji: "🫚", img: "https://binnifood.com/wp-content/uploads/2024/09/%E0%A6%86%E0%A6%A6%E0%A6%BE%E0%A6%B0-%E0%A6%89%E0%A6%AA%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%A4%E0%A6%BE_3.jpg" },
      { word: "আখ", emoji: "🎋", img: "https://www.krishijibon.com/wp-content/uploads/2023/01/%E0%A6%86%E0%A6%81%E0%A6%96_SugarCane_600x400-600x381.jpg" },
      { word: "আখরোট", emoji: "🌰", img: "https://www.teachers.gov.bd/shared/blog_image/2024/September/10/172594439766dfd24dd50af.webp" },
      { word: "আঁটি", emoji: "🌱", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2aCa8rLZPOXMzH9-5QsuYJ9xoIMMOeS6Xg&s" },
      { word: "আকাশ", emoji: "☁️", img: "https://www.ajkerbazzar.com/wp-content/uploads/2017/10/Clean-Sky.jpg" },
      { word: "আগুন", emoji: "🔥", img: "https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg" },
      { word: "আলো", emoji: "💡", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIvR1oM9CxsNtAJqSsLWhCIVtWB17tjfrG_g&s" },
      { word: "আঁশ", emoji: "🐟", img: "https://www.citynewsdhaka.com/uploads/image62ecee9dd13c6.jpg" },
      { word: "আয়না", emoji: "🪞", img: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2023/10/mirror.jpg?size=*:900" },
      { word: "আলমারি", "emoji": "🗄️", "img": "https://rokbucket.rokomari.io/ProductNew20190903/260X372/Regal_Household_Almirah_AFH_201_4_1_05-Regal-2edb8-370666.png" },
      { word: "আংটি", "emoji": "💍", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjxx3IvYSx-q48Mh98do7tEnXWtFzHyvOJqw&s" },
      { word: "আসন", "emoji": "🧘", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLj-chzjbs5_R1V3D7cs4fmSK7Bz8JFzgJoQ&s" },
      { word: "আঠা", "emoji": "🧴", "img": "https://img.drz.lazcdn.com/static/bd/p/2a28cb13fcfb43068330eaa06e36aac3.jpg_720x720q80.jpg" },
      { word: "আতর", "emoji": "🧴", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzYpn2zM_ydnL8QqVfAg_IBmBkTwNnsJYHg&s" },
      { word: "আবর্জনা", "emoji": "🗑️", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vuilnis_bij_Essent_Milieu.jpg/250px-Vuilnis_bij_Essent_Milieu.jpg" },
      { word: "আঙ্গুল", "emoji": "☝️", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLhhNzHpL2n_Gw6kUty-AI_KKY3tN1qlxtw&s" }
    ]
  },
  {
    id: "v3",
    letter: "ই",
    type: "vowel",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    words: [
      { word: "ইঁদুর", emoji: "🐀", img: "https://chandpurtimes.com/wp-content/uploads/2016/11/Mouse-Rat.jpg" },
      { word: "ইট", emoji: "🧱", img: "" },
      { word: "ইগল", emoji: "🦅", img: "" },
      { word: "ইঞ্জিন", emoji: "🚂", img: "" },
      { word: "ইস্ত্রি", emoji: "👔", img: "" },
      { word: "ইলিশ", emoji: "🐟", img: "" },
      { word: "ইমারত", emoji: "🏢", img: "" },
      { word: "ইনজেকশন", emoji: "💉", img: "" },
      { word: "ইয়ারফোন", emoji: "🎧", img: "" },
      { word: "ইরেজার", emoji: "🧽", img: "" },
      { word: "ইগলু", emoji: "🧊", img: "" }
    ]
  },
  {
    id: "v4",
    letter: "ঈ",
    type: "vowel",
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    words: [
      { word: "ঈগল", emoji: "🦅", img: "https://www.teachers.gov.bd/shared/frontend/blogs/images/2021-08-20/2jADMxfNcQraka99dbw2He4L76E5IXeHeba6xKjR.jpeg" },
      { word: "ঈদ", emoji: "🌙", img: "" },
      { word: "ঈদগাহ", emoji: "🕌", img: "" },
      { word: "ঈশান", emoji: "⛈️", img: "" },
      { word: "ঈশ্বর", emoji: "🪔", img: "" },
      { word: "ঈষিকা", emoji: "🖌️", img: "" }
    ]
  },
  {
    id: "v5",
    letter: "উ",
    type: "vowel",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    words: [
      { word: "উট", emoji: "🐪", img: "https://teachers.gov.bd/shared/contents/2023/October/7/photo/image_157803_1696694343.png" },
      { word: "উল্লু", emoji: "🦉", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bubo_bubo_1.jpg/640px-Bubo_bubo_1.jpg" },
      { word: "উঁইপোকার বাসা", emoji: "🏰", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Termite_mound.jpg/640px-Termite_mound.jpg" },
      { word: "উপহার", emoji: "🎁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Red_gift_box.jpg/640px-Red_gift_box.jpg" },
      { word: "উষা", emoji: "🌅", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sunrise_over_the_sea.jpg/640px-Sunrise_over_the_sea.jpg" },
      { word: "উড়োজাহাজ", emoji: "✈️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Airplane_silhouette.svg/640px-Airplane_silhouette.svg.png" }
    ]
  },
  {
    id: "v6",
    letter: "ঊ",
    type: "vowel",
    color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    words: [
      { word: "ঊর্মি", emoji: "🌊", img: "https://s3.amazonaws.com/somewherein/pictures/NIBEDITA/NIBEDITA-1484229800-8af3032_xlarge.jpg" },
      { word: "ঊর্ণ (মাকড়সার জাল)", emoji: "🕸️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Spider_web_01.jpg/640px-Spider_web_01.jpg" },
      { word: "ঊষ্মামাত্রা", emoji: "🌡️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Thermometer_-_Fahrenheit_and_Celsius.jpg/640px-Thermometer_-_Fahrenheit_and_Celsius.jpg" },
      { word: "ঊর্ধ্বমুখী", emoji: "⬆️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Up_arrow.png/640px-Up_arrow.png" },
      { word: "ঊষর মরুভূমি", emoji: "☀️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sahara_desert_from_space.jpg/640px-Sahara_desert_from_space.jpg" },
      { word: "ঊষালোক", emoji: "🌄", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Morning_Light.jpg/640px-Morning_Light.jpg" }
    ]
  },
  {
    id: "v7",
    letter: "ঋ",
    type: "vowel",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    words: [
      { word: "ঋষি", emoji: "🧘", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8y3Mu-wUSMJbh3K_EzJyB_-JWqwcrxQAcA&s" },
      { word: "ঋষভ (বলদ)", emoji: "🐂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nandi_at_Lepakshi.jpg/640px-Nandi_at_Lepakshi.jpg" },
      { word: "ঋতুর পাতা", emoji: "🍂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Autumn_leaves.jpg/640px-Autumn_leaves.jpg" },
      { word: "ঋজু রেখা", emoji: "📏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ruler.jpg/640px-Ruler.jpg" },
      { word: "ঋণের টাকা", emoji: "💰", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Bangladeshi_Taka_Banknote.jpg/640px-Bangladeshi_Taka_Banknote.jpg" },
      { word: "ঋণপত্র", emoji: "📄", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Paper_450x450.jpg/640px-Paper_450x450.jpg" }
    ]
  },
  {
    id: "v8",
    letter: "এ",
    type: "vowel",
    color: "bg-gradient-to-br from-pink-400 to-pink-600",
    words: [
      { word: "একতারা", emoji: "🎸", img: "https://www.swarclassical.com/Instruments/pictures/Ektara.png" },
      { word: "এলাচ", emoji: "🟢", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cardamom.jpg/640px-Cardamom.jpg" },
      { word: "এম্বুলেন্স", emoji: "🚑", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ambulance.svg/640px-Ambulance.svg.png" },
      { word: "এলিফ্যান্ট", emoji: "🐘", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/640px-African_Bush_Elephant.jpg" },
      { word: "একা", emoji: "🧍", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Lonely_person.jpg/640px-Lonely_person.jpg" },
      { word: "এঁটেল মাটি", emoji: "🥮", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Mud.jpg/640px-Mud.jpg" }
    ]
  },
  {
    id: "v9",
    letter: "ঐ",
    type: "vowel",
    color: "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600",
    words: [
      { word: "ঐরাবত", emoji: "🐘", img: "https://www.teachers.gov.bd/shared/content_image/2026/April/06/177547759869d3a35ed8cbe.webp" },
      { word: "ঐক্য", emoji: "🤝", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Handshake.jpg/640px-Handshake.jpg" },
      { word: "ঐশ্বরিক মূর্তি", emoji: "✨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hindu_God.jpg/640px-Hindu_God.jpg" },
      { word: "ঐতিহ্যবাহী স্থাপত্য", emoji: "🏛️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sixty_Dome_Mosque.jpg/640px-Sixty_Dome_Mosque.jpg" },
      { word: "ঐন্দ্রজালিক", emoji: "🕷️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Spider.jpg/640px-Spider.jpg" },
      { word: "ঐহিক দুনিয়া", emoji: "🌍", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble.jpg/640px-Blue_Marble.jpg" }
    ]
  },
  {
    id: "v10",
    letter: "ও",
    type: "vowel",
    color: "bg-gradient-to-br from-amber-400 to-amber-600",
    words: [
      { word: "ওল", emoji: "🥔", img: "https://assets.telegraphindia.com/abp/2016/1/20/1608156710_5fda8626d9245_8.jpg" },
      { word: "ওষুধ", emoji: "💊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Capsules_and_tablets.jpg/640px-Capsules_and_tablets.jpg" },
      { word: "ওজন", emoji: "⚖️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Balance_scale.jpg/640px-Balance_scale.jpg" },
      { word: "ওড়না", emoji: "🧣", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Woman_in_sari.jpg/640px-Woman_in_sari.jpg" },
      { word: "ওয়ালেট", emoji: "👛", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Leather_wallet.jpg/640px-Leather_wallet.jpg" },
      { word: "ওভেন", emoji: "🔥", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Oven.jpg/640px-Oven.jpg" }
    ]
  },
  {
    id: "v11",
    letter: "ঔ",
    type: "vowel",
    color: "bg-gradient-to-br from-green-500 to-green-700",
    words: [
      { word: "ঔষধ", emoji: "💊", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLlSYEilnFj3O-L8vPbygmLD9zKvRpKFS9g&s" },
      { word: "ঔষধি গাছ", emoji: "🌿", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Basil_plant.jpg/640px-Basil_plant.jpg" },
      { word: "ঔপচারিক পোশাক", emoji: "📋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dress_shirt.jpg/640px-Dress_shirt.jpg" },
      { word: "ঔদ্যোগিক কারখানা", emoji: "🏭", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Factory.jpg/640px-Factory.jpg" },
      { word: "ঔজ্জ্বল্যময় আলো", emoji: "🌟", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bright_light.jpg/640px-Bright_light.jpg" },
      { word: "ঔলাদ", emoji: "👦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Child_playing.jpg/640px-Child_playing.jpg" }
    ]
  },
  {
    id: "c1",
    letter: "ক",
    type: "consonant",
    color: "bg-gradient-to-br from-sky-400 to-sky-600",
    words: [
      { word: "কলা", emoji: "🍌", img: "https://www.teachers.gov.bd/shared/frontend/blogs/images/2022-09-20/zssAE8Ywk3x9RPshLp31wRNwm4NXxjgMnvCfLGoh.webp" },
      { word: "কমলা", emoji: "🍊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/640px-Orange-Fruit-Pieces.jpg" },
      { word: "কবুতর", emoji: "🕊️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Columba_livia_-_Pigeon_-2006-03-17.jpg/640px-Columba_livia_-_Pigeon_-2006-03-17.jpg" },
      { word: "কাঠ", emoji: "🪵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Wood_for_fire.jpg/640px-Wood_for_fire.jpg" },
      { word: "কাপড়", emoji: "👕", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Cloth_and_threads.jpg/640px-Cloth_and_threads.jpg" },
      { word: "কাগজ", emoji: "📄", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/White_paper_with_margin.png/640px-White_paper_with_margin.png" }
    ]
  },
  {
    id: "c2",
    letter: "খ",
    type: "consonant",
    color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    words: [
      { word: "খরগোশ", emoji: "🐰", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOH9P0qqeWaVyxnD8iWnCtMoH7Y0cDFUzEw&s" },
      { word: "খাতা", emoji: "📓", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Notebook.jpg/640px-Notebook.jpg" },
      { word: "খেলনা", emoji: "🧸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Teddy_bear.jpg/640px-Teddy_bear.jpg" },
      { word: "খাবার", emoji: "🍽️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Equatorial_Cuisine.jpg/640px-Equatorial_Cuisine.jpg" },
      { word: "খাঁচা", emoji: "🪺", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bird_cage.jpg/640px-Bird_cage.jpg" },
      { word: "খুঁটি", emoji: "🪵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wooden_pole.jpg/640px-Wooden_pole.jpg" }
    ]
  },
  {
    id: "c3",
    letter: "গ",
    type: "consonant",
    color: "bg-gradient-to-br from-teal-400 to-teal-600",
    words: [
      { word: "গরু", emoji: "🐄", img: "https://probashkhabor.com/wp-content/uploads/2024/06/RCC.jpg" },
      { word: "গাছ", emoji: "🌳", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/A_large_glimpse_of_the_green_tree.jpg/640px-A_large_glimpse_of_the_green_tree.jpg" },
      { word: "গোলাপ", emoji: "🌹", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rose_flower.jpg/640px-Rose_flower.jpg" },
      { word: "গিটার", emoji: "🎸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Guitar.jpg/640px-Guitar.jpg" },
      { word: "গাড়ি", emoji: "🚗", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2019_Honda_Civic_sedan_%28facelift%29%2C_front_11.27.2021.jpg/640px-2019_Honda_Civic_sedan_%28facelift%29%2C_front_11.27.2021.jpg" },
      { word: "গ্লাস", emoji: "🥤", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Drinking_glass.jpg/640px-Drinking_glass.jpg" }
    ]
  },
  {
    id: "c4",
    letter: "ঘ",
    type: "consonant",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    words: [
      { word: "ঘড়ি", emoji: "⌚", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRI7NnrjctJt-CiSrCDfs-pTgCtxpakbU4zg&s" },
      { word: "ঘর", emoji: "🏠", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Typical_Bengali_Roof.jpg/640px-Typical_Bengali_Roof.jpg" },
      { word: "ঘাস", emoji: "🌿", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lawn_grass.jpg/640px-Lawn_grass.jpg" },
      { word: "ঘুম", emoji: "😴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sleeping_child.jpg/640px-Sleeping_child.jpg" },
      { word: "ঘোড়া", emoji: "🐴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Horse_in_field.jpg/640px-Horse_in_field.jpg" },
      { word: "ঘটি", emoji: "🏺", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Clay_pot.jpg/640px-Clay_pot.jpg" }
    ]
  },
  {
    id: "c5",
    letter: "ঙ",
    type: "consonant",
    color: "bg-gradient-to-br from-violet-500 to-violet-700",
    words: [
      { word: "ব্যাঙ", emoji: "🐸", img: "https://samakal.com/media/imgAll/uploads/2021/04/print/photos/Untitled-27-samakal-6083230e11301.gif" },
      { word: "ঙ্গুর", emoji: "🍇", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Grape_Vine_with_Fruit.jpg/640px-Grape_Vine_with_Fruit.jpg" },
      { word: "ঙাই", emoji: "🦔", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Indian_pangolin.jpg/640px-Indian_pangolin.jpg" },
      { word: "ঙ্গোট", emoji: "🕸️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Fishing_net.jpg/640px-Fishing_net.jpg" },
      { word: "ঙ্গার", emoji: "🖤", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Soot.jpg/640px-Soot.jpg" },
      { word: "ঙ্গুরি", emoji: "🥜", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Raisins.jpg/640px-Raisins.jpg" }
    ]
  },
  {
    id: "c6",
    letter: "চ",
    type: "consonant",
    color: "bg-gradient-to-br from-purple-500 to-purple-700",
    words: [
      { word: "চশমা", emoji: "👓", img: "https://www.deepwardeyewear.com/uploads/41454/thin-acetate-glassesf443b.jpg" },
      { word: "চা", emoji: "☕", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cup_of_tea.jpg/640px-Cup_of_tea.jpg" },
      { word: "চিড়িয়াখানা", emoji: "🦁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Dhaka_Zoo_02.jpg/640px-Dhaka_Zoo_02.jpg" },
      { word: "চেয়ার", emoji: "🪑", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Wooden_chair.jpg/640px-Wooden_chair.jpg" },
      { word: "চাঁদ", emoji: "🌙", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Crescent_moon.jpg/640px-Crescent_moon.jpg" },
      { word: "চকলেট", emoji: "🍫", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Chocolate.jpg/640px-Chocolate.jpg" }
    ]
  },
  {
    id: "c7",
    letter: "ছ",
    type: "consonant",
    color: "bg-gradient-to-br from-pink-500 to-pink-700",
    words: [
      { word: "ছাতা", emoji: "☂️", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-rX-n9pCMbI_PBoUGmUPGgHacBfvLpg0ekA&s" },
      { word: "ছাত্র", emoji: "👨‍🎓", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Students_in_Bangladesh.jpg/640px-Students_in_Bangladesh.jpg" },
      { word: "ছাগল", emoji: "🐐", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Goat_in_the_mountains.jpg/640px-Goat_in_the_mountains.jpg" },
      { word: "ছুরি", emoji: "🔪", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Chef_knife.jpg/640px-Chef_knife.jpg" },
      { word: "ছবি", emoji: "🖼️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Framed_picture.jpg/640px-Framed_picture.jpg" },
      { word: "ছাতিম", emoji: "🌸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Couroupita_guianensis_flower.jpg/640px-Couroupita_guianensis_flower.jpg" }
    ]
  },
  {
    id: "c8",
    letter: "জ",
    type: "consonant",
    color: "bg-gradient-to-br from-rose-500 to-rose-700",
    words: [
      { word: "জাহাজ", emoji: "🚢", img: "https://bandarbarta.com/wp-content/uploads/2022/11/1-1.jpg" },
      { word: "জবা", emoji: "🌺", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Hibiscus_rosa-sinensis_flower_1.jpg/640px-Hibiscus_rosa-sinensis_flower_1.jpg" },
      { word: "জল", emoji: "💧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/A_drop_of_water.jpg/640px-A_drop_of_water.jpg" },
      { word: "জানালা", emoji: "🪟", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Window_with_view.jpg/640px-Window_with_view.jpg" },
      { word: "জাম", emoji: "🫐", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Jamun_fruit.jpg/640px-Jamun_fruit.jpg" },
      { word: "জেলি", emoji: "🍮", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fruit_jelly.jpg/640px-Fruit_jelly.jpg" }
    ]
  },
  {
    id: "c9",
    letter: "ঝ",
    type: "consonant",
    color: "bg-gradient-to-br from-orange-500 to-orange-700",
    words: [
      { word: "ঝুড়ি", emoji: "🧺", img: "https://i.chaldn.com/_mpimage/rfl-family-basket-1-pcs?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D132758&q=best&v=1&m=400" },
      { word: "ঝড়", emoji: "🌪️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tornado_with_rain.jpg/640px-Tornado_with_rain.jpg" },
      { word: "ঝিঝি", emoji: "🦗", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cricket_insect.jpg/640px-Cricket_insect.jpg" },
      { word: "ঝাঁক", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flock_of_birds.jpg/640px-Flock_of_birds.jpg" },
      { word: "ঝাল", emoji: "🌶️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chili_peppers.jpg/640px-Chili_peppers.jpg" },
      { word: "ঝোল", emoji: "🍲", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Curry_in_a_bowl.jpg/640px-Curry_in_a_bowl.jpg" }
    ]
  },
  {
    id: "c10",
    letter: "ঞ",
    type: "consonant",
    color: "bg-gradient-to-br from-amber-500 to-amber-700",
    words: [
      { word: "মিঞা", emoji: "🧔", img: "https://teachers.gov.bd/shared/contents/2021/July/2/photo/image_545845_1625214239.jpg" },
      { word: "ঞ্জানা", emoji: "👁️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kajal_container.jpg/640px-Kajal_container.jpg" },
      { word: "ঞ্জলি", emoji: "🙏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Flower_offering.jpg/640px-Flower_offering.jpg" },
      { word: "ঞ্জন", "emoji": "🔥", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Clay_oven.jpg/640px-Clay_oven.jpg" },
      { word: "ঞ্জিরা", emoji: "🫘", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cumin_seeds.jpg/640px-Cumin_seeds.jpg" },
      { word: "ঞ্জাম", emoji: "🛕", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Small_temple.jpg/640px-Small_temple.jpg" }
    ]
  },
  {
    id: "c11",
    letter: "ট",
    type: "consonant",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    words: [
      { word: "টিয়া", emoji: "🦜", img: "https://www.teachers.gov.bd/shared/frontend/blogs/images/2023-08-17/XUA7zZxt1k3mO1ssGYHs3KCRm54sQyTu0p0WRQaf.jpg" },
      { word: "টুপি", emoji: "🎩", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bengali_cap.jpg/640px-Bengali_cap.jpg" },
      { word: "ট্রেন", emoji: "🚂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Train_in_Bangladesh.jpg/640px-Train_in_Bangladesh.jpg" },
      { word: "টেবিল", emoji: "🪑", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Wooden_table.jpg/640px-Wooden_table.jpg" },
      { word: "টেলিফোন", emoji: "📞", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Telephone.jpg/640px-Telephone.jpg" },
      { word: "টমেটো", emoji: "🍅", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato.jpg/640px-Tomato.jpg" }
    ]
  },
  {
    id: "c12",
    letter: "ঠ",
    type: "consonant",
    color: "bg-gradient-to-br from-red-400 to-red-600",
    words: [
      { word: "ঠোঁট", emoji: "👄", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPvVgyDwBkyAaEVwp_N3tFhOJ3EV0KeAsIOA&s" },
      { word: "ঠান্ডি", emoji: "🪏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Spade.jpg/640px-Spade.jpg" },
      { word: "ঠিকা", emoji: "🎫", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ticket.jpg/640px-Ticket.jpg" },
      { word: "ঠোঙ্গা", emoji: "🤐", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Envelope.jpg/640px-Envelope.jpg" },
      { word: "ঠিব্বা", emoji: "⛰️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mound_of_earth.jpg/640px-Mound_of_earth.jpg" },
      { word: "ঠাকুর", emoji: "🙏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hindu_idol.jpg/640px-Hindu_idol.jpg" }
    ]
  },
  {
    id: "c13",
    letter: "ড",
    type: "consonant",
    color: "bg-gradient-to-br from-green-500 to-green-700",
    words: [
      { word: "ডাব", emoji: "🥥", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnC7HfDIc-M5gqZ4q6K6WB-BOFrM47cMjgwg&s" },
      { word: "ডাক্তার", emoji: "👨‍⚕️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Doctor.jpg/640px-Doctor.jpg" },
      { word: "ডিম", emoji: "🥚", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chicken_egg.jpg/640px-Chicken_egg.jpg" },
      { word: "ডোনাট", emoji: "🍩", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/640px-Glazed-Donut.jpg" },
      { word: "ডায়েরি", emoji: "📔", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Diary.jpg/640px-Diary.jpg" },
      { word: "ড্রাম", emoji: "🥁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Steel_drum.jpg/640px-Steel_drum.jpg" }
    ]
  },
  {
    id: "c14",
    letter: "ঢ",
    type: "consonant",
    color: "bg-gradient-to-br from-teal-500 to-teal-700",
    words: [
      { word: "ঢোল", emoji: "🥁", img: "https://static-01.daraz.com.bd/p/1b858fc7ee4a67a5a6d696072961387e.jpg" },
      { word: "ঢিল", emoji: "🪨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Pebbles.jpg/640px-Pebbles.jpg" },
      { word: "ঢাল", emoji: "🛡️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Shield.jpg/640px-Shield.jpg" },
      { word: "ঢাকা", emoji: "🏙️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Dhaka_Skyline.jpg/640px-Dhaka_Skyline.jpg" },
      { word: "ঢেউ", emoji: "🌊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ocean_wave.jpg/640px-Ocean_wave.jpg" },
      { word: "ঢালাই", emoji: "🏗️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Welding.jpg/640px-Welding.jpg" }
    ]
  },
  {
    id: "c15",
    letter: "ণ",
    type: "consonant",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    words: [
      { word: "হরিণ", emoji: "🦌", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHiz_qeIklVmT6iNGHn7BmwxXqsywSgdatyw&s" },
      { word: "ণাড়ি", emoji: "🪢", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Noose.jpg/640px-Noose.jpg" },
      { word: "ণিড়", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Bird.jpg/640px-Bird.jpg" },
      { word: "ণাগ", emoji: "🐍", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cobra.jpg/640px-Cobra.jpg" },
      { word: "ণিশা", emoji: "🌃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Night_sky.jpg/640px-Night_sky.jpg" },
      { word: "ণিগম", emoji: "🏛️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Ancient_building.jpg/640px-Ancient_building.jpg" }
    ]
  },
  {
    id: "c16",
    letter: "ত",
    type: "consonant",
    color: "bg-gradient-to-br from-sky-600 to-sky-800",
    words: [
      { word: "তাল", emoji: "🥁", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSGmZtPrdNAC9_KxsfGZKk90vemq59k1549g&s" },
      { word: "তারা", emoji: "⭐", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Star.jpg/640px-Star.jpg" },
      { word: "তবলা", emoji: "🌴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Palm_tree.jpg/640px-Palm_tree.jpg" },
      { word: "তেল", emoji: "🫒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Mustard_oil_bottle.jpg/640px-Mustard_oil_bottle.jpg" },
      { word: "তোয়ালে", emoji: "🧼", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Towel.jpg/640px-Towel.jpg" },
      { word: "তালা", emoji: "🔒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Lock.jpg/640px-Lock.jpg" }
    ]
  },
  {
    id: "c17",
    letter: "থ",
    type: "consonant",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    words: [
      { word: "থালা", emoji: "🍽️", img: "https://teachers.gov.bd/shared/contents/2023/August/15/photo/image_151394_1692092589.jpg" },
      { word: "থলি", emoji: "🎁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jute_bag.jpg/640px-Jute_bag.jpg" },
      { word: "থার্মোমিটার", emoji: "🌡️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Thermometer_-_Fahrenheit_and_Celsius.jpg/640px-Thermometer_-_Fahrenheit_and_Celsius.jpg" },
      { word: "থ্রি-পিস", emoji: "👖", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Suit.jpg/640px-Suit.jpg" },
      { word: "থ্রেড", emoji: "🧵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sewing_thread.jpg/640px-Sewing_thread.jpg" },
      { word: "থাম", emoji: "🏛️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pillar.jpg/640px-Pillar.jpg" }
    ]
  },
  {
    id: "c18",
    letter: "দ",
    type: "consonant",
    color: "bg-gradient-to-br from-indigo-600 to-indigo-800",
    words: [
      { word: "দই", emoji: "🍦", img: "https://i.ytimg.com/vi/It-6cad87Zg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCQ__zVqa_xDNei4qxk5qY3cEWxww" },
      { word: "দাঁত", emoji: "🦷", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Teeth.jpg/640px-Teeth.jpg" },
      { word: "দরজা", emoji: "🚪", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wooden_door.jpg/640px-Wooden_door.jpg" },
      { word: "দূরবীক্ষণ", emoji: "🔭", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Telescope.jpg/640px-Telescope.jpg" },
      { word: "দৌড়", emoji: "🏃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Running.jpg/640px-Running.jpg" },
      { word: "দিয়াশলাই", emoji: "🔥", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Matchsticks.jpg/640px-Matchsticks.jpg" }
    ]
  },
  {
    id: "c19",
    letter: "ধ",
    type: "consonant",
    color: "bg-gradient-to-br from-violet-600 to-violet-800",
    words: [
      { word: "ধনুক", emoji: "🏹", img: "https://teachers.gov.bd/shared/contents/2021/October/18/photo/image_35092_1634559438.png" },
      { word: "ধুনুচি", "emoji": "🛏️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Hammock.jpg/640px-Hammock.jpg" },
      { word: "ধুলো", emoji: "💨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dust.jpg/640px-Dust.jpg" },
      { word: "ধনেপাতা", emoji: "🌿", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Coriander_leaves.jpg/640px-Coriander_leaves.jpg" },
      { word: "ধারা", emoji: "💧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Stream.jpg/640px-Stream.jpg" },
      { word: "ধুমধাম", emoji: "🎪", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Pandal.jpg/640px-Pandal.jpg" }
    ]
  },
  {
    id: "c20",
    letter: "ন",
    type: "consonant",
    color: "bg-gradient-to-br from-pink-600 to-pink-800",
    words: [
      { word: "নৌকা", emoji: "⛵", img: "https://i.ytimg.com/vi/0mUDNudGJ8k/maxresdefault.jpg" },
      { word: "নদী", emoji: "🏞️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/River.jpg/640px-River.jpg" },
      { word: "নকশি কাঁথা", emoji: "🧵", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Nakshi_Kantha.jpg/640px-Nakshi_Kantha.jpg" },
      { word: "নাচ", emoji: "💃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bengali_dance.jpg/640px-Bengali_dance.jpg" },
      { word: "নাক", emoji: "👃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Nose.jpg/640px-Nose.jpg" },
      { word: "নীলকমল", emoji: "🪷", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Blue_lotus.jpg/640px-Blue_lotus.jpg" }
    ]
  },
  {
    id: "c21",
    letter: "প",
    type: "consonant",
    color: "bg-gradient-to-br from-rose-600 to-rose-800",
    words: [
      { word: "পাখি", emoji: "🐦", img: "https://dailyinqilab.com/mediaStorage/content/images/2023July/3-20230715232811.jpg" },
      { word: "পানি", emoji: "💧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/A_drop_of_water.jpg/640px-A_drop_of_water.jpg" },
      { word: "পাখা", emoji: "🪭", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Hand_fan.jpg/640px-Hand_fan.jpg" },
      { word: "পাতা", emoji: "🍃", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Green_leaf.jpg/640px-Green_leaf.jpg" },
      { word: "পায়রা", emoji: "🕊️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Columba_livia_-_Pigeon_-2006-03-17.jpg/640px-Columba_livia_-_Pigeon_-2006-03-17.jpg" },
      { word: "পেঁপে", emoji: "🍈", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Papaya_fruit.jpg/640px-Papaya_fruit.jpg" }
    ]
  },
  {
    id: "c22",
    letter: "ফ",
    type: "consonant",
    color: "bg-gradient-to-br from-orange-600 to-orange-800",
    words: [
      { word: "ফল", emoji: "🍎", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR5oSwLa5IKObRocmhfb6t__ml3c9MaEdD-g&s" },
      { word: "ফুল", emoji: "🌸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rose_flower.jpg/640px-Rose_flower.jpg" },
      { word: "ফুটপাথ", emoji: "🚶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Pavement.jpg/640px-Pavement.jpg" },
      { word: "ফেন", emoji: "🫧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Soap_bubbles.jpg/640px-Soap_bubbles.jpg" },
      { word: "ফটো", emoji: "📸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Camera.jpg/640px-Camera.jpg" },
      { word: "ফার্ম", emoji: "🌾", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Farm_land.jpg/640px-Farm_land.jpg" }
    ]
  },
  {
    id: "c23",
    letter: "ব",
    type: "consonant",
    color: "bg-gradient-to-br from-amber-600 to-amber-800",
    words: [
      { word: "বল", emoji: "⚽", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpWYrghiDKltoF-RdleMucrL42X99efH6lXA&s" },
      { word: "বই", emoji: "📚", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Books.jpg/640px-Books.jpg" },
      { word: "বাড়ি", emoji: "🏡", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Typical_Bengali_Roof.jpg/640px-Typical_Bengali_Roof.jpg" },
      { word: "বাতাস", emoji: "💨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Wind_trees.jpg/640px-Wind_trees.jpg" },
      { word: "বন", emoji: "🌲", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/A_large_glimpse_of_the_green_tree.jpg/640px-A_large_glimpse_of_the_green_tree.jpg" },
      { word: "বাস", emoji: "🚌", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bus.jpg/640px-Bus.jpg" }
    ]
  },
  {
    id: "c24",
    letter: "ভ",
    type: "consonant",
    color: "bg-gradient-to-br from-yellow-600 to-yellow-800",
    words: [
      { word: "ভাল্লুক", emoji: "🐻", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEmC4-VErHEbM4gJIT6wBbXmZ45YQ8iJTpSQ&s" },
      { word: "ভাত", emoji: "🍚", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/White_rice.jpg/640px-White_rice.jpg" },
      { word: "ভুট্টা", emoji: "🌽", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Corn.jpg/640px-Corn.jpg" },
      { word: "ভূত", emoji: "👻", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ghost.svg/640px-Ghost.svg.png" },
      { word: "ভর্তা", "emoji": "🥘", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Mashed_potatoes.jpg/640px-Mashed_potatoes.jpg" },
      { word: "ভার্তা", "emoji": "🥪", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sandwich.jpg/640px-Sandwich.jpg" }
    ]
  },
  {
    id: "c25",
    letter: "ম",
    type: "consonant",
    color: "bg-gradient-to-br from-emerald-600 to-emerald-800",
    words: [
      { word: "মাছ", emoji: "🐟", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zDOm2oFyieVqwaWQe2Bha3-7Ylk15QD9mg&s" },
      { word: "মানুষ", emoji: "👤", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Man_standing.jpg/640px-Man_standing.jpg" },
      { word: "ময়না", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Common_myna.jpg/640px-Common_myna.jpg" },
      { word: "মধু", emoji: "🍯", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Honey_jar.jpg/640px-Honey_jar.jpg" },
      { word: "মাটি", emoji: "🟤", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Mud.jpg/640px-Mud.jpg" },
      { word: "মরিচ", emoji: "🌶️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Green_chili.jpg/640px-Green_chili.jpg" }
    ]
  },
  {
    id: "c26",
    letter: "য",
    type: "consonant",
    color: "bg-gradient-to-br from-blue-700 to-blue-900",
    words: [
      { word: "যাতা", emoji: "💀", img: "https://kalaroanews.com/wp-content/uploads/2026/04/IMG_20260412_161500.jpg" },
      { word: "যমুনা", emoji: "🏞️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/River.jpg/640px-River.jpg" },
      { word: "যন্ত্র", emoji: "🔧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tools.jpg/640px-Tools.jpg" },
      { word: "যোগ", emoji: "🧘", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Yoga_posture.jpg/640px-Yoga_posture.jpg" },
      { word: "যমজ", emoji: "👦👦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Twins.jpg/640px-Twins.jpg" },
      { word: "যান", emoji: "🚗", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2019_Honda_Civic_sedan_%28facelift%29%2C_front_11.27.2021.jpg/640px-2019_Honda_Civic_sedan_%28facelift%29%2C_front_11.27.2021.jpg" }
    ]
  },
  {
    id: "c27",
    letter: "র",
    type: "consonant",
    color: "bg-gradient-to-br from-sky-700 to-sky-900",
    words: [
      { word: "রাজা", emoji: "👑", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhYxQJ6tJipPeIXxQMUQSIoQHjG1zFyj7Yg&s" },
      { word: "রোদ", emoji: "☀️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Sun_in_the_sky.jpg/640px-Sun_in_the_sky.jpg" },
      { word: "রাস্তা", emoji: "🛣️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Asphalt_road.jpg/640px-Asphalt_road.jpg" },
      { word: "রান্না", emoji: "🍳", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cooking.jpg/640px-Cooking.jpg" },
      { word: "রঙ", emoji: "🎨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Color_palette.jpg/640px-Color_palette.jpg" },
      { word: "রুটি", emoji: "🍞", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bread.jpg/640px-Bread.jpg" }
    ]
  },
  {
    id: "c28",
    letter: "ল",
    type: "consonant",
    color: "bg-gradient-to-br from-indigo-700 to-indigo-900",
    words: [
      { word: "লেবু", emoji: "🍋", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzOfrkgW9MAH_v47pQtTRjLb7zB_J9ee0BXQ&s" },
      { word: "লক্ষ্মী", emoji: "🙏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Lakshmi.jpg/640px-Lakshmi.jpg" },
      { word: "লেখা", emoji: "✍️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Writing.jpg/640px-Writing.jpg" },
      { word: "লাঠি", emoji: "🏏", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bamboo_stick.jpg/640px-Bamboo_stick.jpg" },
      { word: "লাল", emoji: "🔴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Red_circle.jpg/640px-Red_circle.jpg" },
      { word: "লাউ", emoji: "🫛", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Calabash.jpg/640px-Calabash.jpg" }
    ]
  },
  {
    id: "c29",
    letter: "শ",
    type: "consonant",
    color: "bg-gradient-to-br from-teal-700 to-teal-900",
    words: [
      { word: "শাপলা", emoji: "🪷", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3q278msxhlRTIJQLVx0vqD9qHoZFlPr8zcg&s" },
      { word: "শাক", emoji: "🥬", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Green_vegetables.jpg/640px-Green_vegetables.jpg" },
      { word: "শিক্ষক", emoji: "👨‍🏫", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Teacher_in_classroom.jpg/640px-Teacher_in_classroom.jpg" },
      { word: "শহর", emoji: "🏙️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Dhaka_Skyline.jpg/640px-Dhaka_Skyline.jpg" },
      { word: "শিলা", emoji: "🪨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rocks.jpg/640px-Rocks.jpg" },
      { word: "শিশু", emoji: "👶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Baby.jpg/640px-Baby.jpg" }
    ]
  },
  {
    id: "c30",
    letter: "ষ",
    type: "consonant",
    color: "bg-gradient-to-br from-pink-700 to-pink-900",
    words: [
      { word: "ষাঁড়", emoji: "🐂", img: "https://www.newsbangla24.com/assets/news_images/2022/02/16/Cow.webp" },
      { word: "ষ্টেশন", emoji: "🚉", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Train_station.jpg/640px-Train_station.jpg" },
      { word: "ষ্ট্রিং", emoji: "🎻", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Violin.jpg/640px-Violin.jpg" },
      { word: "ষ্টিকার", emoji: "🏷️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Sticker.jpg/640px-Sticker.jpg" },
      { word: "ষ্টাইল", emoji: "👔", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Hairstyle.jpg/640px-Hairstyle.jpg" },
      { word: "ষ্টাম্প", emoji: "📮", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Postage_stamp.jpg/640px-Postage_stamp.jpg" }
    ]
  },
  {
    id: "c31",
    letter: "স",
    type: "consonant",
    color: "bg-gradient-to-br from-rose-700 to-rose-900",
    words: [
      { word: "সিংহ", emoji: "🦁", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAJKK6EiFpDqsNyKbJd_6iXIeetSADqrgvWw&s" },
      { word: "সূর্য", emoji: "🌞", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Sun_in_the_sky.jpg/640px-Sun_in_the_sky.jpg" },
      { word: "সাপ", emoji: "🐍", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cobra.jpg/640px-Cobra.jpg" },
      { word: "সোনা", emoji: "🥇", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Gold_bar.jpg/640px-Gold_bar.jpg" },
      { word: "সবুজ", emoji: "💚", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/A_large_glimpse_of_the_green_tree.jpg/640px-A_large_glimpse_of_the_green_tree.jpg" },
      { word: "সমুদ্র", emoji: "🌊", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ocean_wave.jpg/640px-Ocean_wave.jpg" }
    ]
  },
  {
    id: "c32",
    letter: "হ",
    type: "consonant",
    color: "bg-gradient-to-br from-slate-600 to-slate-800",
    words: [
      { word: "হাতি", emoji: "🐘", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3Di0QWim51xGcsu2whEVcDxsYPTzjXJSlA&s" },
      { word: "হাত", emoji: "✋", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hand.jpg/640px-Hand.jpg" },
      { word: "হাতুড়ি", emoji: "🔨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hammer.jpg/640px-Hammer.jpg" },
      { word: "হাওদা", emoji: "🛺", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Auto_rickshaw_in_Bangladesh.jpg/640px-Auto_rickshaw_in_Bangladesh.jpg" },
      { word: "হিমঘর", emoji: "🏔️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Igloo.jpg/640px-Igloo.jpg" },
      { word: "হিমালয়", emoji: "🏔️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Himalaya.jpg/640px-Himalaya.jpg" }
    ]
  },
  {
    id: "c33",
    letter: "ড়",
    type: "consonant",
    color: "bg-gradient-to-br from-orange-700 to-orange-900",
    words: [
      { word: "ঘড়", emoji: "🏰", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf8_PRDqV3AgIz4XjS6KD1aYFDp1OMudBaYw&s" },
      { word: "ঘড়ি", emoji: "🕒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Wristwatch.jpg/640px-Wristwatch.jpg" },
      { word: "ড়িয়া", emoji: "🐸", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tadpole.jpg/640px-Tadpole.jpg" },
      { word: "ড়েঁড়ি", emoji: "🌴", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palm_tree.jpg/640px-Palm_tree.jpg" },
      { word: "ড়াই", emoji: "🏗️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Plastering.jpg/640px-Plastering.jpg" },
      { word: "ড়েঙা পাখি", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Weaver_bird.jpg/640px-Weaver_bird.jpg" }
    ]
  },
  {
    id: "c34",
    letter: "ঢ়",
    type: "consonant",
    color: "bg-gradient-to-br from-emerald-700 to-emerald-900",
    words: [
      { word: "আষাঢ়", emoji: "🌧️", img: "https://www.doynikpratidinbangladesh.com/wp-content/uploads/2024/06/IMG_20240615_105704-600x337.jpg" },
      { word: "ঢাল", emoji: "🛡️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Shield.jpg/640px-Shield.jpg" },
      { word: "ঢ়াই মাছ", emoji: "🐟", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Woman_carrying_fish.jpg/640px-Woman_carrying_fish.jpg" },
      { word: "গড়", emoji: "🏗️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Welding.jpg/640px-Welding.jpg" },
      { word: "ঢিল", emoji: "🪨", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Pebbles.jpg/640px-Pebbles.jpg" },
      { word: "ঢ়ুই পাখি", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Weaver_bird.jpg/640px-Weaver_bird.jpg" }
    ]
  },
  {
    id: "c35",
    letter: "য়",
    type: "consonant",
    color: "bg-gradient-to-br from-purple-700 to-purple-900",
    words: [
      { word: "ময়না", emoji: "🐦‍⬛", img: "https://www.teachers.gov.bd/shared/blog_image/2025/July/01/1751348474686374fa33bbf.webp" },
      { word: "য়ামিনী পাখি", emoji: "🐦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Common_myna.jpg/640px-Common_myna.jpg" },
      { word: "য়াক", emoji: "🐂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Yoke.jpg/640px-Yoke.jpg" },
      { word: "য়ারিশ", emoji: "🟫", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Floor_tiles.jpg/640px-Floor_tiles.jpg" },
      { word: "য়াবত", emoji: "🐘", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Elephant_near_Jaipur.jpg/640px-Elephant_near_Jaipur.jpg" },
      { word: "য়ুরোপ", emoji: "🗺️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Europe_map.jpg/640px-Europe_map.jpg" }
    ]
  },
  {
    id: "c36",
    letter: "ৎ",
    type: "consonant",
    color: "bg-gradient-to-br from-amber-700 to-amber-900",
    words: [
      { word: "জিৎ", emoji: "🏆", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF38fvAbUOzElTUrDydxdo--18QN0hRmyF3g&s" },
      { word: "সৎপুরুষ", emoji: "🧔", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Good_man.jpg/640px-Good_man.jpg" },
      { word: "পরিত্যক্ত", emoji: "🏚️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Abandoned_house.jpg/640px-Abandoned_house.jpg" },
      { word: "মুক্ত", emoji: "🕊️", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Columba_livia_-_Pigeon_-2006-03-17.jpg/640px-Columba_livia_-_Pigeon_-2006-03-17.jpg" },
      { word: "বন্দিত", emoji: "🏅", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Award_ceremony.jpg/640px-Award_ceremony.jpg" },
      { word: "বিজ্ঞান", emoji: "🔬", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Science_book.jpg/640px-Science_book.jpg" }
    ]
  },
  {
    id: "c37",
    letter: "ং",
    type: "consonant",
    color: "bg-gradient-to-br from-yellow-700 to-yellow-900",
    words: [
      { word: "ফড়িং", emoji: "🦗", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Dragonfly_ran-387.jpg/1280px-Dragonfly_ran-387.jpg?utm_source=en.wiktionary.org&utm_campaign=index&utm_content=thumbnail" },
      { word: "সিংহ", emoji: "🦁", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Male_Lion_and_Lioness_at_Sabi_Sands.jpg/640px-Male_Lion_and_Lioness_at_Sabi_Sands.jpg" }
    ]
  }
];

export const KAR_SIGNS: KarSignItem[] = [
  {
    vowel: 'অ',
    kar: '',
    example: 'ক',
    meaning: 'অ-কার',
    color: 'from-gray-500 to-slate-600'
  },
  {
    vowel: 'আ',
    kar: 'া',
    example: 'কা',
    meaning: 'আ-কার',
    color: 'from-red-500 to-rose-600',
    wordExample: { word: 'কান', emoji: '👂' }
  },
  {
    vowel: 'ই',
    kar: 'ি',
    example: 'কি',
    meaning: 'ই-কার',
    color: 'from-orange-500 to-amber-600',
    wordExample: { word: 'কিল', emoji: '👊' }
  },
  {
    vowel: 'ঈ',
    kar: 'ী',
    example: 'কী',
    meaning: 'ঈ-কার',
    color: 'from-yellow-500 to-lime-600',
    wordExample: { word: 'কীট', emoji: '🐛' }
  },
  {
    vowel: 'উ',
    kar: 'ু',
    example: 'কু',
    meaning: 'উ-কার',
    color: 'from-green-500 to-emerald-600',
    wordExample: { word: 'কুকুর', emoji: '🐕' }
  },
  {
    vowel: 'ঊ',
    kar: 'ূ',
    example: 'কূ',
    meaning: 'ঊ-কার',
    color: 'from-teal-500 to-cyan-600',
    wordExample: { word: 'কূপ', emoji: '🕳️' }
  },
  {
    vowel: 'ঋ',
    kar: 'ৃ',
    example: 'কৃ',
    meaning: 'ঋ-কার',
    color: 'from-cyan-500 to-blue-600',
    wordExample: { word: 'কৃষক', emoji: '👨‍🌾' }
  },
  {
    vowel: 'এ',
    kar: 'ে',
    example: 'কে',
    meaning: 'এ-কার',
    color: 'from-blue-500 to-indigo-600',
    wordExample: { word: 'কেক', emoji: '🎂' }
  },
  {
    vowel: 'ঐ',
    kar: 'ৈ',
    example: 'কৈ',
    meaning: 'ঐ-কার',
    color: 'from-indigo-500 to-violet-600',
    wordExample: { word: 'কৈ', emoji: '🐟' }
  },
  {
    vowel: 'ও',
    kar: 'ো',
    example: 'কো',
    meaning: 'ও-কার',
    color: 'from-violet-500 to-purple-600',
    wordExample: { word: 'কোট', emoji: '🧥' }
  },
  {
    vowel: 'ঔ',
    kar: 'ৌ',
    example: 'কৌ',
    meaning: 'ঔ-কার',
    color: 'from-pink-500 to-rose-600',
    wordExample: { word: 'কৌটা', emoji: '🫙' }
  }
];

export const KAR_WORDS_DATA: KarWordsGroup[] = [
  {
    id: 'kar_a',
    kar: 'া',
    name: 'আ-কার',
    color: 'from-red-500 to-rose-600',
    words: [
      { word: 'কান', emoji: '👂', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Human_Ear_01.jpg/640px-Human_Ear_01.jpg' },
      { word: 'কাক', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/House_Crow_RWD2.jpg/640px-House_Crow_RWD2.jpg' },
      { word: 'কাজ', emoji: '🛠️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hammer-and-nails.jpg/640px-Hammer-and-nails.jpg' },
      { word: 'কাগজ', emoji: '📄', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Blank_sheet_of_paper.jpg/640px-Blank_sheet_of_paper.jpg' },
      { word: 'কাঠ', emoji: '🪵', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Stack_of_logs_in_the_forest.jpg/640px-Stack_of_logs_in_the_forest.jpg' },
      { word: 'কাঁঠাল', emoji: '🍈', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.jpg/640px-Jackfruit_hanging.jpg' }
    ]
  },
  {
    id: 'kar_i',
    kar: 'ি',
    name: 'ই-কার',
    color: 'from-orange-500 to-amber-600',
    words: [
      { word: 'কিল', emoji: '👊', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Fist_raised.jpg/640px-Fist_raised.jpg' },
      { word: 'কিসমিস', emoji: '🍇', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sultanas_on_plate.jpg/640px-Sultanas_on_plate.jpg' },
      { word: 'কিরণ', emoji: '☀️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sunrays_through_trees_in_forest.jpg/640px-Sunrays_through_trees_in_forest.jpg' },
      { word: 'কিশোর', emoji: '🧑', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Young_boy_with_green_shirt.jpg/640px-Young_boy_with_green_shirt.jpg' },
      { word: 'কিউই', emoji: '🥝', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kiwi_aka.jpg/640px-Kiwi_aka.jpg' },
      { word: 'কিবোর্ড', emoji: '⌨️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Standard_keyboard.jpg/640px-Standard_keyboard.jpg' }
    ]
  },
  {
    id: 'kar_ii',
    kar: 'ী',
    name: 'ঈ-কার',
    color: 'from-yellow-500 to-lime-600',
    words: [
      { word: 'কীট', emoji: '🐛', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Caterpillar_of_Papilio_machaon.jpg/640px-Caterpillar_of_Papilio_machaon.jpg' },
      { word: 'কীর্তন', emoji: '🎤', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Kirtan_performance_India.jpg/640px-Kirtan_performance_India.jpg' },
      { word: 'কীর্তি', emoji: '🏛️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shaheed_Minar_Dhaka_2020.jpg/640px-Shaheed_Minar_Dhaka_2020.jpg' },
      { word: 'কীলাক', emoji: '📌', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pushpins.jpg/640px-Pushpins.jpg' },
      { word: 'কীশ', emoji: '🐒', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Rhesus_macaque_kid.jpg/640px-Rhesus_macaque_kid.jpg' },
      { word: 'কী', emoji: '❓', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Question_mark.svg/640px-Question_mark.svg.png' }
    ]
  },
  {
    id: 'kar_u',
    kar: 'ু',
    name: 'উ-কার',
    color: 'from-green-500 to-emerald-600',
    words: [
      { word: 'কुकুর', emoji: '🐕', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collared_Dog.jpg/640px-Collared_Dog.jpg' },
      { word: 'কুল', emoji: '🍒', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ziziphus_mauritiana_fruit_India.jpg/640px-Ziziphus_mauritiana_fruit_India.jpg' },
      { word: 'কুলা', emoji: '🧹', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Winnowing_basket_Bangladesh.jpg/640px-Winnowing_basket_Bangladesh.jpg' },
      { word: 'কুঁড়েঘর', emoji: '🏠', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Thatched_cottage_in_village.jpg/640px-Thatched_cottage_in_village.jpg' },
      { word: 'কুদাল', emoji: '⛏️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Spade_or_hoe.jpg/640px-Spade_or_hoe.jpg' },
      { word: 'কুয়াশা', emoji: '🌫️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Foggy_morning_in_rural_Bangladesh.jpg/640px-Foggy_morning_in_rural_Bangladesh.jpg' }
    ]
  },
  {
    id: 'kar_uu',
    kar: 'ূ',
    name: 'ঊ-কার',
    color: 'from-teal-500 to-cyan-600',
    words: [
      { word: 'কূপ', emoji: '🕳️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Water_well_stone.jpg/640px-Water_well_stone.jpg' },
      { word: 'কূজন', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Chirping_sparrow.jpg/640px-Chirping_sparrow.jpg' },
      { word: 'কূটা', emoji: '🌾', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Rice_straw_stack.jpg/640px-Rice_straw_stack.jpg' },
      { word: 'কূর্ম', emoji: '🐢', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Indian_star_tortoise.jpg/640px-Indian_star_tortoise.jpg' },
      { word: 'কূল', emoji: '🏖️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/River_bank_sand.jpg/640px-River_bank_sand.jpg' },
      { word: 'কূট', emoji: '🏔️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mount_Everest_from_Gokyo_Ri_November_2012.jpg/640px-Mount_Everest_from_Gokyo_Ri_November_2012.jpg' }
    ]
  },
  {
    id: 'kar_ri',
    kar: 'ৃ',
    name: 'ঋ-কার',
    color: 'from-cyan-500 to-blue-600',
    words: [
      { word: 'কৃষক', emoji: '👨‍🌾', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Nepalese_Farmer.jpg/640px-Nepalese_Farmer.jpg' },
      { word: 'কৃমি', emoji: '🐛', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Earthworm_on_soil.jpg/640px-Earthworm_on_soil.jpg' },
      { word: 'কৃষ্ণচুড়া', emoji: '🌺', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Krishnachura_flowers.jpg/640px-Krishnachura_flowers.jpg' },
      { word: 'কৃপাণ', emoji: '🗡️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Traditional_kirpan_dagger.jpg/640px-Traditional_kirpan_dagger.jpg' },
      { word: 'কৃষ্ণ', emoji: '🌌', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lord_Krishna_painting.jpg/640px-Lord_Krishna_painting.jpg' },
      { word: 'কৃশ', emoji: '🧍', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lean_slender_person.jpg/640px-Lean_slender_person.jpg' }
    ]
  },
  {
    id: 'kar_e',
    kar: 'ে',
    name: 'এ-কার',
    color: 'from-blue-500 to-indigo-600',
    words: [
      { word: 'কেক', emoji: '🎂', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_cake_slice.jpg/640px-Pound_cake_slice.jpg' },
      { word: 'কেঁচো', emoji: '🪱', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Earthworm_on_ground.jpg/640px-Earthworm_on_ground.jpg' },
      { word: 'কেতলি', emoji: '🫖', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Stainless_steel_kettle.jpg/640px-Stainless_steel_kettle.jpg' },
      { word: 'কেশর', emoji: '🦁', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Lion_mane_closeup.jpg/640px-Lion_mane_closeup.jpg' },
      { word: 'কেয়া', emoji: '🌼', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Pandanus_odorifer_flower.jpg/640px-Pandanus_odorifer_flower.jpg' },
      { word: 'কেবিন', emoji: '🛖', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Wooden_cabin_in_woods.jpg/640px-Wooden_cabin_in_woods.jpg' }
    ]
  },
  {
    id: 'kar_oi',
    kar: 'ৈ',
    name: 'ঐ-কার',
    color: 'from-indigo-500 to-violet-600',
    words: [
      { word: 'কৈ', emoji: '🐟', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Anabas_testudineus_fish.jpg/640px-Anabas_testudineus_fish.jpg' },
      { word: 'কৈশোর', emoji: '🧑', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Group_of_happy_teens.jpg/640px-Group_of_happy_teens.jpg' },
      { word: 'কৈলাশ', emoji: '🏔️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mount_Kailash_Tibet.jpg/640px-Mount_Kailash_Tibet.jpg' },
      { word: 'কৈবর্ত', emoji: '🎣', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Fisherman_casting_net_in_river.jpg/640px-Fisherman_casting_net_in_river.jpg' },
      { word: 'কৈফিয়ত', emoji: '📝', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Writing_on_paper_with_pen.jpg/640px-Writing_on_paper_with_pen.jpg' },
      { word: 'কৈশিক', emoji: '🧪', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Capillary_action_in_tubes.jpg/640px-Capillary_action_in_tubes.jpg' }
    ]
  },
  {
    id: 'kar_o',
    kar: 'ো',
    name: 'ও-কার',
    color: 'from-violet-500 to-purple-600',
    words: [
      { word: 'কোট', emoji: '🧥', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Classic_wool_trench_coat.jpg/640px-Classic_wool_trench_coat.jpg' },
      { word: 'কোণ', emoji: '📐', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Right_angle_on_protractor.jpg/640px-Right_angle_on_protractor.jpg' },
      { word: 'কোল', emoji: '🤱', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Mother_holding_baby.jpg/640px-Mother_holding_baby.jpg' },
      { word: 'কোকিল', emoji: '🐦', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Asian_Koel_Male_RWD.jpg/640px-Asian_Koel_Male_RWD.jpg' },
      { word: 'কোমর', emoji: '🧍', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Waist_measurement_tape.jpg/640px-Waist_measurement_tape.jpg' },
      { word: 'কোয়া', emoji: '🍊', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Orange_slices_isolated.jpg/640px-Orange_slices_isolated.jpg' }
    ]
  },
  {
    id: 'kar_ou',
    kar: 'ৌ',
    name: 'ঔ-কার',
    color: 'from-pink-500 to-rose-600',
    words: [
      { word: 'কৌটা', emoji: '🫙', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tin_can_metal.jpg/640px-Tin_can_metal.jpg' },
      { word: 'কৌতুক', emoji: '🤣', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Funny_man.jpg/640px-Funny_man.jpg' },
      { word: 'কৌতূহল', emoji: '🧐', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Curious_child_looking_at_camera.jpg/640px-Curious_child_looking_at_camera.jpg' },
      { word: 'কৌশল', emoji: '♟️', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ChessPiecesArray.jpg/640px-ChessPiecesArray.jpg' },
      { word: 'কৌণিক', emoji: '📐', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ruler_and_protractor.jpg/640px-Ruler_and_protractor.jpg' },
      { word: 'কৌস্তুভ', emoji: '💎', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cut_diamond_isolated.jpg/640px-Cut_diamond_isolated.jpg' }
    ]
  }
];

export const BENGALI_KAR_TEN_WORDS_DATA: KarWordsGroup[] = [
  {
    id: 'ten_kar_a',
    kar: 'া',
    name: 'আ-কার (া)',
    color: 'from-rose-500 to-pink-600',
    words: [
      { word: 'বাবা', emoji: '👨‍👦', img: '' },
      { word: 'মা', emoji: '👩‍👦', img: '' },
      { word: 'খাতা', emoji: '📓', img: '' },
      { word: 'গাছ', emoji: '🌳', img: '' },
      { word: 'জামা', emoji: '👕', img: '' },
      { word: 'পাতা', emoji: '🍃', img: '' },
      { word: 'দাদা', emoji: '👴', img: '' },
      { word: 'চাকা', emoji: '🎡', img: '' },
      { word: 'টাকা', emoji: '💵', img: '' },
      { word: 'সাপ', emoji: '🐍', img: '' }
    ]
  },
  {
    id: 'ten_kar_i',
    kar: 'ি',
    name: 'ই-কার (ি)',
    color: 'from-orange-500 to-amber-600',
    words: [
      { word: 'দিন', emoji: '☀️', img: '' },
      { word: 'বিল', emoji: '🏞️', img: '' },
      { word: 'মিঠাই', emoji: '🍬', img: '' },
      { word: 'ছবি', emoji: '🖼️', img: '' },
      { word: 'শিশু', emoji: '👶', img: '' },
      { word: 'চিনি', emoji: '🍚', img: '' },
      { word: 'দিক', emoji: '🧭', img: '' },
      { word: 'তিল', emoji: '🫘', img: '' },
      { word: 'ঝিনুক', emoji: '🐚', img: '' },
      { word: 'কিরণ', emoji: '🔆', img: '' }
    ]
  },
  {
    id: 'ten_kar_ii',
    kar: 'ী',
    name: 'ঈ-কার (ী)',
    color: 'from-yellow-500 to-amber-500',
    words: [
      { word: 'নীল', emoji: '🔵', img: '' },
      { word: 'দীপ', emoji: '🪔', img: '' },
      { word: 'গীত', emoji: '🎶', img: '' },
      { word: 'সীতা', emoji: '👸', img: '' },
      { word: 'পীঠ', emoji: '🏛️', img: '' },
      { word: 'বীণা', emoji: '🪕', img: '' },
      { word: 'চীন', emoji: '🇨🇳', img: '' },
      { word: 'নীতি', emoji: '⚖️', img: '' },
      { word: 'जीवी', emoji: '🧑‍💼', img: '' },
      { word: 'ধীর', emoji: '🐢', img: '' }
    ]
  },
  {
    id: 'ten_kar_u',
    kar: 'u',
    name: 'উ-কার (ু)',
    color: 'from-green-500 to-emerald-600',
    words: [
      { word: 'ফুল', emoji: '🌸', img: '' },
      { word: 'কুল', emoji: '🍒', img: '' },
      { word: 'দুল', emoji: '💎', img: '' },
      { word: 'চুল', emoji: '💇', img: '' },
      { word: 'সুর', emoji: '🎵', img: '' },
      { word: 'মুকুট', emoji: '👑', img: '' },
      { word: 'ভুত', emoji: '👻', img: '' },
      { word: 'পুতুল', emoji: '🪆', img: '' },
      { word: 'কুমির', emoji: '🐊', img: '' },
      { word: 'কুটির', emoji: '🛖', img: '' }
    ]
  },
  {
    id: 'ten_kar_uu',
    kar: 'ূ',
    name: 'ঊ-কার (ূ)',
    color: 'from-teal-500 to-cyan-600',
    words: [
      { word: 'সূর্য', emoji: '☀️', img: '' },
      { word: 'দূর', emoji: '🔭', img: '' },
      { word: 'ভূত', emoji: '👻', img: '' },
      { word: 'চূড়া', emoji: '🏔️', img: '' },
      { word: 'নূর', emoji: '🌟', img: '' },
      { word: 'ধূম', emoji: '💨', img: '' },
      { word: 'মূর্তি', emoji: '🗿', img: '' },
      { word: 'পূজা', emoji: '🪔', img: '' },
      { word: 'মূল', emoji: '🌱', img: '' },
      { word: 'শূন্য', emoji: '⭕', img: '' }
    ]
  },
  {
    id: 'ten_kar_ri',
    kar: 'ৃ',
    name: 'ঋ-কার (ৃ)',
    color: 'from-cyan-500 to-blue-600',
    words: [
      { word: 'তৃষ্ণা', emoji: '🥛', img: '' },
      { word: 'কৃষক', emoji: '👨‍🌾', img: '' },
      { word: 'মৃগ', emoji: '🦌', img: '' },
      { word: 'বৃক্ষ', emoji: '🌳', img: '' },
      { word: 'গৃহ', emoji: '🏠', img: '' },
      { word: 'কৃমি', emoji: '🐛', img: '' },
      { word: 'মৃৎপাত্র', emoji: '🏺', img: '' },
      { word: 'তৃণ', emoji: '🌾', img: '' },
      { word: 'ঘৃণা', emoji: '🤮', img: '' },
      { word: 'মৃত', emoji: '⚰️', img: '' }
    ]
  },
  {
    id: 'ten_kar_e',
    kar: 'ে',
    name: 'এ-কার (ে)',
    color: 'from-blue-500 to-indigo-600',
    words: [
      { word: 'মেঘ', emoji: '☁️', img: '' },
      { word: 'দেশ', emoji: '🇧🇩', img: '' },
      { word: 'খেল', emoji: '⚽', img: '' },
      { word: 'বেল', emoji: '🔔', img: '' },
      { word: 'লেখা', emoji: '✍️', img: '' },
      { word: 'কেক', emoji: '🎂', img: '' },
      { word: 'মেলা', emoji: '🎪', img: '' },
      { word: 'পেট', emoji: '🤰', img: '' },
      { word: 'সেবা', emoji: '🤝', img: '' },
      { word: 'রেল', emoji: '🚂', img: '' }
    ]
  },
  {
    id: 'ten_kar_oi',
    kar: 'ৈ',
    name: 'ঐ-কার (ৈ)',
    color: 'from-indigo-500 to-violet-600',
    words: [
      { word: 'দৈনিক', emoji: '📰', img: '' },
      { word: 'বৈশাখ', emoji: '🪘', img: '' },
      { word: 'কৈশোর', emoji: '🧑', img: '' },
      { word: 'বৈদ্য', emoji: '👨‍⚕️', img: '' },
      { word: 'সৈনিক', emoji: '🪖', img: '' },
      { word: 'নৈপুণ্য', emoji: '🎯', img: '' },
      { word: 'তৈল', emoji: '🫗', img: '' },
      { word: 'বৈকাল', emoji: '🌅', img: '' },
      { word: 'ঐক্য', emoji: '🤝', img: '' },
      { word: 'দৈত্য', emoji: '👹', img: '' }
    ]
  },
  {
    id: 'ten_kar_o',
    kar: 'ো',
    name: 'ও-কার (ো)',
    color: 'from-violet-500 to-purple-600',
    words: [
      { word: 'গোল', emoji: '⚽', img: '' },
      { word: 'দোল', emoji: '🛝', img: '' },
      { word: 'বোতল', emoji: '🍾', img: '' },
      { word: 'মোজা', emoji: '🧦', img: '' },
      { word: 'দোকান', emoji: '🏪', img: '' },
      { word: 'সোনা', emoji: '🪙', img: '' },
      { word: 'রোদ', emoji: '☀️', img: '' },
      { word: 'খোকা', emoji: '👦', img: '' },
      { word: 'বোকা', emoji: '🤪', img: '' },
      { word: 'লোক', emoji: '👨', img: '' }
    ]
  },
  {
    id: 'ten_kar_ou',
    kar: 'ৌ',
    name: 'ঔ-কার (ৌ)',
    color: 'from-pink-500 to-rose-600',
    words: [
      { word: 'মৌমাছি', emoji: '🐝', img: '' },
      { word: 'বৌ', emoji: '👰', img: '' },
      { word: 'কৌতুক', emoji: '🤣', img: '' },
      { word: 'সৌরভ', emoji: '🌹', img: '' },
      { word: 'গৌরভ', emoji: '🏆', img: '' },
      { word: 'দৌড়', emoji: '🏃', img: '' },
      { word: 'পৌষ', emoji: '🥶', img: '' },
      { word: 'নৌকা', emoji: '⛵', img: '' },
      { word: 'মৌলিক', emoji: '🧬', img: '' },
      { word: 'কৌটা', emoji: '🫙', img: '' }
    ]
  }
];

export const BENGALI_KAR_CONJUNCT_WORDS_DATA: KarWordsGroup[] = [
  {
    id: 'conj_kar_a',
    kar: 'া',
    name: 'আ-কার (া)',
    color: 'from-red-500 to-rose-600',
    words: [
      { word: 'গ্রাম', emoji: '🏡', img: '' },
      { word: 'শ্রাবণ', emoji: '🌧️', img: '' },
      { word: 'ছাত্র', emoji: '🧑‍🎓', img: '' },
      { word: 'ক্লাস', emoji: '🏫', img: '' },
      { word: 'জ্ঞান', emoji: '🧠', img: '' },
      { word: 'প্রার্থনা', emoji: '🙏', img: '' },
      { word: 'স্বাদ', emoji: '😋', img: '' },
      { word: 'ত্রাণ', emoji: '📦', img: '' },
      { word: 'ভ্রাতা', emoji: '👦', img: '' },
      { word: 'ক্রান্তি', emoji: '📈', img: '' }
    ]
  },
  {
    id: 'conj_kar_i',
    kar: 'ি',
    name: 'ই-কার (ি)',
    color: 'from-orange-500 to-amber-600',
    words: [
      { word: 'ত্রিশ', emoji: '3️⃣', img: '' },
      { word: 'স্মৃতি', emoji: '🧠', img: '' },
      { word: 'শ্রদ্ধি', emoji: '🙏', img: '' },
      { word: 'গির্জা', emoji: '⛪', img: '' },
      { word: 'চিত্র', emoji: '🎨', img: '' },
      { word: 'বিজ্ঞানী', emoji: '🧑‍🔬', img: '' },
      { word: 'কৃষি', emoji: '🌾', img: '' },
      { word: 'ত্রিভুজ', emoji: '🔺', img: '' },
      { word: 'শৃঙ্খলি', emoji: '⛓️', img: '' },
      { word: 'দৃষ্টি', emoji: '👁️', img: '' }
    ]
  },
  {
    id: 'conj_kar_ii',
    kar: 'ী',
    name: 'ঈ-কার (ী)',
    color: 'from-yellow-500 to-yellow-600',
    words: [
      { word: 'पृथ्वी', emoji: '🌍', img: '' },
      { word: 'স্ত্রী', emoji: '👩', img: '' },
      { word: 'শ্রীমান', emoji: '🤵', img: '' },
      { word: 'গ্রীষ্ম', emoji: '☀️', img: '' },
      { word: 'নীতিশাস্ত্রী', emoji: '📚', img: '' },
      { word: 'ত্রিশীর্ণ', emoji: '🔱', img: '' },
      { word: 'ক্রীড়া', emoji: '⚽', img: '' },
      { word: 'ভ্রাতৃবধূ', emoji: '👰', img: '' },
      { word: 'শ্রীমতী', emoji: '👩‍💼', img: '' },
      { word: 'সৃষ্টিশীল', emoji: '🎨', img: '' }
    ]
  },
  {
    id: 'conj_kar_u',
    kar: 'ু',
    name: 'উ-কার (ু)',
    color: 'from-green-500 to-emerald-600',
    words: [
      { word: 'বন্ধু', emoji: '🧑‍🤝‍🧑', img: '' },
      { word: 'পুস্তক', emoji: '📖', img: '' },
      { word: 'কুৎসিত', emoji: '👹', img: '' },
      { word: 'স্ফুলিঙ্গ', emoji: '✨', img: '' },
      { word: 'যুক্ত', emoji: '➕', img: '' },
      { word: 'গুরুত্ব', emoji: '⚖️', img: '' },
      { word: 'মুদ্রা', emoji: '🪙', img: '' },
      { word: 'তুচ্ছ', emoji: '🤏', img: '' },
      { word: 'স্তুতি', emoji: '🙌', img: '' },
      { word: 'পুষ্ট', emoji: '💪', img: '' }
    ]
  },
  {
    id: 'conj_kar_uu',
    kar: 'ূ',
    name: 'ঊ-কার (ূ)',
    color: 'from-teal-500 to-cyan-600',
    words: [
      { word: 'সূর্য', emoji: '☀️', img: '' },
      { word: 'শূন্য', emoji: '0️⃣', img: '' },
      { word: 'ভূমি', emoji: '🗺️', img: '' },
      { word: 'মূর্তি', emoji: '🗿', img: '' },
      { word: 'ধূম্র', emoji: '💨', img: '' },
      { word: 'চূর্ণ', emoji: '🌾', img: '' },
      { word: 'পূর্ণ', emoji: '🌕', img: '' },
      { word: 'দূষণ', emoji: '🏭', img: '' },
      { word: 'শূল্ক', emoji: '🪙', img: '' },
      { word: 'ভূগোল', emoji: '🌐', img: '' }
    ]
  },
  {
    id: 'conj_kar_ri',
    kar: 'ৃ',
    name: 'ঋ-কার (ৃ)',
    color: 'from-cyan-500 to-blue-600',
    words: [
      { word: 'কৃষ্ণ', emoji: '🦚', img: '' },
      { word: 'তৃষ্ণা', emoji: '🥛', img: '' },
      { word: 'বৃক্ষ', emoji: '🌳', img: '' },
      { word: 'মৃৎশিল্প', emoji: '🏺', img: '' },
      { word: 'গৃহ', emoji: '🏠', img: '' },
      { word: 'ঘৃণা', emoji: '🤢', img: '' },
      { word: 'তৃপ্ত', emoji: '😊', img: '' },
      { word: 'কৃতজ্ঞ', emoji: '🙏', img: '' },
      { word: 'মৃগয়া', emoji: '🏹', img: '' },
      { word: 'শৃঙ্খল', emoji: '⛓️', img: '' }
    ]
  },
  {
    id: 'conj_kar_e',
    kar: 'ে',
    name: 'এ-কার (ে)',
    color: 'from-blue-500 to-indigo-600',
    words: [
      { word: 'শ্রেণি', emoji: '🏫', img: '' },
      { word: 'প্রেম', emoji: '💖', img: '' },
      { word: 'কেন্দ্র', emoji: '🎯', img: '' },
      { word: 'ক্ষেত্র', emoji: '🌾', img: '' },
      { word: 'গ্রেপ্তার', emoji: '👮', img: '' },
      { word: 'ক্লেশ', emoji: '😫', img: '' },
      { word: 'স্বেচ্ছা', emoji: '🙋', img: '' },
      { word: 'ভ্রেষজ', emoji: '🌿', img: '' },
      { word: 'মেধা', emoji: '🧠', img: '' },
      { word: 'স্নেহ', emoji: '🫂', img: '' }
    ]
  },
  {
    id: 'conj_kar_oi',
    kar: 'ৈ',
    name: 'ঐ-কার (ৈ)',
    color: 'from-indigo-500 to-violet-600',
    words: [
      { word: 'বৈশাখ', emoji: '🪘', img: '' },
      { word: 'সৈনিক', emoji: '🪖', img: '' },
      { word: 'দৈর্ঘ্য', emoji: '📏', img: '' },
      { word: 'নৈর্ব্যক্তিক', emoji: '📝', img: '' },
      { word: 'কৈশোর', emoji: '🧑', img: '' },
      { word: 'বৈদ্য', emoji: '👨‍⚕️', img: '' },
      { word: 'ঐক্য', emoji: '🤝', img: '' },
      { word: 'দৈন্য', emoji: '🥺', img: '' },
      { word: 'বৈষম্য', emoji: '⚖️', img: '' },
      { word: 'নৈপুণ্য', emoji: '🎯', img: '' }
    ]
  },
  {
    id: 'conj_kar_o',
    kar: 'ো',
    name: 'ও-কার (ো)',
    color: 'from-violet-500 to-purple-600',
    words: [
      { word: 'বন্ধুত্ব', emoji: '🧑‍🤝‍🧑', img: '' },
      { word: 'গ্রোথ', emoji: '📈', img: '' },
      { word: 'শ্রোতা', emoji: '🎧', img: '' },
      { word: 'ক্রোধ', emoji: '😡', img: '' },
      { word: 'স্নেহভোজন', emoji: '🍽️', img: '' },
      { word: 'প্রেরণোৎসব', emoji: '🎉', img: '' },
      { word: 'ভ্রূণ', emoji: '👶', img: '' },
      { word: 'শোকগ্রস্ত', emoji: '😢', img: '' },
      { word: 'গ্লোব', emoji: '🌐', img: '' },
      { word: 'স্তোত্র', emoji: '📜', img: '' }
    ]
  },
  {
    id: 'conj_kar_ou',
    kar: 'ৌ',
    name: 'ঔ-কার (ৌ)',
    color: 'from-pink-500 to-rose-600',
    words: [
      { word: 'নৌকা', emoji: '⛵', img: '' },
      { word: 'কৌতূহল', emoji: '🧐', img: '' },
      { word: 'সৌন্দর্য', emoji: '💅', img: '' },
      { word: 'গৌরব', emoji: '🏆', img: '' },
      { word: 'মৌলিক', emoji: '🧬', img: '' },
      { word: 'দৌত্য', emoji: '✉️', img: '' },
      { word: 'কৌলীন্য', emoji: '👑', img: '' },
      { word: 'সৌভাগ্য', emoji: '🍀', img: '' },
      { word: 'মৌসুমি', emoji: '🌦️', img: '' },
      { word: 'পৌরসভা', emoji: '🏢', img: '' }
    ]
  }
];

export const BENGALI_CONJUNCTS_USAGE_DATA: ConjunctUsageItem[] = [
  { id: 'conj_1', conjunct: 'ক্ত', breakdown: 'ক্ + ত', words: ['ব্যক্তি', 'শক্তি', 'ভক্তি', 'রক্ত'] },
  { id: 'conj_2', conjunct: 'ক্ট্র', breakdown: 'ক্ + ত্ + র', words: ['বক্ত্র', 'শক্ত্র', 'যুক্ত্র', 'ভক্ত্র'] },
  { id: 'conj_3', conjunct: 'ক্ষ', breakdown: 'ক্ + ষ', words: ['শিক্ষা', 'লক্ষ্মী', 'রক্ষা', 'পক্ষ'] },
  { id: 'conj_4', conjunct: 'ক্র', breakdown: 'ক্ + র', words: ['ক্রিয়া', 'ক্রোধ', 'ক্রম', 'ক্রেতা'] },
  { id: 'conj_5', conjunct: 'ক্ল', breakdown: 'ক্ + ল', words: ['ক্লাস', 'ক্লান্ত', 'ক্লেশ', 'ক্লাব'] },
  { id: 'conj_6', conjunct: 'গ্ধ', breakdown: 'গ্ + ধ', words: ['দগ্ধ', 'মুগ্ধ', 'অগ্নিদগ্ধ', 'দগ্ধভূমি'] },
  { id: 'conj_7', conjunct: 'গ্র', breakdown: 'গ্ + র', words: ['গ্রাম', 'গ্রহণ', 'গ্রন্থ', 'গ্রহ'] },
  { id: 'conj_8', conjunct: 'গ্ল', breakdown: 'গ্ + ল', words: ['গ্লানি', 'গ্লাস', 'গ্লোব', 'গ্লুকোজ'] },
  { id: 'conj_9', conjunct: 'ঘ্ন', breakdown: 'ঘ্ + ন', words: ['বিঘ্ন', 'বিঘ্নিত', 'বিঘ্নকারী', 'বিঘ্নহীন'] },
  { id: 'conj_10', conjunct: 'ঙ্ক', breakdown: 'ঙ্ + ক', words: ['অঙ্ক', 'শঙ্কা', 'লঙ্কা', 'কঙ্কাল'] },
  { id: 'conj_11', conjunct: 'ঙ্খ', breakdown: 'ঙ্ + খ', words: ['শঙ্খ', 'শঙ্খচিল', 'শঙ্খধ্বনি', 'শঙ্খিনী'] },
  { id: 'conj_12', conjunct: 'ঙ্গ', breakdown: 'ঙ্ + গ', words: ['সঙ্গ', 'ভঙ্গ', 'অঙ্গ', 'সঙ্গীত'] },
  { id: 'conj_13', conjunct: 'ঙ্ঘ', breakdown: 'ঙ্ + ঘ', words: ['সংঘ', 'সংঘাত', 'সংঘর্ষ', 'সংঘবদ্ধ'] },
  { id: 'conj_14', conjunct: 'চ্ছ', breakdown: 'ચ્ + ছ', words: ['ইচ্ছা', 'স্বেচ্ছা', 'মচ্ছব', 'অনিচ্ছা'] },
  { id: 'conj_15', conjunct: 'জ্জ', breakdown: 'জ্ + জ', words: ['লজ্জা', 'সজ্জন', ' সজ্জিত', 'উজ্জ্বল'] },
  { id: 'conj_16', conjunct: 'জ্ঞ', breakdown: 'জ্ + ঞ', words: ['জ্ঞান', 'বিজ্ঞ', 'প্রজ্ঞা', 'অজ্ঞ'] },
  { id: 'conj_17', conjunct: 'ঞ্চ', breakdown: 'ঞ্ + চ', words: ['অঞ্চল', 'সঞ্চয়', 'বঞ্চিত', 'পঞ্চম'] },
  { id: 'conj_18', conjunct: 'ঞ্জ', breakdown: 'ঞ্ + জ', words: ['গঞ্জ', 'অঞ্জলি', 'নিরঞ্জন', 'রঞ্জিত'] },
  { id: 'conj_19', conjunct: 'ট্ট', breakdown: 'ট্ + ট', words: ['চট্টগ্রাম', 'ভট্টাচার্য', 'পট্টি', 'অট্টালিকা'] },
  { id: 'conj_20', conjunct: 'ড্ড', breakdown: 'ড্ + ড', words: ['আড্ডা', 'গাড্ডা', 'ড্ডাক', 'উড্ডীন'] },
  { id: 'conj_21', conjunct: 'ণ্ড', breakdown: 'ণ্ + ড', words: ['কাণ্ড', 'ভণ্ড', 'পাণ্ডিত্য', 'গণ্ডার'] },
  { id: 'conj_22', conjunct: 'ত্ত', breakdown: 'ত্ + ত', words: ['উত্তর', 'চিত্ত', 'সত্য', 'বিত্ত'] },
  { id: 'conj_23', conjunct: 'ত্থ', breakdown: 'ত্ + থ', words: ['উত্থান', 'উত্থিত', 'যথার্থ', 'প্রতিষ্ঠিত'] },
  { id: 'conj_24', conjunct: 'ত্র', breakdown: 'ত্ + র', words: ['ত্রিভুজ', 'ত্রাণ', 'ত্রুটি', 'ত্রিশূল'] },
  { id: 'conj_25', conjunct: 'দ্ধ', breakdown: 'দ্ + ধ', words: ['বদ্ধ', 'সিদ্ধ', 'রুদ্ধ', 'সমৃদ্ধ'] },
  { id: 'conj_26', conjunct: 'দ্ব', breakdown: 'দ্ + ব', words: ['দ্বীপ', 'দ্বার', 'দ্বন্দ্ব', 'দ্বিগুণ'] },
  { id: 'conj_27', conjunct: 'দ্র', breakdown: 'দ্ + র', words: ['দ্রব্য', 'দ্রবণ', 'দ্রষ্টা', 'দ্রুত'] },
  { id: 'conj_28', conjunct: 'ধ্র', breakdown: 'ধ্ + র', words: ['ধ্রুব', 'ধ্রুপদ', 'ধ্রুবতারা', 'অধ্রুব'] },
  { id: 'conj_29', conjunct: 'ন্দ', breakdown: 'ন্ + দ', words: ['চন্দ্র', 'आनন্দ', 'বন্ধ', 'নন্দন'] },
  { id: 'conj_30', conjunct: 'ন্ধ', breakdown: 'ন্ + ধ', words: ['অন্ধ', 'গন্ধ', 'সন্ধ্যা', 'বন্ধন'] },
  { id: 'conj_31', conjunct: 'ন্ন', breakdown: 'ন্ + ন', words: ['অন্ন', 'ধন্য', 'প্রসন্ন', 'সন্ন্যাস'] },
  { id: 'conj_32', conjunct: 'প্ত', breakdown: 'প্ + ত', words: ['প্রাপ্ত', 'লিপ্ত', 'তপ্ত', 'সুপ্ত'] },
  { id: 'conj_33', conjunct: 'প্ন', breakdown: 'প্ + ন', words: ['স্বপ্ন', 'বিপ্ন', 'সুপ্ন', 'স্বপ্নময়'] },
  { id: 'conj_34', conjunct: 'ম্প', breakdown: 'ম্ + প', words: ['সম্পদ', 'কম্পন', 'চম্পা', 'সম্পূর্ণ'] },
  { id: 'conj_35', conjunct: 'ম্ভ', breakdown: 'ম্ +  ভ', words: ['সম্ভব', 'সম্ভার', 'সম্ভাবনা', 'সম্ভ্রম'] },
  { id: 'conj_36', conjunct: 'ল্ক', breakdown: 'ল্ + ক', words: ['শুল্ক', 'বল্কল', 'কল্কি', 'অলঙ্কার'] },
  { id: 'conj_37', conjunct: 'ষ্ট', breakdown: 'ষ্ + ট', words: ['কষ্ট', 'দুষ্ট', 'পুষ্ট', 'স্পষ্ট'] },
  { id: 'conj_38', conjunct: 'ষ্ঠ', breakdown: 'ষ্ + ঠ', words: ['শ্রেষ্ঠ', 'কনিষ্ঠ', 'জ্যেষ্ঠ', 'নিষ্ঠা'] },
  { id: 'conj_39', conjunct: 'স্ত', breakdown: 'স্ + ত', words: ['রাস্তা', 'অস্ত্র', 'ব্যস্ত', 'উপস্থিত'] },
  { id: 'conj_40', conjunct: 'স্থ', breakdown: 'স্ + থ', words: ['স্থান', 'প্রতিষ্ঠানের', 'স্বাস্থ্য', 'অবস্থা'] }, // Let's correct "প্রতিষ্ঠানের" to "প্রতিষ্ঠা" or "প্রতিষ্ঠান"
  { id: 'conj_41', conjunct: 'স্ম', breakdown: 'স্ + ম', words: ['স্মৃতি', 'স্মরণ', 'স্মারক', 'স্মিত'] },
  { id: 'conj_42', conjunct: 'হ্ন', breakdown: 'হ্ + ন', words: ['অপরাহ্ন', 'পূর্বাহ্ন', 'মধ্যাহ্ন', 'আহ্নিক'] },
  { id: 'conj_43', conjunct: 'হ্ম', breakdown: 'হ্ + ম', words: ['ব্রাহ্মণ', 'ব্রাহ্মী', 'ব্রাহ্মণ্য', 'ব্রাহ্মণত্ব'] },
  { id: 'conj_44', conjunct: 'হ্য', breakdown: 'হ্ + য', words: ['বাহ্য', 'বাহ্যিক', 'দাহ্য', 'গ্রাহ্য'] }
];

export const BENGALI_KAR_SENTENCES_DATA: KarSentencesGroup[] = [
  {
    id: 'sent_kar_a',
    kar: 'া',
    name: 'আ-কার (া)',
    color: 'from-rose-500 via-pink-500 to-red-600',
    sentences: [
      { sentence: 'মামা কাকা দাদার সাথে বাজারে যায়।', emoji: '🍉' },
      { sentence: 'বাবা খাতা আনে।', emoji: '📝' },
      { sentence: 'দাদা জামা ধোয়।', emoji: '👕' },
      { sentence: 'কাকা বাগানে আম আনে।', emoji: '🥭' },
      { sentence: 'মা খাতা সাজায়।', emoji: '📚' },
      { sentence: 'বাবা দাদাকে টাকা দেয়।', emoji: '💵' },
      { sentence: 'কাকা চাকা লাগায়।', emoji: '🚗' },
      { sentence: 'সারা রাত তারা জ্বলে।', emoji: '⭐' },
      { sentence: 'নানার বাড়ি পাকা রাস্তার পাশে।', emoji: '🏠' },
      { sentence: 'রাজা হাতি চড়ে যায়।', emoji: '🐘' }
    ]
  },
  {
    id: 'sent_kar_i',
    kar: 'ি',
    name: 'ই-কার (ি)',
    color: 'from-amber-500 via-orange-500 to-yellow-600',
    sentences: [
      { sentence: 'দিদি চিনি কিনি।', emoji: '🍬' },
      { sentence: 'দিদি ছবি লিখি না, আঁকি।', emoji: '🎨' },
      { sentence: 'মিনি তিল কিনি।', emoji: '🌱' },
      { sentence: 'শিশির ভিজে মাটি পিছলি।', emoji: '🌧️' },
      { sentence: 'রিনি চিঠি লিখি।', emoji: '✉️' },
      { sentence: 'দিদি ঝিলমিল দুলি কিনি।', emoji: '💍' },
      { sentence: 'বিলি চিনি মিশি খাই।', emoji: '🥣' },
      { sentence: 'রিমি তিল ভাজি দিই।', emoji: '🍳' },
      { sentence: 'দিদি গিনি পাখি দেখি।', emoji: '🦜' },
      { sentence: 'মিঠি দিদি চিনি দিই।', emoji: '🍯' }
    ]
  },
  {
    id: 'sent_kar_ii',
    kar: 'ী',
    name: 'ঈ-কার (ী)',
    color: 'from-yellow-500 via-lime-500 to-green-600',
    sentences: [
      { sentence: 'নীল শাড়ি দিদি নিল।', emoji: '👗' },
      { sentence: 'সীতা বীণা বাজায়।', emoji: '🎵' },
      { sentence: 'ধীর ছেলে নীরবে বসে।', emoji: '🧘' },
      { sentence: 'গীত শুনে রীতা হাসে।', emoji: '😊' },
      { sentence: 'শ্রীমতী নীলা চিঠি লিখেন।', emoji: '✉️' },
      { sentence: 'নীল পাখি ডালে বসে।', emoji: '🐦' },
      { sentence: 'রীনা নীল ফিতা বাঁধে।', emoji: '🎀' },
      { sentence: 'দীন মানুষ দান পায়।', emoji: '🤝' },
      { sentence: 'বীথি নীল ফুল দেখে।', emoji: '🪻' },
      { sentence: 'নীতি মেনে চলা ভালো।', emoji: '⚖' }
    ]
  },
  {
    id: 'sent_kar_u',
    kar: 'ু',
    name: 'উ-কার (ু)',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    sentences: [
      { sentence: 'পুতুল কুকুর ছুঁয়ে দিল।', emoji: '🐕' },
      { sentence: 'কুল গাছে কুল ঝুলে।', emoji: '🌳' },
      { sentence: 'সুর তুলে বুলবুলি গায়।', emoji: '🎶' },
      { sentence: 'পুতুল দুল পরে।', emoji: '🧸' },
      { sentence: 'মুকুল ফুল তুলে।', emoji: '🌸' },
      { sentence: 'কুমির নদীতে ডুবে যায়।', emoji: '🐊' },
      { sentence: 'بوبু পুতুল ধুয়ে দেয়।', emoji: '🧼' }, // Standardize to Bengali "বুবু":
      { sentence: 'কুটির ঘরে বুধু থাকে।', emoji: '🏡' },
      { sentence: 'চুল বেঁধে বুবু স্কুলে যায়।', emoji: '🎒' },
      { sentence: 'সুমু কুল খায়।', emoji: '😋' }
    ]
  },
  {
    id: 'sent_kar_uu',
    kar: 'ূ',
    name: 'ঊ-কার (ূ)',
    color: 'from-cyan-500 via-sky-500 to-blue-600',
    sentences: [
      { sentence: 'পূজা ফুল তুলে।', emoji: '🪷' },
      { sentence: 'দূর মাঠে সূর্য ওঠে।', emoji: '🌅' },
      { sentence: 'শূন্য ঘরে ভূত নেই।', emoji: '👻' },
      { sentence: 'মূর্তি দেখে বুবু হাসে।', emoji: '🗿' },
      { sentence: 'পূর্ণ চাঁদ খুব সুন্দর।', emoji: '🌕' },
      { sentence: 'নূর দূরে থাকে।', emoji: '🏡' },
      { sentence: 'সূচ দিয়ে কাপড় সেলাই হয়।', emoji: '🪡' },
      { sentence: 'ভূষণ ফুল পছন্দ করে।', emoji: '💐' },
      { sentence: 'চূড়ায় পাখি বসে।', emoji: '⛰️' },
      { sentence: 'ধূম উঠছে দূরে।', emoji: '🌫️' }
    ]
  },
  {
    id: 'sent_kar_e',
    kar: 'ে',
    name: 'এ-কার (ে)',
    color: 'from-blue-500 via-indigo-500 to-violet-600',
    sentences: [
      { sentence: 'মেঘ দেখে ছেলে হেসে ওঠে।', emoji: '🌧️' },
      { sentence: 'বেলা শেষে মেলা ভেঙে যায়।', emoji: '🎪' },
      { sentence: 'রেল বেয়ে ছেলে দেশে যায়।', emoji: '🚂' },
      { sentence: 'বেল পেকে গেছে।', emoji: '🍈' },
      { sentence: 'মেঘ নেমে এলে বৃষ্টি হয়।', emoji: '🌦️' },
      { sentence: 'কেক কেটে মেয়ে খায়।', emoji: '🍰' },
      { sentence: 'ছেলে খেলে বেড়ে ওঠে।', emoji: '⚽' },
      { sentence: 'মেয়ে লেখে, ছেলে দেখে।', emoji: '📝' },
      { sentence: 'দেবে নেবে করে মেলা বসে।', emoji: '🤝' },
      { sentence: 'বেচে খেয়ে সে বেঁচে আছে।', emoji: '🧺' }
    ]
  },
  {
    id: 'sent_kar_oi',
    kar: 'ৈ',
    name: 'ঐ-কার (ৈ)',
    color: 'from-indigo-500 via-purple-500 to-fuchsia-600',
    sentences: [
      { sentence: 'সৈনিক দৈনিক খবর পড়ে।', emoji: '📰' },
      { sentence: 'কৈশোর বয়সে খেলাধুলা ভালো।', emoji: '🏃' },
      { sentence: 'বৈশাখ এলে মেলা বসে।', emoji: '🥁' },
      { sentence: 'নৈপুণ্যে তৈরি খেলনা সুন্দর।', emoji: '🧸' },
      { sentence: 'বৈদ্য ওষুধ দেন।', emoji: '🩺' },
      { sentence: 'ঐক্যে শক্তি বাড়ে।', emoji: '✊' },
      { sentence: 'তৈল মেখে চুল আঁচড়াও।', emoji: '🧴' },
      { sentence: 'দৈন্য দূর করতে শিক্ষা দরকার।', emoji: '🎓' },
      { sentence: 'বৈঠকে সবাই বসে।', emoji: '👥' },
      { sentence: 'সৈনিক দেশ রক্ষা করে।', emoji: '🪖' }
    ]
  },
  {
    id: 'sent_kar_o',
    kar: 'ো',
    name: 'ও-কার (ো)',
    color: 'from-fuchsia-500 via-pink-500 to-rose-600',
    sentences: [
      { sentence: 'খোকা মোজা পরে।', emoji: '🧦' },
      { sentence: 'গোল টেবিলে বোতল রাখা।', emoji: '🍾' },
      { sentence: 'রোদ পোহাতে লোকে বসে।', emoji: '☀️' },
      { sentence: 'সোনা খোকা দোল খায়।', emoji: '👶' },
      { sentence: 'দোকানে লোক কম।', emoji: '🏪' },
      { sentence: 'মোহন রোদে দৌড়ায়।', emoji: '🏃' },
      { sentence: 'বোকা ছেলে কথা শোনে না।', emoji: '🤫' },
      { sentence: 'গোল বল গড়িয়ে যায়।', emoji: '⚽' },
      { sentence: 'খোকা বোতল খুলে।', emoji: '🍼' },
      { sentence: 'লোভ ভালো নয়।', emoji: '❌' }
    ]
  },
  {
    id: 'sent_kar_ou',
    kar: 'ৌ',
    name: 'ঔ-কার (ৌ)',
    color: 'from-rose-500 via-purple-500 to-blue-600',
    sentences: [
      { sentence: 'মৌমাছি ফুলে বসে।', emoji: '🐝' },
      { sentence: 'নৌকা নদীতে ভাসে।', emoji: '⛵' },
      { sentence: 'বৌ রান্না করে।', emoji: '🍳' },
      { sentence: 'সৌরভ ফুল ভালোবাসে।', emoji: '🌹' },
      { sentence: 'গৌরব পড়াশোনা করে।', emoji: '📚' },
      { sentence: 'কৌতুক শুনে সবাই হাসে।', emoji: '😂' },
      { sentence: 'মৌসুমি ফল মিষ্টি।', emoji: '🥭' },
      { sentence: 'কৌটা খুলে মিষ্টি নাও।', emoji: '🍯' },
      { sentence: 'দৌড় প্রতিযোগিতায় রৌনক জিতল।', emoji: '🏆' },
      { sentence: 'পৌষ মাসে শীত পড়ে।', emoji: '❄️' }
    ]
  }
];

export const BENGALI_PROGRESSIVE_SENTENCES: BanglaProgressiveGroup[] = [
  {
    id: 'prog_group_1',
    title: 'ধাপ–১ : খুব সহজ ও ছোট বাক্য',
    rangeText: '১–২০',
    color: 'from-pink-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    sentences: [
      { id: 'p_1', number: 1, sentence: 'মা আসো।' },
      { id: 'p_2', number: 2, sentence: 'বাবা যাও।' },
      { id: 'p_3', number: 3, sentence: 'আমি যাই।' },
      { id: 'p_4', number: 4, sentence: 'তুমি এসো।' },
      { id: 'p_5', number: 5, sentence: 'সে হাসে।' },
      { id: 'p_6', number: 6, sentence: 'পাখি উড়ে।' },
      { id: 'p_7', number: 7, sentence: 'মাছ সাঁতরে।' },
      { id: 'p_8', number: 8, sentence: 'গরু ঘাস খায়।' },
      { id: 'p_9', number: 9, sentence: 'ফুল ফোটে।' },
      { id: 'p_10', number: 10, sentence: 'বৃষ্টি পড়ে।' },
      { id: 'p_11', number: 11, sentence: 'সূর্য ওঠে।' },
      { id: 'p_12', number: 12, sentence: 'চাঁদ জ্বলে।' },
      { id: 'p_13', number: 13, sentence: 'শিশুরা খেলে।' },
      { id: 'p_14', number: 14, sentence: 'দাদা পড়ে।' },
      { id: 'p_15', number: 15, sentence: 'দিদি লেখে।' },
      { id: 'p_16', number: 16, sentence: 'মা রান্না করেন।' },
      { id: 'p_17', number: 17, sentence: 'বাবা বাজারে যান।' },
      { id: 'p_18', number: 18, sentence: 'আমি পানি খাই।' },
      { id: 'p_19', number: 19, sentence: 'তুমি গান গাও।' },
      { id: 'p_20', number: 20, sentence: 'সে ছবি আঁকে।' }
    ]
  },
  {
    id: 'prog_group_2',
    title: 'ধাপ–২ : সহজ বাক্য',
    rangeText: '২১–৪০',
    color: 'from-amber-500 via-orange-500 to-yellow-600',
    borderColor: 'hover:border-orange-500/30 shadow-orange-950/20 text-orange-400',
    sentences: [
      { id: 'p_21', number: 21, sentence: 'আমি আজ স্কুলে যাব।' },
      { id: 'p_22', number: 22, sentence: 'রিমা প্রতিদিন বই পড়ে।' },
      { id: 'p_23', number: 23, sentence: 'আমার একটি লাল বল আছে।' },
      { id: 'p_24', number: 24, sentence: 'আমরা বিকেলে মাঠে খেলি।' },
      { id: 'p_25', number: 25, sentence: 'পাখিরা গাছে বসে গান গায়।' },
      { id: 'p_26', number: 26, sentence: 'মা আমাকে গল্প শোনান।' },
      { id: 'p_27', number: 27, sentence: 'বাবা অফিস থেকে ফিরেছেন।' },
      { id: 'p_28', number: 28, sentence: 'ছোট ভাই খেলনা নিয়ে খেলছে।' },
      { id: 'p_29', number: 29, sentence: 'দাদু বারান্দায় বসে আছেন।' },
      { id: 'p_30', number: 30, sentence: 'দিদি সুন্দর ছবি আঁকছে।' },
      { id: 'p_31', number: 31, sentence: 'আজ আকাশে অনেক মেঘ আছে।' },
      { id: 'p_32', number: 32, sentence: 'নদীর পানি খুব পরিষ্কার।' },
      { id: 'p_33', number: 33, sentence: 'বাগানে নানা রঙের ফুল ফুটেছে।' },
      { id: 'p_34', number: 34, sentence: 'শিশুরা আনন্দ করে নাচছে।' },
      { id: 'p_35', number: 35, sentence: 'কুকুরটি জোরে জোরে ডাকছে।' },
      { id: 'p_36', number: 36, sentence: 'বিড়ালটি চুপচাপ ঘুমাচ্ছে।' },
      { id: 'p_37', number: 37, sentence: 'আমি সকালে তাড়াতাড়ি উঠি।' },
      { id: 'p_38', number: 38, sentence: 'তুমি কি আজ স্কুলে যাবে?' },
      { id: 'p_39', number: 39, sentence: 'সে কেন এখানে এসেছে?' },
      { id: 'p_40', number: 40, sentence: 'তোমার প্রিয় ফল কোনটি?' }
    ]
  },
  {
    id: 'prog_group_3',
    title: 'ধাপ–৩ : প্রশ্ন, অনুরোধ ও আদেশসূচক বাক্য',
    rangeText: '৪১–৫০',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    borderColor: 'hover:border-emerald-500/30 shadow-emerald-950/20 text-emerald-400',
    sentences: [
      { id: 'p_41', number: 41, sentence: 'তুমি কি আমাকে সাহায্য করবে?' },
      { id: 'p_42', number: 42, sentence: 'দয়া করে দরজাটি বন্ধ করো।' },
      { id: 'p_43', number: 43, sentence: 'এখনই হাত ধুয়ে খাবার খাও।' },
      { id: 'p_44', number: 44, sentence: 'কেউ যেন এখানে ময়লা না ফেলে।' },
      { id: 'p_45', number: 45, sentence: 'মনোযোগ দিয়ে শিক্ষকের কথা শোনো।' },
      { id: 'p_46', number: 46, sentence: 'তুমি কখন বাড়ি ফিরবে?' },
      { id: 'p_47', number: 47, sentence: 'আজ তোমরা কোথায় বেড়াতে যাবে?' },
      { id: 'p_48', number: 48, sentence: 'আমাকে এক গ্লাস ঠান্ডা পানি দাও।' },
      { id: 'p_49', number: 49, sentence: 'আহা, ফুলগুলো কত সুন্দর!' },
      { id: 'p_50', number: 50, sentence: 'বাহ, তুমি তো খুব ভালো আঁকতে পারো!' }
    ]
  },
  {
    id: 'prog_group_4',
    title: 'ধাপ–৪ : সহজ ও মাঝারি দৈর্ঘ্যের বাক্য',
    rangeText: '৫১–১০০',
    color: 'from-cyan-500 via-sky-500 to-blue-600',
    borderColor: 'hover:border-blue-500/30 shadow-blue-950/20 text-blue-400',
    sentences: [
      { id: 'p_51', number: 51, sentence: 'আমি প্রতিদিন সকালে ব্যায়াম করি।' },
      { id: 'p_52', number: 52, sentence: 'রাহাত খুব মনোযোগ দিয়ে পড়াশোনা করে।' },
      { id: 'p_53', number: 53, sentence: 'আমার ছোট বোনটি গান শিখছে।' },
      { id: 'p_54', number: 54, sentence: 'আমরা ছুটির দিনে বেড়াতে যাই।' },
      { id: 'p_55', number: 55, sentence: 'আজ স্কুলে নতুন শিক্ষক এসেছেন।' },
      { id: 'p_56', number: 56, sentence: 'দাদু প্রতিদিন সকালে পত্রিকা পড়েন।' },
      { id: 'p_57', number: 57, sentence: 'মা বাজার থেকে তাজা মাছ কিনেছেন।' },
      { id: 'p_58', number: 58, sentence: 'তুমি কি আজ আমার বাড়িতে আসবে?' },
      { id: 'p_59', number: 59, sentence: 'বৃষ্টি থেমে গেলে আমরা বাইরে যাব।' },
      { id: 'p_60', number: 60, sentence: 'শিশুরা মাঠে ফুটবল খেলছে।' },
      { id: 'p_61', number: 61, sentence: 'আমার বন্ধু খুব সুন্দর ছবি আঁকে।' },
      { id: 'p_62', number: 62, sentence: 'কৃষক জমিতে ধান রোপণ করছেন।' },
      { id: 'p_63', number: 63, sentence: 'শীতকালে আমরা গরম কাপড় পরি।' },
      { id: 'p_64', number: 64, sentence: 'পাখিরা বাসা বেঁধে বাচ্চা লালন করে।' },
      { id: 'p_65', number: 65, sentence: 'দয়া করে বইগুলো আলমারিতে রেখে দাও।' },
      { id: 'p_66', number: 66, sentence: 'তোমরা কেউ ক্লাসে দেরি করে আসবে না।' },
      { id: 'p_67', number: 67, sentence: 'সে পরীক্ষায় ভালো ফল করেছে।' },
      { id: 'p_68', number: 68, sentence: 'নদীর তীরে অনেক মানুষ বেড়াতে এসেছে।' },
      { id: 'p_69', number: 69, sentence: 'মেয়েটি হাসিমুখে অতিথিদের স্বাগত জানাল।' },
      { id: 'p_70', number: 70, sentence: 'আজকের আবহাওয়া বেশ মনোরম।' },
      { id: 'p_71', number: 71, sentence: 'আমরা সবাই মিলে গাছ লাগিয়েছি।' },
      { id: 'p_72', number: 72, sentence: 'বাবা অফিসে যাওয়ার আগে নাস্তা খান।' },
      { id: 'p_73', number: 73, sentence: 'ছেলেটি মন খারাপ করে একা বসে ছিল।' },
      { id: 'p_74', number: 74, sentence: 'শিক্ষক আমাদের সততার গুরুত্ব বোঝালেন।' },
      { id: 'p_75', number: 75, sentence: 'কুকুরটি মালিককে দেখে লেজ নাড়তে লাগল।' },
      { id: 'p_76', number: 76, sentence: 'তুমি কেন আজ এত চুপচাপ আছো?' },
      { id: 'p_77', number: 77, sentence: 'সে কখন ঢাকা থেকে ফিরবে?' },
      { id: 'p_78', number: 78, sentence: 'তোমার প্রিয় লেখক কে?' },
      { id: 'p_79', number: 79, sentence: 'সবai যেন নিজের কাজ নিজে করে।' },
      { id: 'p_80', number: 80, sentence: 'দয়া করে জানালাগুলো খুলে দাও।' },
      { id: 'p_81', number: 81, sentence: 'বই পড়া মানুষের জ্ঞান বাড়ায়।' },
      { id: 'p_82', number: 82, sentence: 'নিয়মিত ব্যায়াম শরীর সুস্থ রাখে।' },
      { id: 'p_83', number: 83, sentence: 'সময় নষ্ট করা উচিত নয়।' },
      { id: 'p_84', number: 84, sentence: 'আমরা দেশের উন্নতির জন্য কাজ করব।' },
      { id: 'p_85', number: 85, sentence: 'ছেলেমেয়েদের সত্য কথা বলা উচিত।' },
      { id: 'p_86', number: 86, sentence: 'ছোটদের স্নেহ করতে হয়।' },
      { id: 'p_87', number: 87, sentence: 'বড়দের সম্মান করা আমাদের कर्तव्य।' },
      { id: 'p_88', number: 88, sentence: 'মিথ্যা কথা বললে কেউ বিশ্বাস করে না।' },
      { id: 'p_89', number: 89, sentence: 'সবাই মিলে কাজ করলে কঠিন কাজও সহজ হয়।' },
      { id: 'p_90', number: 90, sentence: 'পরিশ্রম ছাড়া জীবনে সফল হওয়া যায় না।' },
      { id: 'p_91', number: 91, sentence: 'গরিব মানুষও সৎভাবে জীবনযাপন করতে পারে।' },
      { id: 'p_92', number: 92, sentence: 'শিক্ষাই মানুষের প্রকৃত সম্পদ।' },
      { id: 'p_93', number: 93, sentence: 'বন্ধুত্ব মানুষের জীবনে আনন্দ এনে দেয়।' },
      { id: 'p_94', number: 94, sentence: 'প্রকৃতি আমাদের অনেক কিছু শেখায়।' },
      { id: 'p_95', number: 95, sentence: 'আজকের কাজ আজই শেষ করা ভালো।' },
      { id: 'p_96', number: 96, sentence: 'আমি প্রতিদিন অন্তত এক ঘণ্টা বই পড়ি।' },
      { id: 'p_97', number: 97, sentence: 'তুমি যদি চাও, আমি তোমাকে সাহায্য করতে পারি।' },
      { id: 'p_98', number: 98, sentence: 'আমরা একে অপরের প্রতি সদয় আচরণ করব।' },
      { id: 'p_99', number: 99, sentence: 'শিশুরা নতুন পোশাক পরে আনন্দ করছে।' },
      { id: 'p_100', number: 100, sentence: 'বাগানের গোলাপ ফুলগুলো খুব সুন্দরভাবে ফুটেছে।' }
    ]
  },
  {
    id: 'prog_group_5',
    title: 'ধাপ–৫ : যৌগিক ও জটিল বাক্য',
    rangeText: '১০১–১৫০',
    color: 'from-indigo-500 via-purple-500 to-violet-600',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    sentences: [
      { id: 'p_101', number: 101, sentence: 'আমি স্কুলে গিয়েছিলাম, কিন্তু আমার বন্ধু অসুস্থ থাকায় আসতে পারেনি।' },
      { id: 'p_102', number: 102, sentence: 'যদিও আকাশে মেঘ ছিল, তবুও আমরা খেলতে গিয়েছিলাম।' },
      { id: 'p_103', number: 103, sentence: 'সে খুব মেধাবী, তাই সবাই তাকে পছন্দ করে।' },
      { id: 'p_104', number: 104, sentence: 'তুমি মনোযোগ দিয়ে পড়লে অবশ্যই ভালো ফল করবে।' },
      { id: 'p_105', number: 105, sentence: 'মা রান্না করছিলেন আর বাবা টেলিভিশন দেখছিলেন।' },
      { id: 'p_106', number: 106, sentence: 'আমরা যখন বাড়িতে পৌঁছালাম, তখন বৃষ্টি শুরু হলো।' },
      { id: 'p_107', number: 107, sentence: 'শিক্ষক যা বললেন, আমরা তা মনোযোগ দিয়ে শুনলাম।' },
      { id: 'p_108', number: 108, sentence: 'যে ছেলে প্রতিদিন পড়াশোনা করে, সে পরীক্ষায় ভালো ফল পায়।' },
      { id: 'p_109', number: 109, sentence: 'আমি জানি যে তুমি সত্য কথা বলছ।' },
      { id: 'p_110', number: 110, sentence: 'যেহেতু সে অসুস্থ ছিল, সেহেতু সে স্কুলে যায়নি।' },
      { id: 'p_111', number: 111, sentence: 'তুমি যদি নিয়মিত অনুশীলন করো, তাহলে দক্ষ হয়ে উঠবে।' },
      { id: 'p_112', number: 112, sentence: 'যে গাছে ফল বেশি হয়, সেই গাছের ডাল নিচু হয়ে থাকে।' },
      { id: 'p_113', number: 113, sentence: 'মানুষ যত বেশি জ্ঞান অর্জন করে, তত বেশি বিনয়ী হয়।' },
      { id: 'p_114', number: 114, sentence: 'আমরা যখন নদীর পাড়ে গেলাম, তখন সূর্য অস্ত যাচ্ছিল।' },
      { id: 'p_115', number: 115, sentence: 'বাবা আমাকে বললেন যে সময়ের মূল্য বুঝতে হবে।' },
      { id: 'p_116', number: 116, sentence: 'সে এমনভাবে কথা বলে যেন সবকিছু সে জানে।' },
      { id: 'p_117', number: 117, sentence: 'আমি অপেক্ষা করছিলাম, কিন্তু সে আর আসেনি।' },
      { id: 'p_118', number: 118, sentence: 'যদিও পথটি দীর্ঘ ছিল, তবুও আমরা ক্লান্ত হইনি।' },
      { id: 'p_119', number: 119, sentence: 'যিনি পরিশ্রম করেন, তিনিই সফল হন।' },
      { id: 'p_120', number: 120, sentence: 'শিশুরা আনন্দে গান গাইছিল এবং নাচছিল।' },
      { id: 'p_121', number: 121, sentence: 'আমরা বই পড়ি যাতে নতুন বিষয় জানতে পারি।' },
      { id: 'p_122', number: 122, sentence: 'তুমি যা করবে, তার ফল একদিন অবশ্যই পাবে।' },
      { id: 'p_123', number: 123, sentence: 'শিক্ষক ক্লাসে প্রবেশ করতেই সবাই দাঁড়িয়ে গেল।' },
      { id: 'p_124', number: 124, sentence: 'সে দরজা খুলে বাইরে তাকাল, কিন্তু কাউকে দেখতে পেল না।' },
      { id: 'p_125', number: 125, sentence: 'বৃষ্টি এত জোরে হচ্ছিল যে রাস্তা পানিতে ভরে গিয়েছিল।' },
      { id: 'p_126', number: 126, sentence: 'আমি যখন ছোট ছিলাম, তখন গ্রামে থাকতাম।' },
      { id: 'p_127', number: 127, sentence: 'তুমি যদি আমাকে আগে বলতে, তাহলে আমি সাহায্য করতে পারতাম।' },
      { id: 'p_128', number: 128, sentence: 'সে পড়াশোনার পাশাপাশি খেলাধুলাও করে।' },
      { id: 'p_129', number: 129, sentence: 'যে ব্যক্তি অন্যকে সাহায্য করে, মানুষ তাকে সম্মান করে।' },
      { id: 'p_130', number: 130, sentence: 'আমরা সবাই চাই যেন দেশ আরও উন্নত হয়।' },
      { id: 'p_131', number: 131, sentence: 'পাখিরা যখন গান গায়, তখন মন ভালো হয়ে যায়।' },
      { id: 'p_132', number: 132, sentence: 'তুমি যদি চেষ্টা করো, তাহলে অসম্ভবও সম্ভব হতে পারে।' },
      { id: 'p_133', number: 133, sentence: 'মানুষ জন্মগতভাবে কিছু জানে না, কিন্তু শেখার মাধ্যমে জ্ঞান অর্জন করে।' },
      { id: 'p_134', number: 134, sentence: 'বাবা অফিস থেকে ফিরে ক্লান্ত ছিলেন, তবুও তিনি আমাদের পড়ালেন।' },
      { id: 'p_135', number: 135, sentence: 'যে ছাত্র মনোযোগ দিয়ে পড়ে, সে কখনও ব্যর্থ হয় না।' },
      { id: 'p_136', number: 136, sentence: 'আমি এমন একটি বই খুঁজছি যা সহজ ভাষায় লেখা।' },
      { id: 'p_137', number: 137, sentence: 'আমরা যেখানে গিয়েছিলাম, সেখানে অনেক সুন্দর ফুল ছিল।' },
      { id: 'p_138', number: 138, sentence: 'শিক্ষক আমাদের বললেন যেন আমরা সময়মতো বিদ্যালয়ে যাই।' },
      { id: 'p_139', number: 139, sentence: 'সে এত দ্রুত দৌড়ায় যে কেউ তাকে ধরতে পারে না।' },
      { id: 'p_140', number: 140, sentence: 'তুমি যত বেশি অনুশীলন করবে, তত বেশি দক্ষ হবে।' },
      { id: 'p_141', number: 141, sentence: 'নদীর পানি বেড়ে যাওয়ায় অনেক জমি প্লাবিত হয়েছে।' },
      { id: 'p_142', number: 142, sentence: 'যে শিশুরা নিয়মিত বই পড়ে, তাদের ভাষাজ্ঞান উন্নত হয়।' },
      { id: 'p_143', number: 143, sentence: 'আমি চাই তুমি সবসময় সত্য কথা বলো।' },
      { id: 'p_144', number: 144, sentence: 'যদিও সে ধনী, তবুও সে খুব সাধারণ জীবনযাপন করে।' },
      { id: 'p_145', number: 145, sentence: 'আমরা সবাই মিলে কাজ করলে কাজটি দ্রুত শেষ হবে।' },
      { id: 'p_146', number: 146, sentence: 'মানুষ যদি প্রকৃতিকে রক্ষা না করে, তাহলে পরিবেশ বিপর্যয় ঘটবে।' },
      { id: 'p_147', number: 147, sentence: 'তুমি যখনই আমাকে ডাকবে, আমি সাহায্য করার চেষ্টা করব।' },
      { id: 'p_148', number: 148, sentence: 'আমি জানতাম না যে আজ বিদ্যালয় বন্ধ থাকবে।' },
      { id: 'p_149', number: 149, sentence: 'সূর্য ডুবে যাওয়ার আগে আমরা বাড়ি ফিরে এলাম।' },
      { id: 'p_150', number: 150, sentence: 'যারা নিয়ম মেনে চলে, তারা সমাজে সম্মানিত হয়।' }
    ]
  },
  {
    id: 'prog_group_6',
    title: 'ধাপ–৬ : দীর্ঘ, সাহিত্যধর্মী ও ভাবসম্প্রসারণমূলক বাক্য',
    rangeText: '১৫১–২০০',
    color: 'from-purple-500 via-fuchsia-500 to-pink-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    sentences: [
      { id: 'p_151', number: 151, sentence: 'সকালবেলায় শিশিরভেজা ঘাসের ওপর হাঁটলে মন সতেজ হয়ে ওঠে।' },
      { id: 'p_152', number: 152, sentence: 'গ্রামের মানুষ সাধারণত খুব আন্তরিক হয় এবং তারা অতিথিদের আন্তরিকভাবে আপ্যায়ন করে।' },
      { id: 'p_153', number: 153, sentence: 'বই মানুষের নীরব বন্ধু, কারণ বই কখনও মানুষকে ভুল পথে পরিচালিত করে না।' },
      { id: 'p_154', number: 154, sentence: 'যে ব্যক্তি নিজের ভুল স্বীকার করতে পারে, সে প্রকৃত অর্থে সাহসী মানুষ।' },
      { id: 'p_155', number: 155, sentence: 'সময় এমন একটি সম্পদ, যা একবার চলে গেলে আর কখনও ফিরে আসে না।' },
      { id: 'p_156', number: 156, sentence: 'আমরা যদি ছোটবেলা থেকেই ভালো অভ্যাস গড়ে তুলি, তাহলে ভবিষ্যৎ জীবন সুন্দর হবে।' },
      { id: 'p_157', number: 157, sentence: 'অনেক মানুষ অর্থের পেছনে ছুটে বেড়ায়, কিন্তু প্রকৃত সুখ অর্থ দিয়ে কেনা যায় না।' },
      { id: 'p_158', number: 158, sentence: 'শিক্ষার আলো মানুষের মন থেকে অজ্ঞতার অন্ধকার দূর করে।' },
      { id: 'p_159', number: 159, sentence: 'প্রকৃত বন্ধু সেই, যে বিপদের সময় পাশে দাঁড়ায়।' },
      { id: 'p_160', number: 160, sentence: 'একজন ভালো শিক্ষক শুধু পাঠ্যবই পড়ান না, বরং শিক্ষার্থীদের সৎ মানুষ হওয়ার পথও দেখান।' },
      { id: 'p_161', number: 161, sentence: 'নদীমাতৃক বাংলাদেশের প্রাকৃতিক সৌন্দর্য বিশ্বের বহু মানুষকে মুগ্ধ করে।' },
      { id: 'p_162', number: 162, sentence: 'মানুষ যত আধুনিক হচ্ছে, ততই প্রযুক্তির ওপর নির্ভরশীল হয়ে পড়ছে।' },
      { id: 'p_163', number: 163, sentence: 'যে সমাজে ন্যায়বিচার প্রতিষ্ঠিত হয়, সেই সমাজে শান্তি ও সমৃদ্ধি বিরাজ করে।' },
      { id: 'p_164', number: 164, sentence: 'ছোট একটি ভালো কাজও অনেক সময় মানুষের জীবনে বড় পরিবর্তন আনতে পারে।' },
      { id: 'p_165', number: 165, sentence: 'আমাদের উচিত এমনভাবে জীবনযাপন করা যাতে অন্যেরা আমাদের দেখে অনুপ্রাণিত হয়।' },
      { id: 'p_166', number: 166, sentence: 'পরীক্ষায় ভালো ফল করার জন্য শুধু মুখস্থ করলেই হয় না, বিষয়টি বুঝেও পড়তে হয়।' },
      { id: 'p_167', number: 167, sentence: 'যারা নিয়মিত সংবাদপত্র পড়ে, তারা দেশের বর্তমান অবস্থা সম্পর্কে সচেতন থাকে।' },
      { id: 'p_168', number: 168, sentence: 'পৃথিবীর প্রতিটি মানুষ স্বপ্ন দেখে, কিন্তু সবাই সেই স্বপ্ন পূরণ করার জন্য পরিশ্রম করে না।' },
      { id: 'p_169', number: 169, sentence: 'তুমি যদি নিজের প্রতি আস্থা রাখো, তাহলে অনেক কঠিন কাজও সম্পন্ন করতে পারবে।' },
      { id: 'p_170', number: 170, sentence: 'একজন সৎ মানুষের সবচেয়ে বড় সম্পদ হলো মানুষের বিশ্বাস ও ভালোবাসা।' },
      { id: 'p_171', number: 171, sentence: 'আমরা যখন ছোট ছিলাম, তখন বিকেলবেলা বন্ধুদের সঙ্গে মাঠে খেলতাম।' },
      { id: 'p_172', number: 172, sentence: 'গ্রামের মেঠোপথ, সবুজ ধানের ক্ষেত এবং পাখির ডাক মানুষের মনে প্রশান্তি এনে দেয়।' },
      { id: 'p_173', number: 173, sentence: 'পরিবেশ দূষণ প্রতিরোধ করার জন্য আমাদের সবাইকে সচেতন হতে হবে।' },
      { id: 'p_174', number: 174, sentence: 'যেকোনো সমস্যার সমাধান খুঁজে পাওয়ার আগে সমস্যাটি ভালোভাবে বোঝা প্রয়োজন।' },
      { id: 'p_175', number: 175, sentence: 'যারা অন্যের উপকার করে, তারা মানুষের হৃদয়ে দীর্ঘদিন বেঁচে থাকে।' },
      { id: 'p_176', number: 176, sentence: 'একটি গাছ কেটে ফেলতে কয়েক মিনিট সময় লাগে, কিন্তু সেই গাছ বড় হতে অনেক বছর লাগে।' },
      { id: 'p_177', number: 177, sentence: 'জীবনের প্রতিটি অভিজ্ঞতা মানুষকে নতুন কিছু শেখায়।' },
      { id: 'p_178', number: 178, sentence: 'কঠোর পরিশ্রম এবং দৃঢ় সংকল্প মানুষকে সাফল্যের শিখরে পৌঁছে দিতে পারে।' },
      { id: 'p_179', number: 179, sentence: 'পৃথিবীতে এমন অনেক মানুষ আছেন, যারা নিজের কষ্ট ভুলে অন্যের মুখে হাসি ফোটানোর চেষ্টা করেন।' },
      { id: 'p_180', number: 180, sentence: 'যে ব্যক্তি ধৈর্য ধরে কাজ করতে পারে, সে একদিন না একদিন অবশ্যই সফল হয়।' },
      { id: 'p_181', number: 181, sentence: 'শিক্ষার্থীদের শুধু পরীক্ষার জন্য নয়, বাস্তব জীবনের জন্যও জ্ঞান অর্জন করা উচিত।' },
      { id: 'p_182', number: 182, sentence: 'আমরা যদি আজ থেকেই পানি অপচয় বন্ধ করি, তাহলে ভবিষ্যৎ প্রজন্ম উপকৃত হবে।' },
      { id: 'p_183', number: 183, sentence: 'ভালো বই পড়ার অভ্যাস মানুষের চিন্তাশক্তি ও কল্পনাশক্তিকে সমৃদ্ধ করে।' },
      { id: 'p_184', number: 184, sentence: 'মানুষ ভুল করতেই পারে, কিন্তু একই ভুল বারবার করা বুদ্ধিমানের কাজ নয়।' },
      { id: 'p_185', number: 185, sentence: 'শিশুরা পরিবারের সদস্যদের কাছ থেকেই প্রথম সামাজিক শিক্ষা লাভ করে।' },
      { id: 'p_186', number: 186, sentence: 'যে জাতি শিক্ষাকে গুরুত্ব দেয়, সেই জাতি দ্রুত উন্নতির পথে এগিয়ে যায়।' },
      { id: 'p_187', number: 187, sentence: 'দেশের প্রতি ভালোবাসা শুধু কথায় নয়, কাজের মাধ্যমেও প্রকাশ করা উচিত।' },
      { id: 'p_188', number: 188, sentence: 'আমরা যদি নিয়মিত ব্যায়াম করি এবং স্বাস্থ্যকর খাবার খাই, তাহলে সুস্থ জীবনযাপন করতে পারব।' },
      { id: 'p_189', number: 189, sentence: 'একজন দক্ষ বক্তা এমনভাবে কথা বলেন যে শ্রোতারা আগ্রহ নিয়ে তার বক্তব্য শোনে।' },
      { id: 'p_190', number: 190, sentence: 'মানুষ যখন নিজের সীমাবদ্ধতা উপলব্ধি করে, তখন সে নতুন কিছু শেখার জন্য আগ্রহী হয়।' },
      { id: 'p_191', number: 191, sentence: 'বিজ্ঞান মানুষের জীবনকে সহজ করেছে, তবে এর অপব্যবহার মানবজাতির জন্য ক্ষতিকর হতে পারে।' },
      { id: 'p_192', number: 192, sentence: 'পৃথিবীতে শান্তি প্রতিষ্ঠা করতে হলে মানুষের মধ্যে পারস্পরিক শ্রদ্ধাবোধ গড়ে তুলতে হবে।' },
      { id: 'p_193', number: 193, sentence: 'একজন দায়িত্বশীল নাগরিক সবসময় আইন মেনে চলে এবং দেশের কল্যাণে কাজ করে।' },
      { id: 'p_194', number: 194, sentence: 'জীবনের সফল হতে চাইলে লক্ষ্য নির্ধারণ করে ধাপে ধাপে এগিয়ে যেতে হবে।' },
      { id: 'p_195', number: 195, sentence: 'আমরা যদি একে অপরের প্রতি সহানুভূতিশীল হই, তাহলে সমাজ আরও সুন্দর হয়ে উঠবে।' },
      { id: 'p_196', number: 196, sentence: 'যেকোনো সিদ্ধান্ত নেওয়ার আগে তার ভালো ও খারাপ দিক বিবেচনা করা প্রয়োজন।' },
      { id: 'p_197', number: 197, sentence: 'মানুষের চরিত্রই তার প্রকৃত পরিচয়, কারণ সম্পদ ও ক্ষমতা একদিন হারিয়ে যেতে পারে।' },
      { id: 'p_198', number: 198, sentence: 'যে ব্যক্তি জ্ঞান অর্জনের জন্য আজীবন চেষ্টা করে, সে কখনও প্রকৃত অর্থে দরিদ্র থাকে না।' },
      { id: 'p_199', number: 199, sentence: 'প্রতিটি নতুন সকাল মানুষের জীবনে নতুন সম্ভাবনা ও নতুন আশা নিয়ে আসে।' },
      { id: 'p_200', number: 200, sentence: 'আমরা সবাই যদি সততা, পরিশ্রম এবং মানবিক মূল্যবোধকে জীবনের অংশ হিসেবে গ্রহণ করি, তাহলে ব্যক্তি, সমাজ এবং দেশ সমানভাবে উপকৃত হবে।' }
    ]
  }
];

export const BENGALI_ANTONYMS: AntonymLevel[] = [
  {
    id: 'ant_l_1',
    level: 1,
    title: 'লেভেল ১',
    color: 'from-pink-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 'a1', word: 'ভালো', antonym: 'মন্দ' },
      { id: 'a2', word: 'সত্য', antonym: 'মিথ্যা' },
      { id: 'a3', word: 'আলো', antonym: 'অন্ধকার' },
      { id: 'a4', word: 'দিন', antonym: 'রাত' },
      { id: 'a5', word: 'সুখ', antonym: 'দুঃখ' },
      { id: 'a6', word: 'ধনী', antonym: 'গরিব' },
      { id: 'a7', word: 'বড়', antonym: 'ছোট' },
      { id: 'a8', word: 'লম্বা', antonym: 'খাটো' },
      { id: 'a9', word: 'মোটা', antonym: 'পাতলা' },
      { id: 'a10', word: 'উঁচু', antonym: 'নিচু' }
    ]
  },
  {
    id: 'ant_l_2',
    level: 2,
    title: 'লেভেল ২',
    color: 'from-amber-500 via-orange-500 to-yellow-600',
    borderColor: 'hover:border-orange-500/30 shadow-orange-950/20 text-orange-400',
    words: [
      { id: 'a11', word: 'গরম', antonym: 'ঠান্ডা' },
      { id: 'a12', word: 'নতুন', antonym: 'পুরাতন' },
      { id: 'a13', word: 'কঠিন', antonym: 'সহজ' },
      { id: 'a14', word: 'দূর', antonym: 'কাছ' },
      { id: 'a15', word: 'ভিতর', antonym: 'বাহির' },
      { id: 'a16', word: 'আগে', antonym: 'পরে' },
      { id: 'a17', word: 'উপর', antonym: 'নিচে' },
      { id: 'a18', word: 'ডান', antonym: 'বাম' },
      { id: 'a19', word: 'শুরু', antonym: 'শেষ' },
      { id: 'a20', word: 'জয়', antonym: 'পরাজয়' }
    ]
  },
  {
    id: 'ant_l_3',
    level: 3,
    title: 'লেভেল ৩',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    borderColor: 'hover:border-emerald-500/30 shadow-emerald-950/20 text-emerald-400',
    words: [
      { id: 'a21', word: 'জীবন', antonym: 'মৃত্যু' },
      { id: 'a22', word: 'জন্ম', antonym: 'মরণ' },
      { id: 'a23', word: 'বন্ধ', antonym: 'খোলা' },
      { id: 'a24', word: 'আসা', antonym: 'যাওয়া' },
      { id: 'a25', word: 'উঠা', antonym: 'নামা' },
      { id: 'a26', word: 'হাসি', antonym: 'কান্না' },
      { id: 'a27', word: 'ক্রয়', antonym: 'বিক্রয়' },
      { id: 'a28', word: 'লাভ', antonym: 'ক্ষতি' },
      { id: 'a29', word: 'বন্ধু', antonym: 'শত্রু' },
      { id: 'a30', word: 'শান্ত', antonym: 'অশান্ত' }
    ]
  },
  {
    id: 'ant_l_4',
    level: 4,
    title: 'লেভেল ৪',
    color: 'from-cyan-500 via-sky-500 to-blue-600',
    borderColor: 'hover:border-blue-500/30 shadow-blue-950/20 text-blue-400',
    words: [
      { id: 'a31', word: 'সোজা', antonym: 'বাঁকা' },
      { id: 'a32', word: 'সাদা', antonym: 'কালো' },
      { id: 'a33', word: 'মিষ্টি', antonym: 'তিক্ত' },
      { id: 'a34', word: 'নরম', antonym: 'শক্ত' },
      { id: 'a35', word: 'শুষ্ক', antonym: 'ভেজা' },
      { id: 'a36', word: 'পূর্ণ', antonym: 'শূন্য' },
      { id: 'a37', word: 'স্থির', antonym: 'অস্থির' },
      { id: 'a38', word: 'সক্রিয়', antonym: 'নিষ্ক্রিয়' },
      { id: 'a39', word: 'জাগ্রত', antonym: 'নিদ্রিত' },
      { id: 'a40', word: 'উপস্থিত', antonym: 'অনুপস্থিত' }
    ]
  },
  {
    id: 'ant_l_5',
    level: 5,
    title: 'লেভেল ৫',
    color: 'from-indigo-500 via-purple-500 to-violet-600',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    words: [
      { id: 'a41', word: 'সবল', antonym: 'দুর্বল' },
      { id: 'a42', word: 'দ্রুত', antonym: 'ধীর' },
      { id: 'a43', word: 'প্রাচীন', antonym: 'আধুনিক' },
      { id: 'a44', word: 'ভারি', antonym: 'হালকা' },
      { id: 'a45', word: 'তরুণ', antonym: 'বৃদ্ধ' },
      { id: 'a46', word: 'জ্ঞানী', antonym: 'মূর্খ' },
      { id: 'a47', word: 'বুদ্ধিমান', antonym: 'বোকা' },
      { id: 'a48', word: 'শিক্ষিত', antonym: 'অশিক্ষিত' },
      { id: 'a49', word: 'ন্যায়', antonym: 'অন্যায়' },
      { id: 'a50', word: 'সৎ', antonym: 'অসৎ' }
    ]
  },
  {
    id: 'ant_l_6',
    level: 6,
    title: 'লেভেল ৬',
    color: 'from-purple-500 via-fuchsia-500 to-pink-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 'a51', word: 'পবিত্র', antonym: 'অপবিত্র' },
      { id: 'a52', word: 'উন্নতি', antonym: 'অবনতি' },
      { id: 'a53', word: 'উন্নত', antonym: 'অনুন্নত' },
      { id: 'a54', word: 'ধীর', antonym: 'চঞ্চল' },
      { id: 'a55', word: 'শক্তিশালী', antonym: 'দুর্বল' },
      { id: 'a56', word: 'ভীরু', antonym: 'সাহসী' },
      { id: 'a57', word: 'উদার', antonym: 'কৃপণ' },
      { id: 'a58', word: 'বিনয়ী', antonym: 'অহংকারী' },
      { id: 'a59', word: 'নম্র', antonym: 'গর্বিত' },
      { id: 'a60', word: 'আশা', antonym: 'নিরাশা' }
    ]
  },
  {
    id: 'ant_l_7',
    level: 7,
    title: 'লেভেল ৭',
    color: 'from-fuchsia-500 via-rose-500 to-orange-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 'a61', word: 'আশাবাদী', antonym: 'নিরাশাবাদী' },
      { id: 'a62', word: 'আনন্দ', antonym: 'বিষাদ' },
      { id: 'a63', word: 'হাসিখুশি', antonym: 'বিষণ্ণ' },
      { id: 'a64', word: 'মিলন', antonym: 'বিচ্ছেদ' },
      { id: 'a65', word: 'গ্রহণ', antonym: 'বর্জন' },
      { id: 'a66', word: 'স্বাধীন', antonym: 'পরাধীন' },
      { id: 'a67', word: 'দাস', antonym: 'প্রভু' },
      { id: 'a68', word: 'রাজা', antonym: 'প্রজা' },
      { id: 'a69', word: 'ধর্ম', antonym: 'অধর্ম' },
      { id: 'a70', word: 'পাপ', antonym: 'পুণ্য' }
    ]
  },
  {
    id: 'ant_l_8',
    level: 8,
    title: 'লেভেল ৮',
    color: 'from-blue-500 via-indigo-500 to-purple-600',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    words: [
      { id: 'a71', word: 'স্বর্গ', antonym: 'নরক' },
      { id: 'a72', word: 'প্রেম', antonym: 'ঘৃণা' },
      { id: 'a73', word: 'সম্মান', antonym: 'অসম্মান' },
      { id: 'a74', word: 'খ্যাতি', antonym: 'অখ্যাতি' },
      { id: 'a75', word: 'সফল', antonym: 'ব্যর্থ' },
      { id: 'a76', word: 'যোগ্য', antonym: 'অযোগ্য' },
      { id: 'a77', word: 'সক্ষম', antonym: 'অক্ষম' },
      { id: 'a78', word: 'সচেতন', antonym: 'অচেতন' },
      { id: 'a79', word: 'সচল', antonym: 'অচল' },
      { id: 'a80', word: 'জীবিত', antonym: 'মৃত' }
    ]
  },
  {
    id: 'ant_l_9',
    level: 9,
    title: 'লেভেল ৯',
    color: 'from-green-500 via-teal-500 to-emerald-600',
    borderColor: 'hover:border-teal-500/30 shadow-teal-950/20 text-teal-400',
    words: [
      { id: 'a81', word: 'ভাসা', antonym: 'ডোবা' },
      { id: 'a82', word: 'দেওয়া', antonym: 'নেওয়া' },
      { id: 'a83', word: 'জাগা', antonym: 'ঘুমানো' },
      { id: 'a84', word: 'ঢোকা', antonym: 'বের হওয়া' },
      { id: 'a85', word: 'বসা', antonym: 'দাঁড়ানো' },
      { id: 'a86', word: 'কেনা', antonym: 'বেচা' },
      { id: 'a87', word: 'খোলা', antonym: 'বন্ধ' },
      { id: 'a88', word: 'জমা', antonym: 'খরচ' },
      { id: 'a89', word: 'উপার্জন', antonym: 'ব্যয়' },
      { id: 'a90', word: 'রক্ষা', antonym: 'ধ্বংস' }
    ]
  },
  {
    id: 'ant_l_10',
    level: 10,
    title: 'লেভেল ১০',
    color: 'from-amber-600 via-red-500 to-rose-600',
    borderColor: 'hover:border-red-500/30 shadow-red-950/20 text-red-400',
    words: [
      { id: 'a91', word: 'নির্মাণ', antonym: 'ভাঙন' },
      { id: 'a92', word: 'বৃদ্ধি', antonym: 'হ্রাস' },
      { id: 'a93', word: 'প্রবেশ', antonym: 'প্রস্থান' },
      { id: 'a94', word: 'উত্থান', antonym: 'পতন' },
      { id: 'a95', word: 'সংযোগ', antonym: 'বিচ্ছিন্নতা' },
      { id: 'a96', word: 'উজ্জ্বল', antonym: 'ম্লান' },
      { id: 'a97', word: 'পরিষ্কার', antonym: 'নোংরা' },
      { id: 'a98', word: 'সুন্দর', antonym: 'কুৎসিত' },
      { id: 'a99', word: 'আকর্ষণীয়', antonym: 'বিরক্তিকর' },
      { id: 'a100', word: 'সুগন্ধ', antonym: 'দুর্গন্ধ' }
    ]
  },
  {
    id: 'ant_l_11',
    level: 11,
    title: 'লেভেল ১১',
    color: 'from-orange-500 via-yellow-500 to-amber-600',
    borderColor: 'hover:border-yellow-500/30 shadow-yellow-950/20 text-yellow-400',
    words: [
      { id: 'a101', word: 'সুবিধা', antonym: 'অসুবিধা' },
      { id: 'a102', word: 'স্বাস্থ্য', antonym: 'অসুস্থতা' },
      { id: 'a103', word: 'অগ্রগতি', antonym: 'পশ্চাদপসরণ' },
      { id: 'a104', word: 'দক্ষ', antonym: 'অদক্ষ' },
      { id: 'a105', word: 'সক্রিয়', antonym: 'নিষ্ক্রিয়' },
      { id: 'a106', word: 'সমৃদ্ধ', antonym: 'দরিদ্র' },
      { id: 'a107', word: 'প্রকাশ', antonym: 'গোপন' },
      { id: 'a108', word: 'প্রকাশ্য', antonym: 'গোপনীয়' },
      { id: 'a109', word: 'উত্তর', antonym: 'প্রশ্ন' },
      { id: 'a110', word: 'সামনে', antonym: 'পেছনে' }
    ]
  },
  {
    id: 'ant_l_12',
    level: 12,
    title: 'লেভেল ১২',
    color: 'from-teal-500 via-emerald-500 to-green-600',
    borderColor: 'hover:border-emerald-500/30 shadow-emerald-950/20 text-emerald-400',
    words: [
      { id: 'a111', word: 'নিকট', antonym: 'দূর' },
      { id: 'a112', word: 'অन्तर', antonym: 'বাহির' },
      { id: 'a113', word: 'পূর্ব', antonym: 'পশ্চিম' },
      { id: 'a114', word: 'উত্তর', antonym: 'দক্ষিণ' },
      { id: 'a115', word: 'দক্ষিণ', antonym: 'উত্তর' },
      { id: 'a116', word: 'প্রথম', antonym: 'শেষ' },
      { id: 'a117', word: 'আদি', antonym: 'انت' },
      { id: 'a118', word: 'কম', antonym: 'বেশি' },
      { id: 'a119', word: 'স্বল্প', antonym: 'প্রচুর' },
      { id: 'a120', word: 'অল্প', antonym: 'অধিক' }
    ]
  },
  {
    id: 'ant_l_13',
    level: 13,
    title: 'লেভেল ১৩',
    color: 'from-cyan-500 via-blue-500 to-indigo-600',
    borderColor: 'hover:border-blue-500/30 shadow-blue-950/20 text-blue-400',
    words: [
      { id: 'a121', word: 'খালি', antonym: 'ভর্তি' },
      { id: 'a122', word: 'তীক্ষ্ণ', antonym: 'ভোঁতা' },
      { id: 'a123', word: 'সরু', antonym: 'চওড়া' },
      { id: 'a124', word: 'গভীর', antonym: 'অগভীর' },
      { id: 'a125', word: 'মসৃণ', antonym: 'খসখসে' },
      { id: 'a126', word: 'দামী', antonym: 'সস্তা' },
      { id: 'a127', word: 'শীত', antonym: 'গ্রীষ্ম' },
      { id: 'a128', word: 'বর্ষা', antonym: 'খরা' },
      { id: 'a129', word: 'কাঁচা', antonym: 'পাকা' },
      { id: 'a130', word: 'তাজা', antonym: 'বাসি' }
    ]
  },
  {
    id: 'ant_l_14',
    level: 14,
    title: 'লেভেল ১৪',
    color: 'from-purple-500 via-indigo-500 to-pink-600',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    words: [
      { id: 'a131', word: 'জটিল', antonym: 'সরল' },
      { id: 'a132', word: 'ভদ্র', antonym: 'অভদ্র' },
      { id: 'a133', word: 'শৃঙ্খল', antonym: 'বিশৃঙ্খলা' },
      { id: 'a134', word: 'পরিচিত', antonym: 'অপরিচিত' },
      { id: 'a135', word: 'স্বাভাবিক', antonym: 'অস্বাভাবিক' },
      { id: 'a136', word: 'সাময়িক', antonym: 'স্থায়ী' },
      { id: 'a137', word: 'অস্থায়ী', antonym: 'স্থায়ী' },
      { id: 'a138', word: 'সরাসরি', antonym: 'পরোক্ষ' },
      { id: 'a139', word: 'উপকারী', antonym: 'অপকারী' },
      { id: 'a140', word: 'কল্যাণ', antonym: 'অকল্যাণ' }
    ]
  },
  {
    id: 'ant_l_15',
    level: 15,
    title: 'লেভেল ১৫',
    color: 'from-pink-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 'a141', word: 'বৈধ', antonym: 'অবৈধ' },
      { id: 'a142', word: 'সম্ভব', antonym: 'অসম্ভব' },
      { id: 'a143', word: 'নিশ্চিত', antonym: 'অনিশ্চিত' },
      { id: 'a144', word: 'নিরাপদ', antonym: 'বিপজ্জনক' },
      { id: 'a145', word: 'উৎসাহী', antonym: 'অনুৎসাহী' },
      { id: 'a146', word: 'পরিশ্রমী', antonym: 'অলস' },
      { id: 'a147', word: 'সংযত', antonym: 'অসংযত' },
      { id: 'a148', word: 'সহজলভ্য', antonym: 'দুষ্প্রাপ্য' },
      { id: 'a149', word: 'আনুষ্ঠানিক', antonym: 'অনানুষ্ঠানিক' },
      { id: 'a150', word: 'প্রশংসা', antonym: 'নিন্দা' }
    ]
  },
  {
    id: 'ant_l_16',
    level: 16,
    title: 'লেভেল ১৬',
    color: 'from-violet-500 via-purple-500 to-fuchsia-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 'a151', word: 'অতীত', antonym: 'ভবিষ্যৎ' },
      { id: 'a152', word: 'বর্তমান', antonym: 'অতীত' },
      { id: 'a153', word: 'স্থায়ী', antonym: 'অস্থায়ী' },
      { id: 'a154', word: 'সতর্ক', antonym: 'অসতর্ক' },
      { id: 'a155', word: 'নিয়মিত', antonym: 'অনিয়মিত' },
      { id: 'a156', word: 'সমান', antonym: 'অসমান' },
      { id: 'a157', word: 'সম্মতি', antonym: 'অসম্মতি' },
      { id: 'a158', word: 'সफलता', antonym: 'ব্যর্থতা' },
      { id: 'a159', word: 'প্রিয়', antonym: 'অপ্রিয়' },
      { id: 'a160', word: 'আকর্ষণ', antonym: 'বিকর্ষণ' }
    ]
  },
  {
    id: 'ant_l_17',
    level: 17,
    title: 'লেভেল ১৭',
    color: 'from-emerald-500 via-teal-500 to-blue-600',
    borderColor: 'hover:border-teal-500/30 shadow-teal-950/20 text-teal-400',
    words: [
      { id: 'a161', word: 'কৃতজ্ঞ', antonym: 'অকৃতজ্ঞ' },
      { id: 'a162', word: 'विश्वास', antonym: 'অविश्वास' },
      { id: 'a163', word: 'বিশ্বস্ত', antonym: 'অবিশ্বস্ত' },
      { id: 'a164', word: 'বন্ধন', antonym: 'মুক্তি' },
      { id: 'a165', word: 'মুক্ত', antonym: 'বদ্ধ' },
      { id: 'a166', word: 'আক্রমণ', antonym: 'প্রতিরক্ষা' },
      { id: 'a167', word: 'বীর', antonym: 'কাপুরুষ' },
      { id: 'a168', word: 'উদয়', antonym: 'অস্ত' },
      { id: 'a169', word: 'সঞ্চয়', antonym: 'অপচয়' },
      { id: 'a170', word: 'সংকীর্ণ', antonym: 'প্রশস্ত' }
    ]
  },
  {
    id: 'ant_l_18',
    level: 18,
    title: 'লেভেল ১৮',
    color: 'from-orange-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 'a171', word: 'প্রাচুর্য', antonym: 'অভাব' },
      { id: 'a172', word: 'আলোকিত', antonym: 'অন্ধকারাচ্ছন্ন' },
      { id: 'a173', word: 'সজীব', antonym: 'নিষ্প্রাণ' },
      { id: 'a174', word: 'নিষিদ্ধ', antonym: 'অনুমোদিত' },
      { id: 'a175', word: 'বিজয়ী', antonym: 'পরাজিত' },
      { id: 'a176', word: 'সুবিচার', antonym: 'অবিচার' },
      { id: 'a177', word: 'হিত', antonym: 'অহিত' },
      { id: 'a178', word: 'সুখ্যাতি', antonym: 'কুখ্যাতি' },
      { id: 'a179', word: 'নির্দোষ', antonym: 'দোষী' },
      { id: 'a180', word: 'অমৃত', antonym: 'বিষ' }
    ]
  },
  {
    id: 'ant_l_19',
    level: 19,
    title: 'লেভেল ১৯',
    color: 'from-cyan-500 via-teal-500 to-emerald-600',
    borderColor: 'hover:border-cyan-500/30 shadow-cyan-950/20 text-cyan-400',
    words: [
      { id: 'a181', word: 'উর্বর', antonym: 'অনুর্বর' },
      { id: 'a182', word: 'সবল', antonym: 'রুগ্ণ' },
      { id: 'a183', word: 'মঙ্গল', antonym: 'অমঙ্গল' },
      { id: 'a184', word: 'জাগরণ', antonym: 'নিদ্রা' },
      { id: 'a185', word: 'সৃজন', antonym: 'ধ্বংস' },
      { id: 'a186', word: 'অভ্যন্তর', antonym: 'বহির্ভাগ' },
      { id: 'a187', word: 'প্রকাশিত', antonym: 'অপ্রকাশিত' },
      { id: 'a188', word: 'প্রবাহ', antonym: 'স্থবিরতা' },
      { id: 'a189', word: 'গঠন', antonym: 'বিনাশ' },
      { id: 'a190', word: 'সহনশীল', antonym: 'অসহনশীল' }
    ]
  },
  {
    id: 'ant_l_20',
    level: 20,
    title: 'লেভেল ২০',
    color: 'from-pink-600 via-purple-500 to-indigo-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 'a191', word: 'সামঞ্জস্য', antonym: 'অসামঞ্জস্য' },
      { id: 'a192', word: 'শোভন', antonym: 'অশোভন' },
      { id: 'a193', word: 'সুসংবাদ', antonym: 'দুঃসংবাদ' },
      { id: 'a194', word: 'সতেজ', antonym: 'ক্লান্ত' },
      { id: 'a195', word: 'অমায়িক', antonym: 'রূঢ়' },
      { id: 'a196', word: 'প্রচলিত', antonym: 'অপ্রচলিত' },
      { id: 'a197', word: 'সমবেত', antonym: 'বিচ্ছিন্ন' },
      { id: 'a198', word: 'আন্তরিক', antonym: 'অনাগ্রহী' },
      { id: 'a199', word: 'সুশৃঙ্খল', antonym: 'বিশৃঙ্খল' },
      { id: 'a200', word: 'আদর্শ', antonym: 'অনাদর্শ' }
    ]
  }
];

export const BENGALI_SADHU_CHOLIT: SadhuCholitLevel[] = [
  {
    id: 'sc_l_1',
    level: 1,
    title: 'সহজ স্তর - লেভেল ১',
    difficulty: 'সহজ',
    color: 'from-green-500 via-emerald-500 to-teal-600',
    borderColor: 'hover:border-emerald-500/30 shadow-emerald-950/20 text-emerald-400',
    words: [
      { id: 'sc1', sadhu: 'করিতেছি', cholit: 'করছি' },
      { id: 'sc2', sadhu: 'করিতেছে', cholit: 'করছে' },
      { id: 'sc3', sadhu: 'করিতেছ', cholit: 'করছ' },
      { id: 'sc4', sadhu: 'করিতেছি না', cholit: 'করছি না' },
      { id: 'sc5', sadhu: 'করিলাম', cholit: 'করলাম' },
      { id: 'sc6', sadhu: 'করিলে', cholit: 'করলে' },
      { id: 'sc7', sadhu: 'করিল', cholit: 'করল' },
      { id: 'sc8', sadhu: 'করিয়া', cholit: 'করে' },
      { id: 'sc9', sadhu: 'খাইতেছি', cholit: 'খাচ্ছি' },
      { id: 'sc10', sadhu: 'খাইতেছে', cholit: 'খাচ্ছে' }
    ]
  },
  {
    id: 'sc_l_2',
    level: 2,
    title: 'সহজ স্তর - লেভেল ২',
    difficulty: 'সহজ',
    color: 'from-teal-500 via-cyan-500 to-blue-600',
    borderColor: 'hover:border-cyan-500/30 shadow-cyan-950/20 text-cyan-400',
    words: [
      { id: 'sc11', sadhu: 'খাইতেছিল', cholit: 'খাচ্ছিল' },
      { id: 'sc12', sadhu: 'খাইয়াছি', cholit: 'খেয়েছি' },
      { id: 'sc13', sadhu: 'যাইতেছি', cholit: 'যাচ্ছি' },
      { id: 'sc14', sadhu: 'যাইতেছে', cholit: 'যাচ্ছে' },
      { id: 'sc15', sadhu: 'যাইতেছিল', cholit: 'যাচ্ছিল' },
      { id: 'sc16', sadhu: 'যাইব', cholit: 'যাব' },
      { id: 'sc17', sadhu: 'আসিয়াছি', cholit: 'এসেছি' },
      { id: 'sc18', sadhu: 'আসিয়াছে', cholit: 'এসেছে' },
      { id: 'sc19', sadhu: 'আসিল', cholit: 'এলো' },
      { id: 'sc20', sadhu: 'আসিবে', cholit: 'আসবে' }
    ]
  },
  {
    id: 'sc_l_3',
    level: 3,
    title: 'সহজ স্তর - লেভেল ৩',
    difficulty: 'সহজ',
    color: 'from-blue-500 via-indigo-500 to-purple-600',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    words: [
      { id: 'sc21', sadhu: 'देखিলাম', cholit: 'দেখলাম' },
      { id: 'sc22', sadhu: 'देखিল', cholit: 'দেখল' },
      { id: 'sc23', sadhu: 'বলিলাম', cholit: 'বললাম' },
      { id: 'sc24', sadhu: 'বলিল', cholit: 'বলল' },
      { id: 'sc25', sadhu: 'শুনিলাম', cholit: 'শুনলাম' },
      { id: 'sc26', sadhu: 'শুনিল', cholit: 'শুনল' },
      { id: 'sc27', sadhu: 'পড়িলাম', cholit: 'পড়লাম' },
      { id: 'sc28', sadhu: 'পড়িল', cholit: 'পড়ল' },
      { id: 'sc29', sadhu: 'বসিয়াছি', cholit: 'বসেছি' },
      { id: 'sc30', sadhu: 'দাঁড়াইয়াছি', cholit: 'দাঁড়িয়েছি' }
    ]
  },
  {
    id: 'sc_l_4',
    level: 4,
    title: 'সহজ স্তর - লেভেল ৪',
    difficulty: 'সহজ',
    color: 'from-purple-500 via-fuchsia-500 to-pink-600',
    borderColor: 'hover:border-fuchsia-500/30 shadow-fuchsia-950/20 text-fuchsia-400',
    words: [
      { id: 'sc31', sadhu: 'লইয়া', cholit: 'নিয়ে' },
      { id: 'sc32', sadhu: 'দিয়া', cholit: 'দিয়ে' },
      { id: 'sc33', sadhu: 'গিয়া', cholit: 'গিয়ে' },
      { id: 'sc34', sadhu: 'পাইয়া', cholit: 'পেয়ে' },
      { id: 'sc35', sadhu: 'হইয়া', cholit: 'হয়ে' },
      { id: 'sc36', sadhu: 'হইল', cholit: 'হলো' },
      { id: 'sc37', sadhu: 'হইবে', cholit: 'হবে' },
      { id: 'sc38', sadhu: 'রহিয়াছে', cholit: 'রয়েছে' },
      { id: 'sc39', sadhu: 'থাকিবে', cholit: 'থাকবে' },
      { id: 'sc40', sadhu: 'আনিয়াছি', cholit: 'এনেছি' }
    ]
  },
  {
    id: 'sc_l_5',
    level: 5,
    title: 'সহজ স্তর - লেভেল ৫',
    difficulty: 'সহজ',
    color: 'from-pink-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 'sc41', sadhu: 'আনিল', cholit: 'আনল' },
      { id: 'sc42', sadhu: 'রাখিয়াছি', cholit: 'রেখেছি' },
      { id: 'sc43', sadhu: 'রাখিল', cholit: 'রাখল' },
      { id: 'sc44', sadhu: 'লিখিয়াছি', cholit: 'লিখেছি' },
      { id: 'sc45', sadhu: 'লিখিল', cholit: 'লিখল' },
      { id: 'sc46', sadhu: 'জানিয়াছি', cholit: 'জানিয়েছি' },
      { id: 'sc47', sadhu: 'ভাবিতেছি', cholit: 'ভাবছি' },
      { id: 'sc48', sadhu: 'হাসিতেছে', cholit: 'হাসছে' },
      { id: 'sc49', sadhu: 'কাঁদিতেছে', cholit: 'কাঁদছে' },
      { id: 'sc50', sadhu: 'ঘুমাইতেছে', cholit: 'ঘুমাচ্ছে' }
    ]
  },
  {
    id: 'sc_l_6',
    level: 6,
    title: 'মাঝারি স্তর - লেভেল ৬',
    difficulty: 'মাঝারি',
    color: 'from-amber-500 via-orange-500 to-red-600',
    borderColor: 'hover:border-orange-500/30 shadow-orange-950/20 text-orange-400',
    words: [
      { id: 'sc51', sadhu: 'তাহা', cholit: 'তা' },
      { id: 'sc52', sadhu: 'তাহার', cholit: 'তার' },
      { id: 'sc53', sadhu: ' তাহাকে', cholit: 'তাকে' },
      { id: 'sc54', sadhu: 'তাহাদিগকে', cholit: 'তাদের' },
      { id: 'sc55', sadhu: 'তাহাদিগের', cholit: 'তাদের' },
      { id: 'sc56', sadhu: 'ইহা', cholit: 'এটা' },
      { id: 'sc57', sadhu: 'ইহার', cholit: 'এর' },
      { id: 'sc58', sadhu: 'ইহাতে', cholit: 'এতে' },
      { id: 'sc59', sadhu: 'উহা', cholit: 'ওটা' },
      { id: 'sc60', sadhu: 'উহার', cholit: 'ওর' }
    ]
  },
  {
    id: 'sc_l_7',
    level: 7,
    title: 'মাঝারি স্তর - লেভেল ৭',
    difficulty: 'মাঝারি',
    color: 'from-yellow-500 via-amber-500 to-orange-600',
    borderColor: 'hover:border-amber-500/30 shadow-amber-950/20 text-amber-400',
    words: [
      { id: 'sc61', sadhu: 'কাহাকে', cholit: 'কাকে' },
      { id: 'sc62', sadhu: 'কাহার', cholit: 'কার' },
      { id: 'sc63', sadhu: 'কাহারও', cholit: 'কারও' },
      { id: 'sc64', sadhu: 'যাহা', cholit: 'যা' },
      { id: 'sc65', sadhu: 'যাহার', cholit: 'যার' },
      { id: 'sc66', sadhu: 'যাহাতে', cholit: 'যাতে' },
      { id: 'sc67', sadhu: 'যাহারা', cholit: 'যারা' },
      { id: 'sc68', sadhu: 'যাহাদিগকে', cholit: 'যাদের' },
      { id: 'sc69', sadhu: 'যেরূপ', cholit: 'যেমন' },
      { id: 'sc70', sadhu: 'সেরূপ', cholit: 'তেমন' }
    ]
  },
  {
    id: 'sc_l_8',
    level: 8,
    title: 'মাঝারি স্তর - লেভেল ৮',
    difficulty: 'মাঝারি',
    color: 'from-lime-500 via-green-500 to-emerald-600',
    borderColor: 'hover:border-green-500/30 shadow-green-950/20 text-green-400',
    words: [
      { id: 'sc71', sadhu: 'কিরূপ', cholit: 'কেমন' },
      { id: 'sc72', sadhu: 'অতএব', cholit: 'তাই' },
      { id: 'sc73', sadhu: 'সুতরাং', cholit: 'তাই' },
      { id: 'sc74', sadhu: 'কেননা', cholit: 'কারণ' },
      { id: 'sc75', sadhu: 'তথাপি', cholit: 'তবু' },
      { id: 'sc76', sadhu: 'যদিও', cholit: 'যদিও' },
      { id: 'sc77', sadhu: 'যেন', cholit: 'যেন' },
      { id: 'sc78', sadhu: 'যদি', cholit: 'যদি' },
      { id: 'sc79', sadhu: 'নহে', cholit: 'নয়' },
      { id: 'sc80', sadhu: 'নহিল', cholit: 'হলো না' }
    ]
  },
  {
    id: 'sc_l_9',
    level: 9,
    title: 'মাঝারি স্তর - লেভেল ৯',
    difficulty: 'মাঝারি',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    borderColor: 'hover:border-teal-500/30 shadow-teal-950/20 text-teal-400',
    words: [
      { id: 'sc81', sadhu: 'নহিবে', cholit: 'হবে না' },
      { id: 'sc82', sadhu: 'কহিল', cholit: 'বলল' },
      { id: 'sc83', sadhu: 'কহিলেন', cholit: 'বললেন' },
      { id: 'sc84', sadhu: 'কহিয়া', cholit: 'বলে' },
      { id: 'sc85', sadhu: 'জিজ্ঞাসা করিল', cholit: 'জিজ্ঞেস করল' },
      { id: 'sc86', sadhu: 'প্রত্যাবর্তন করিল', cholit: 'فফিরে এল' }, // Wait, let's fix the extra "f" typo if any
      { id: 'sc86_fixed', sadhu: 'প্রত্যাবর্তন করিল', cholit: 'ফিরে এল' },
      { id: 'sc87', sadhu: 'প্রস্থান করিল', cholit: 'চলে গেল' },
      { id: 'sc88', sadhu: 'আহার করিল', cholit: 'খেয়েছিল' },
      { id: 'sc89', sadhu: 'শয়ন করিল', cholit: 'ঘুমাল' },
      { id: 'sc90', sadhu: 'স্নান করিল', cholit: 'গোসল করল' }
    ]
  },
  {
    id: 'sc_l_10',
    level: 10,
    title: 'মাঝারি স্তর - লেভেল ১০',
    difficulty: 'মাঝারি',
    color: 'from-cyan-500 via-sky-500 to-blue-600',
    borderColor: 'hover:border-sky-500/30 shadow-sky-950/20 text-sky-400',
    words: [
      { id: 'sc91', sadhu: 'দর্শন করিল', cholit: 'देखল' }, // User's input says: দেখল. Let's make it দেখল
      { id: 'sc91_fixed', sadhu: 'দর্শন করিল', cholit: 'দেখল' },
      { id: 'sc92', sadhu: 'গ্রহণ করিল', cholit: 'নিল' },
      { id: 'sc93', sadhu: 'প্রদান করিল', cholit: 'দিল' },
      { id: 'sc94', sadhu: 'প্রেরণ করিল', cholit: 'পাঠাল' },
      { id: 'sc95', sadhu: 'আগমন করিল', cholit: 'এল' },
      { id: 'sc96', sadhu: 'গমন করিল', cholit: 'গেল' },
      { id: 'sc97', sadhu: 'অবস্থান করিল', cholit: 'থাকল' },
      { id: 'sc98', sadhu: 'পরিদর্শন করিল', cholit: 'ঘুরে দেখল' },
      { id: 'sc99', sadhu: 'অবলোকন করিল', cholit: 'দেখল' },
      { id: 'sc100', sadhu: 'তাহারা', cholit: 'তারা' }
    ]
  },
  {
    id: 'sc_l_11',
    level: 11,
    title: 'কঠিন স্তর - লেভেল ১১',
    difficulty: 'কঠিন',
    color: 'from-indigo-500 via-purple-500 to-pink-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 'sc101', sadhu: 'গৃহ', cholit: 'বাড়ি' },
      { id: 'sc102', sadhu: 'আবাস', cholit: 'বাসস্থান' },
      { id: 'sc103', sadhu: 'অট্টালিকা', cholit: 'বড় বাড়ি' },
      { id: 'sc104', sadhu: 'জননী', cholit: 'মা' },
      { id: 'sc105', sadhu: 'পিতা', cholit: 'বাবা' },
      { id: 'sc106', sadhu: 'ভ্রাতা', cholit: 'ভাই' },
      { id: 'sc107', sadhu: 'ভগিনী', cholit: 'বোন' },
      { id: 'sc108', sadhu: 'পত্নী', cholit: 'স্ত্রী' },
      { id: 'sc109', sadhu: 'পুত্র', cholit: 'ছেলে' },
      { id: 'sc110', sadhu: 'কন্যা', cholit: 'মেয়ে' }
    ]
  },
  {
    id: 'sc_l_12',
    level: 12,
    title: 'কঠিন স্তর - লেভেল ১২',
    difficulty: 'কঠিন',
    color: 'from-purple-500 via-fuchsia-500 to-rose-600',
    borderColor: 'hover:border-fuchsia-500/30 shadow-fuchsia-950/20 text-fuchsia-400',
    words: [
      { id: 'sc111', sadhu: 'ভোজন', cholit: 'খাওয়া' },
      { id: 'sc112', sadhu: 'পান', cholit: 'পান করা' },
      { id: 'sc113', sadhu: 'নিদ্রা', cholit: 'ঘুম' },
      { id: 'sc114', sadhu: 'প্রভাত', cholit: 'সকাল' },
      { id: 'sc115', sadhu: 'সায়ংকাল', cholit: 'সন্ধ্যা' },
      { id: 'sc116', sadhu: 'রজনী', cholit: 'রাত' },
      { id: 'sc117', sadhu: 'দিবস', cholit: 'দিন' },
      { id: 'sc118', sadhu: 'নিকট', cholit: 'কাছে' },
      { id: 'sc119', sadhu: 'দূরবর্তী', cholit: 'দূরের' },
      { id: 'sc120', sadhu: 'অন্তরাল', cholit: 'আড়াল' }
    ]
  },
  {
    id: 'sc_l_13',
    level: 13,
    title: 'কঠিন স্তর - লেভেল ১৩',
    difficulty: 'কঠিন',
    color: 'from-rose-500 via-red-500 to-orange-600',
    borderColor: 'hover:border-red-500/30 shadow-red-950/20 text-red-400',
    words: [
      { id: 'sc121', sadhu: 'প্রাঙ্গণ', cholit: 'উঠান' },
      { id: 'sc122', sadhu: 'উদ্যান', cholit: 'বাগান' },
      { id: 'sc123', sadhu: 'পথিক', cholit: 'পথচারি' },
      { id: 'sc124', sadhu: 'নৃপতি', cholit: 'রাজা' },
      { id: 'sc125', sadhu: 'অশ্ব', cholit: 'ঘোড়া' },
      { id: 'sc126', sadhu: 'গজ', cholit: 'হাতি' },
      { id: 'sc127', sadhu: 'শশক', cholit: 'খরগোশ' },
      { id: 'sc128', sadhu: 'মৃগ', cholit: 'হরিণ' },
      { id: 'sc129', sadhu: 'পক্ষী', cholit: 'পাখি' },
      { id: 'sc130', sadhu: 'জলধি', cholit: 'সমুদ্র' }
    ]
  },
  {
    id: 'sc_l_14',
    level: 14,
    title: 'কঠিন স্তর - লেভেল ১৪',
    difficulty: 'কঠিন',
    color: 'from-orange-500 via-amber-500 to-yellow-600',
    borderColor: 'hover:border-amber-500/30 shadow-amber-950/20 text-amber-400',
    words: [
      { id: 'sc131', sadhu: 'বারিধি', cholit: 'সমুদ্র' },
      { id: 'sc132', sadhu: 'ধরণী', cholit: 'পৃথিবী' },
      { id: 'sc133', sadhu: 'গগন', cholit: 'আকাশ' },
      { id: 'sc134', sadhu: 'পুষ্প', cholit: 'ফুল' },
      { id: 'sc135', sadhu: 'তরু', cholit: 'গাছ' },
      { id: 'sc136', sadhu: 'পল্লী', cholit: 'গ্রাম' },
      { id: 'sc137', sadhu: 'নগর', cholit: 'শহর' },
      { id: 'sc138', sadhu: 'মন্দির', cholit: 'উপাসনালয়' },
      { id: 'sc139', sadhu: 'চিকিৎসক', cholit: 'ডাক্তার' },
      { id: 'sc140', sadhu: 'শিক্ষক', cholit: 'মাস্টার' }
    ]
  },
  {
    id: 'sc_l_15',
    level: 15,
    title: 'কঠিন স্তর - লেভেল ১৫',
    difficulty: 'কঠিন',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    borderColor: 'hover:border-teal-500/30 shadow-teal-950/20 text-teal-400',
    words: [
      { id: 'sc141', sadhu: 'শিক্ষার্থী', cholit: 'ছাত্র' },
      { id: 'sc142', sadhu: 'গৃহিণী', cholit: 'গৃহকর্ত্রী' },
      { id: 'sc143', sadhu: 'কর্মচারী', cholit: 'চাকরিজীবী' },
      { id: 'sc144', sadhu: 'ভৃত্য', cholit: 'চাকর' },
      { id: 'sc145', sadhu: 'যানবাহন', cholit: 'গাড়ি' },
      { id: 'sc146', sadhu: 'পত্র', cholit: 'চিঠি' },
      { id: 'sc147', sadhu: 'সংবাদ', cholit: 'খবর' },
      { id: 'sc148', sadhu: 'উপকার', cholit: 'সাহায্য' },
      { id: 'sc149', sadhu: 'অপকার', cholit: 'ক্ষতি' },
      { id: 'sc150', sadhu: 'কল্যাণ', cholit: 'মঙ্গল' }
    ]
  },
  {
    id: 'sc_l_16',
    level: 16,
    title: 'বাক্য রূপান্তর - লেভেল ১৬',
    difficulty: 'বাক্য',
    color: 'from-violet-600 via-purple-600 to-indigo-700',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 'scs1', sadhu: 'আমি বিদ্যালয়ে গিয়াছিলাম।', cholit: 'আমি স্কুলে গিয়েছিলাম।' },
      { id: 'scs2', sadhu: 'সে তাহার বন্ধুকে ডাকিল।', cholit: 'সে তার বন্ধুকে ডাকল।' },
      { id: 'scs3', sadhu: 'বালকটি মাঠে খেলিতেছে।', cholit: 'ছেলেটি মাঠে খেলছে।' },
      { id: 'scs4', sadhu: 'তিনি গৃহে প্রত্যাবর্তন করিলেন।', cholit: 'তিনি বাড়িতে ফিরে এলেন।' },
      { id: 'scs5', sadhu: 'আমরা সকলেই আনন্দিত হইলাম।', cholit: 'আমরা সবাই আনন্দিত হলাম।' },
      { id: 'scs6', sadhu: 'তুমি কাহার সহিত যাইতেছ?', cholit: 'তুমি কার সঙ্গে যাচ্ছ?' },
      { id: 'scs7', sadhu: 'সে কহিল, আমি আসিব।', cholit: 'সে বলল, আমি আসব।' },
      { id: 'scs8', sadhu: 'বৃষ্টিপাত হইতেছে।', cholit: 'বৃষ্টি হচ্ছে।' },
      { id: 'scs9', sadhu: 'শিশুটি নিদ্রিত হইয়াছে।', cholit: 'শিশুটি ঘুমিয়ে পড়েছে।' },
      { id: 'scs10', sadhu: 'তাহারা বিদ্যালয়ে উপস্থিত হইল।', cholit: 'তারা স্কুলে উপস্থিত হলো।' }
    ]
  }
];

export const BENGALI_SYNONYMS: SynonymLevel[] = [
  {
    id: 'syn_l_1',
    level: 1,
    title: 'লেভেল ১ (সহজ শুরু)',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    borderColor: 'hover:border-teal-500/30 shadow-teal-950/20 text-teal-400',
    words: [
      { id: 's1', word: 'উদ্ভিদ', synonym: 'গাছ' },
      { id: 's2', word: 'মাতা', synonym: 'মা' },
      { id: 's3', word: 'জনক', synonym: 'পিতা' },
      { id: 's4', word: 'পিতা', synonym: 'বাবা' },
      { id: 's5', word: 'জননী', synonym: 'মা' },
      { id: 's6', word: 'ভ্রাতা', synonym: 'ভাই' },
      { id: 's7', word: 'ভগিনী', synonym: 'বোন' },
      { id: 's8', word: 'গৃহ', synonym: 'বাড়ি' },
      { id: 's9', word: 'আবাস', synonym: 'বাড়ি' },
      { id: 's10', word: 'নিবাস', synonym: 'বাসস্থান' },
      { id: 's11', word: 'ভোজন', synonym: 'খাওয়া' },
      { id: 's12', word: 'আহার', synonym: 'খাবার' },
      { id: 's13', word: 'সলিল', synonym: 'পানি' },
      { id: 's14', word: 'জল', synonym: 'পানি' },
      { id: 's15', word: 'নীর', synonym: 'পানি' },
      { id: 's16', word: 'বারি', synonym: 'পানি' },
      { id: 's17', word: 'অগ্নি', synonym: 'আগুন' },
      { id: 's18', word: 'অনল', synonym: 'আগুন' },
      { id: 's19', word: 'বহ্নি', synonym: 'আগুন' },
      { id: 's20', word: 'পবন', synonym: 'বাতাস' }
    ]
  },
  {
    id: 'syn_l_2',
    level: 2,
    title: 'লেভেল ২ (প্রকৃতি ও আকাশ)',
    color: 'from-amber-500 via-orange-500 to-yellow-600',
    borderColor: 'hover:border-orange-500/30 shadow-orange-950/20 text-orange-400',
    words: [
      { id: 's21', word: 'সমীর', synonym: 'হাওয়া' },
      { id: 's22', word: 'বায়ু', synonym: 'হাওয়া' },
      { id: 's23', word: 'গগন', synonym: 'আকাশ' },
      { id: 's24', word: 'নভ', synonym: 'আকাশ' },
      { id: 's25', word: 'অম্বর', synonym: 'আকাশ' },
      { id: 's26', word: 'রবি', synonym: 'সূর্য' },
      { id: 's27', word: 'ভানু', synonym: 'সূর্য' },
      { id: 's28', word: 'দিবাকর', synonym: 'সূর্য' },
      { id: 's29', word: 'শশী', synonym: 'চাঁদ' },
      { id: 's30', word: 'ইন্দু', synonym: 'চাঁদ' },
      { id: 's31', word: 'চন্দ্র', synonym: 'চাঁদ' },
      { id: 's32', word: 'ধরণী', synonym: 'পৃথিবী' },
      { id: 's33', word: 'ভূমি', synonym: 'মাটি' },
      { id: 's34', word: 'বসুন্ধরা', synonym: 'পৃথিবী' },
      { id: 's35', word: 'পুষ্প', synonym: 'ফুল' },
      { id: 's36', word: 'কুসুম', synonym: 'ফুল' },
      { id: 's37', word: 'তরু', synonym: 'গাছ' },
      { id: 's38', word: 'বৃক্ষ', synonym: 'গাছ' },
      { id: 's39', word: 'কানন', synonym: 'বন' },
      { id: 's40', word: 'অরণ্য', synonym: 'জঙ্গল' }
    ]
  },
  {
    id: 'syn_l_3',
    level: 3,
    title: 'লেভেল ৩ (পাহাড়, সাগর ও পশুপাখি)',
    color: 'from-sky-500 via-blue-500 to-indigo-600',
    borderColor: 'hover:border-blue-500/30 shadow-blue-950/20 text-blue-400',
    words: [
      { id: 's41', word: 'বন', synonym: 'জঙ্গল' },
      { id: 's42', word: 'নদ', synonym: 'নদী' },
      { id: 's43', word: 'সরিৎ', synonym: 'নদী' },
      { id: 's44', word: 'সিন্ধু', synonym: 'সমুদ্র' },
      { id: 's45', word: 'সাগর', synonym: 'সমুদ্র' },
      { id: 's46', word: 'শৈল', synonym: 'পাহাড়' },
      { id: 's47', word: 'গিরি', synonym: 'পাহাড়' },
      { id: 's48', word: 'পর্বত', synonym: 'পাহাড়' },
      { id: 's49', word: 'শ্বান', synonym: 'কুকুর' },
      { id: 's50', word: 'সারমেয়', synonym: 'কুকুর' },
      { id: 's51', word: 'মার্জার', synonym: 'বিড়াল' },
      { id: 's52', word: 'অশ্ব', synonym: 'ঘোড়া' },
      { id: 's53', word: 'গজ', synonym: 'হাতি' },
      { id: 's54', word: 'হস্তী', synonym: 'হাতি' },
      { id: 's55', word: 'কপোত', synonym: 'কবুতর' },
      { id: 's56', word: 'শুক', synonym: 'টিয়া' },
      { id: 's57', word: 'কোকিল', synonym: 'পাপিয়া' },
      { id: 's58', word: 'মীন', synonym: 'মাছ' },
      { id: 's59', word: 'মৃগ', synonym: 'হরিণ' },
      { id: 's60', word: 'শশক', synonym: 'খরগোশ' }
    ]
  },
  {
    id: 'syn_l_4',
    level: 4,
    title: 'লেভেল ৪ (মানুষ ও সমাজ)',
    color: 'from-rose-500 via-pink-500 to-fuchsia-600',
    borderColor: 'hover:border-pink-500/30 shadow-pink-950/20 text-pink-400',
    words: [
      { id: 's61', word: 'গাভী', synonym: 'গরু' },
      { id: 's62', word: 'বৎস', synonym: 'বাছুর' },
      { id: 's63', word: 'শিশু', synonym: 'বাচ্চা' },
      { id: 's64', word: 'বালক', synonym: 'ছেলে' },
      { id: 's65', word: 'বালিকা', synonym: 'মেয়ে' },
      { id: 's66', word: 'কিশোর', synonym: 'তরুণ ছেলে' },
      { id: 's67', word: 'কিশোরী', synonym: 'তরুণ মেয়ে' },
      { id: 's68', word: 'নৃপতি', synonym: 'রাজা' },
      { id: 's69', word: 'রাজা', synonym: 'নৃপতি' },
      { id: 's70', word: 'রাণী', synonym: 'মহারানি' },
      { id: 's71', word: 'শিক্ষক', synonym: 'গুরু' },
      { id: 's72', word: 'গুরু', synonym: 'শিক্ষক' },
      { id: 's73', word: 'শিষ্য', synonym: 'ছাত্র' },
      { id: 's74', word: 'বিদ্যার্থী', synonym: 'ছাত্র' },
      { id: 's75', word: 'চিকিৎসক', synonym: 'ডাক্তার' },
      { id: 's76', word: 'ভিষক', synonym: 'চিকিৎসক' },
      { id: 's77', word: 'রোগী', synonym: 'অসুস্থ ব্যক্তি' },
      { id: 's78', word: 'ঔষধ', synonym: 'ওষুধ' },
      { id: 's79', word: 'বস্ত্র', synonym: 'কাপড়' },
      { id: 's80', word: 'পরিধান', synonym: 'পোশাক' }
    ]
  },
  {
    id: 'syn_l_5',
    level: 5,
    title: 'লেভেল ৫ (ভাবনা ও অনুভূতি)',
    color: 'from-violet-500 via-purple-500 to-indigo-600',
    borderColor: 'hover:border-purple-500/30 shadow-purple-950/20 text-purple-400',
    words: [
      { id: 's81', word: 'শয়ন', synonym: 'ঘুম' },
      { id: 's82', word: 'নিদ্রা', synonym: 'ঘুম' },
      { id: 's83', word: 'প্রভাত', synonym: 'সকাল' },
      { id: 's84', word: 'সন্ধ্যা', synonym: 'গোধূলি' },
      { id: 's85', word: 'রজনী', synonym: 'রাত' },
      { id: 's86', word: 'নিশা', synonym: 'রাত' },
      { id: 's87', word: 'দিবা', synonym: 'দিন' },
      { id: 's88', word: 'আলোক', synonym: 'আলো' },
      { id: 's89', word: 'জ্যোতি', synonym: 'আলো' },
      { id: 's90', word: 'তিমির', synonym: 'অন্ধকার' },
      { id: 's91', word: 'অন্ধকার', synonym: 'আঁধার' },
      { id: 's92', word: 'आनন্দ', synonym: 'খুশি' },
      { id: 's93', word: 'হর্ষ', synonym: 'आनন্দ' },
      { id: 's94', word: 'দুঃখ', synonym: 'কষ্ট' },
      { id: 's95', word: 'বেদনা', synonym: 'কষ্ট' },
      { id: 's96', word: 'ক্রোধ', synonym: 'রাগ' },
      { id: 's97', word: 'ভয়', synonym: 'আতঙ্ক' },
      { id: 's98', word: 'সাহস', synonym: 'বীরত্ব' },
      { id: 's99', word: 'সত্য', synonym: 'সততা' },
      { id: 's100', word: 'মিথ্যা', synonym: 'অসত্য' }
    ]
  },
  {
    id: 'syn_l_6',
    level: 6,
    title: 'লেভেল ৬ (রাজা ও পরিবার)',
    color: 'from-lime-500 via-emerald-500 to-green-600',
    borderColor: 'hover:border-emerald-500/30 shadow-emerald-950/20 text-emerald-400',
    words: [
      { id: 's101', word: 'নৃপ', synonym: 'রাজা' },
      { id: 's102', word: 'ভূপতি', synonym: 'রাজা' },
      { id: 's103', word: 'মহীপতি', synonym: 'রাজা' },
      { id: 's104', word: 'রাজপুত্র', synonym: 'রাজকুমার' },
      { id: 's105', word: 'রাজকন্যা', synonym: 'রাজকুমারী' },
      { id: 's106', word: 'দুহিতা', synonym: 'কন্যা' },
      { id: 's107', word: 'কন্যা', synonym: 'মেয়ে' },
      { id: 's108', word: 'তনয়', synonym: 'পুত্র' },
      { id: 's109', word: 'তনয়া', synonym: 'কন্যা' },
      { id: 's110', word: 'সন্তান', synonym: 'ছেলে-মেয়ে' },
      { id: 's111', word: 'শিশু', synonym: 'বাচ্চা' },
      { id: 's112', word: 'বাল্য', synonym: 'শৈশব' },
      { id: 's113', word: 'শৈশব', synonym: 'ছোটবেলা' },
      { id: 's114', word: 'যৌবন', synonym: 'তরুণ বয়স' },
      { id: 's115', word: 'বার্ধক্য', synonym: 'বৃদ্ধ বয়স' },
      { id: 's116', word: 'বৃদ্ধ', synonym: 'বুড়ো' },
      { id: 's117', word: 'প্রৌঢ়', synonym: 'বয়স্ক' },
      { id: 's118', word: 'গৃহিণী', synonym: 'গৃহকর্ত্রী' },
      { id: 's119', word: 'কৃষক', synonym: 'চাষি' },
      { id: 's120', word: 'মৎস্যজীবী', synonym: 'জেলে' }
    ]
  },
  {
    id: 'syn_l_7',
    level: 7,
    title: 'লেভেল ৭ (পেশা ও সামাজিক আদর)',
    color: 'from-yellow-500 via-amber-500 to-orange-600',
    borderColor: 'hover:border-amber-500/30 shadow-amber-950/20 text-amber-400',
    words: [
      { id: 's121', word: 'কুমোর', synonym: 'মৃৎশিল্পী' },
      { id: 's122', word: 'ناপিত', synonym: 'ক্ষৌরকার' },
      { id: 's123', word: 'ধোপা', synonym: 'কাপড়ধোয়া কর্মী' },
      { id: 's124', word: 'মুচি', synonym: 'জুতাসাজ' },
      { id: 's125', word: 'স্বর্ণকার', synonym: 'গয়নাশিল্পী' },
      { id: 's126', word: 'কামার', synonym: 'লোহার কারিগর' },
      { id: 's127', word: 'ছুতার', synonym: 'কাঠমিস্ত্রি' },
      { id: 's128', word: 'রন্ধন', synonym: 'রান্না' },
      { id: 's129', word: 'পাকশালা', synonym: 'রান্নাঘর' },
      { id: 's130', word: 'অতিথি', synonym: 'মেহমান' },
      { id: 's131', word: 'মেহমান', synonym: 'অতিথি' },
      { id: 's132', word: 'আতিথ্য', synonym: 'আপ্যায়ন' },
      { id: 's133', word: 'আপ্যায়ন', synonym: 'আদর' },
      { id: 's134', word: 'উপহার', synonym: 'উপঢৌকন' },
      { id: 's135', word: 'উপঢৌকন', synonym: 'উপহার' },
      { id: 's136', word: 'দান', synonym: 'দেওয়া' },
      { id: 's137', word: 'ভিক্ষা', synonym: 'চাওয়া' },
      { id: 's138', word: 'ধন', synonym: 'সম্পদ' },
      { id: 's139', word: 'সম্পদ', synonym: 'ধন' },
      { id: 's140', word: 'বিত্ত', synonym: 'সম্পদ' }
    ]
  },
  {
    id: 'syn_l_8',
    level: 8,
    title: 'লেভেল ৮ (গুণাবলী ও পরিমাপ)',
    color: 'from-teal-500 via-sky-500 to-indigo-600',
    borderColor: 'hover:border-sky-500/30 shadow-sky-950/20 text-sky-400',
    words: [
      { id: 's141', word: 'দারিদ্র্য', synonym: 'গরিবি' },
      { id: 's142', word: 'দীন', synonym: 'গরিব' },
      { id: 's143', word: 'দরিদ্র', synonym: 'গরিব' },
      { id: 's144', word: 'ধনী', synonym: 'বিত্তবান' },
      { id: 's145', word: 'বিত্তবান', synonym: 'ধনী' },
      { id: 's146', word: 'সুন্দর', synonym: 'মনোরম' },
      { id: 's147', word: 'মনোরম', synonym: 'সুন্দর' },
      { id: 's148', word: 'সুশ্রী', synonym: 'সুন্দর' },
      { id: 's149', word: 'কুৎসিত', synonym: 'বিশ্রী' },
      { id: 's150', word: 'বিশ্রী', synonym: 'কুৎসিত' },
      { id: 's151', word: 'বৃহৎ', synonym: 'বড়' },
      { id: 's152', word: 'বিশাল', synonym: 'বড়' },
      { id: 's153', word: 'ক্ষুদ্র', synonym: 'ছোট' },
      { id: 's154', word: 'লঘু', synonym: 'হালকা' },
      { id: 's155', word: 'গুরু', synonym: 'ভারী' },
      { id: 's156', word: 'ভারী', synonym: 'ওজনদার' },
      { id: 's157', word: 'দ্রুত', synonym: 'তাড়াতাড়ি' },
      { id: 's158', word: 'শীঘ্র', synonym: 'দ্রুত' },
      { id: 's159', word: 'ধীর', synonym: 'আস্তে' },
      { id: 's160', word: 'মন্থর', synonym: 'ধীর' }
    ]
  },
  {
    id: 'syn_l_9',
    level: 9,
    title: 'লেভেল ৯ (গতি ও পথ)',
    color: 'from-fuchsia-500 via-rose-500 to-red-600',
    borderColor: 'hover:border-rose-500/30 shadow-rose-950/20 text-rose-400',
    words: [
      { id: 's161', word: 'উচ্চ', synonym: 'উঁচু' },
      { id: 's162', word: 'निम्ন', synonym: 'নিচু' },
      { id: 's163', word: 'প্রশস্ত', synonym: 'চওড়া' },
      { id: 's164', word: 'সংকীর্ণ', synonym: 'সরু' },
      { id: 's165', word: 'নিকট', synonym: 'কাছে' },
      { id: 's166', word: 'দূর', synonym: 'অনেক দূরে' },
      { id: 's167', word: 'সমীপ', synonym: 'কাছে' },
      { id: 's168', word: 'অন্তর', synonym: 'দূরত্ব' },
      { id: 's169', word: 'পথ', synonym: 'রাস্তা' },
      { id: 's170', word: 'সড়ক', synonym: 'রাস্তা' },
      { id: 's171', word: 'মার্গ', synonym: 'পথ' },
      { id: 's172', word: 'যাত্রা', synonym: 'ভ্রমণ' },
      { id: 's173', word: 'গমন', synonym: 'যাওয়া' },
      { id: 's174', word: 'আগমন', synonym: 'আসা' },
      { id: 's175', word: 'প্রস্থান', synonym: 'বিদায়' },
      { id: 's176', word: 'প্রবেশ', synonym: 'ঢোকা' },
      { id: 's177', word: 'বহির্গমন', synonym: 'বের হওয়া' },
      { id: 's178', word: 'দর্শন', synonym: 'দেখা' },
      { id: 's179', word: 'শ্রবণ', synonym: 'শোনা' },
      { id: 's180', word: 'বচন', synonym: 'কথা' }
    ]
  },
  {
    id: 'syn_l_10',
    level: 10,
    title: 'লেভেল ১০ (বার্তা ও শিল্পকলা)',
    color: 'from-violet-600 via-indigo-600 to-blue-700',
    borderColor: 'hover:border-indigo-500/30 shadow-indigo-950/20 text-indigo-400',
    words: [
      { id: 's181', word: 'উক্তি', synonym: 'কথা' },
      { id: 's182', word: 'বাণী', synonym: 'কথা' },
      { id: 's183', word: 'প্রশ্ন', synonym: 'জিজ্ঞাসা' },
      { id: 's184', word: 'উত্তর', synonym: 'জবাব' },
      { id: 's185', word: 'জবাব', synonym: 'উত্তর' },
      { id: 's186', word: 'সংবাদ', synonym: 'খবর' },
      { id: 's187', word: 'বার্তা', synonym: 'খবর' },
      { id: 's188', word: 'পত্র', synonym: 'চিঠি' },
      { id: 's189', word: 'পত্রিকা', synonym: 'খবরের কাগজ' },
      { id: 's190', word: 'গ্রন্থ', synonym: 'বই' },
      { id: 's191', word: 'রচনা', synonym: 'লেখা' },
      { id: 's192', word: 'লিপি', synonym: 'লেখা' },
      { id: 's193', word: 'চিত্র', synonym: 'ছবি' },
      { id: 's194', word: 'প্রতিচ্ছবি', synonym: 'ছবি' },
      { id: 's195', word: 'মূর্তি', synonym: 'ভাস্কর্য' },
      { id: 's196', word: 'সঙ্গীত', synonym: 'গান' },
      { id: 's197', word: 'নৃত্য', synonym: 'নাচ' },
      { id: 's198', word: 'ক্রীড়া', synonym: 'খেলা' },
      { id: 's199', word: 'পুরস্কার', synonym: 'বকশিস' },
      { id: 's200', word: 'শাস্তি', synonym: 'দণ্ড' }
    ]
  }
];




