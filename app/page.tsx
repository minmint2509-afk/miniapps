"use client";

import { useState } from "react";

// สร้าง SVG Image Data URL สำหรับแสดงรูปผลิตภัณฑ์สวยๆ แบบไม่พึ่งเซิร์ฟเวอร์ภายนอก
const createProductImage = (title: string, color1: string, color2: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#g)" />
    <circle cx="400" cy="360" r="140" fill="#ffffff" opacity="0.2" />
    <rect x="330" y="200" width="140" height="320" rx="30" fill="#ffffff" opacity="0.9" />
    <rect x="360" y="160" width="80" height="40" rx="8" fill="#d97706" />
    <text x="400" y="370" font-family="sans-serif" font-size="28" font-weight="bold" fill="#78350f" text-anchor="middle">SOLARIS</text>
    <text x="400" y="600" font-family="sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">${title}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const PRODUCTS = [
  {
    id: 1,
    name: "Solaris Royal Body Elixir SPF50+",
    category: "ผิวกาย",
    price: 1290,
    originalPrice: 1590,
    rating: "4.95",
    reviews: 128,
    image: createProductImage("BODY ELIXIR", "#fef3c7", "#f59e0b"),
    description: "เซรั่มกันแดดเนื้อสัมผัสซิลค์บางเบา ซึมซาบสู่ผิวทันที ปกป้องและฟื้นฟูด้วยสารสกัดเข้มข้น",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Solaris Golden Aura Face Fluid SPF50+",
    category: "ผิวหน้า",
    price: 1490,
    originalPrice: 1890,
    rating: "4.98",
    reviews: 240,
    image: createProductImage("FACE FLUID", "#ffedd5", "#ea580c"),
    description: "กันแดดผิวหน้าสูตรพรีเมียม คุมมันยาวนาน 16 ชม. มอบลุคงานผิวเนียนบางเบาสไตล์ Glass Skin",
    badge: "Award Winner",
  },
  {
    id: 3,
    name: "Solaris Velvet Touch Sun Oil SPF30",
    category: "ออยล์บำรุง",
    price: 1690,
    originalPrice: 1990,
    rating: "4.90",
    reviews: 89,
    image: createProductImage("SUN OIL", "#fef9c3", "#ca8a04"),
    description: "ออยล์กันแดดฉ่ำวาวเนียนนุ่ม มอบประกายออร่าสีทองเปล่งประกาย พร้อมสารบำรุงต้านริ้วรอย",
    badge: "Exclusive",
  },
  {
    id: 4,
    name: "Solaris Radiance Repairing Gel",
    category: "ฟื้นฟูผิว",
    price: 990,
    originalPrice: 1250,
    rating: "4.88",
    reviews: 156,
    image: createProductImage("REPAIR GEL", "#e0f2fe", "#0284c7"),
    description: "เจลฟื้นฟูผิวหลังออกแดด อุดมด้วยไฮยา 8 โมเลกุล คืนความชุ่มชื้นล้ำลึก สดชื่นทันทีที่สัมผัส",
    badge: "New Arrival",
  },
  {
    id: 5,
    name: "Solaris Micro-Mist Shield SPF50+",
    category: "สเปรย์",
    price: 1190,
    originalPrice: 1390,
    rating: "4.85",
    reviews: 74,
    image: createProductImage("SUN MIST", "#fae8ff", "#c084fc"),
    description: "ละอองสเปรย์ความละเอียดระดับไมครอน ฉีดทับเมคอัพได้โดยไม่เป็นคราบ ล็อคความชุ่มชื้นตลอดวัน",
    badge: "",
  },
  {
    id: 6,
    name: "Solaris Nourishing Lip Therapy SPF30",
    category: "ริมฝีปาก",
    price: 690,
    originalPrice: 850,
    rating: "4.92",
    reviews: 310,
    image: createProductImage("LIP BALM", "#ffe4e6", "#e11d48"),
    description: "ทรีทเมนท์ลิปบาล์มเติมเต็มความเรียบเนียน ป้องกันริมฝีปากหมองคล้ำจากแสงแดด ผสานวิตามินอีเข้มข้น",
    badge: "Must Have",
  },
];

const CATEGORIES = ["ทั้งหมด", "ผิวหน้า", "ผิวกาย", "ออยล์บำรุง", "ฟื้นฟูผิว", "สเปรย์", "ริมฝีปาก"];

export default function Home() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const filteredProducts = selectedCategory === "ทั้งหมด" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-amber-100 relative pb-24">
      <div className="bg-stone-900 text-amber-200 text-xs py-2 text-center font-light tracking-widest uppercase">
        ✨ สั่งซื้อวันนี้ รับฟรีทันที Special Edition Travel Pouch สำหรับทุกยอดสั่งซื้อ ฿2,000 ขึ้นไป
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf8f5]/90 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-serif tracking-widest text-stone-900 font-extrabold uppercase">
              SOLARIS<span className="text-amber-600 font-sans font-light text-xl">| SKIN</span>
            </span>
            <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-widest text-stone-600 uppercase">
              <a href="#hero" className="hover:text-amber-600 transition-colors">คอลเลกชันใหม่</a>
              <a href="#products" className="hover:text-amber-600 transition-colors">ผลิตภัณฑ์ทั้งหมด</a>
            </nav>
          </div>
          
          <button 
            onClick={() => setIsOpenCart(true)}
            className="relative border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full flex items-center gap-3 cursor-pointer"
          >
            <span>กระเป๋าช้อปปิ้ง</span>
            <span className="bg-amber-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {totalCartCount}
            </span>
          </button>
        </div>
      </header>

      {isOpenCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-stone-100">
                <h2 className="text-base font-serif font-bold uppercase tracking-wider text-stone-900">
                  รายการสินค้าในตะกร้า ({totalCartCount})
                </h2>
                <button 
                  onClick={() => setIsOpenCart(false)}
                  className="text-stone-400 hover:text-stone-900 text-lg font-light p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-240px)] divide-y divide-stone-100">
                {totalCartCount === 0 ? (
                  <div className="text-center py-20 text-stone-400">
                    <p className="font-serif italic text-lg mb-2">ตะกร้าสินค้าว่างเปล่า</p>
                    <p className="text-xs tracking-wider">เลือกผลิตภัณฑ์เพื่อเริ่มประสบการณ์การดูแลผิวระดับพรีเมียม</p>
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = PRODUCTS.find((p) => p.id === Number(id));
                    if (!item) return null;
                    return (
                      <div key={item.id} className="py-5 flex gap-5 items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-xl border border-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-sm font-semibold text-stone-900 truncate">{item.name}</h3>
                          <p className="text-amber-700 font-semibold text-sm mt-1">฿{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3 border border-stone-200 rounded-full px-3 py-1 bg-stone-50">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-stone-900 font-semibold cursor-pointer text-sm"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{qty}</span>
                          <button 
                            onClick={() => addToCart(item.id)}
                            className="text-stone-400 hover:text-stone-900 font-semibold cursor-pointer text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 bg-white space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">ราคารวมสุทธิ</span>
                <span className="text-2xl font-serif font-bold text-stone-900">฿{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                disabled={totalCartCount === 0}
                className={`w-full py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all ${
                  totalCartCount > 0 
                    ? "bg-stone-900 text-white hover:bg-amber-600 shadow-xl cursor-pointer" 
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-8 space-y-28">
        <section id="hero" className="py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-amber-600"></span>
              <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">
                The Ultimate Protection
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight text-stone-900">
              สัมผัสความหรูหราแห่งการปกป้อง <br />
              <span className="italic font-normal text-amber-600">อย่างเป็นธรรมชาติ</span>
            </h1>
            
            <p className="text-stone-600 text-base max-w-md leading-relaxed font-light">
              นวัตกรรมกันแดดระดับไฮเอนด์ ผสานสารบำรุงเข้มข้น เนื้อสัมผัสบางเบา มอบผิวสวยเปี่ยมออร่า ท้าแดดตลอดช่วงเวลาของคุณ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-2">
              <button
                onClick={() => addToCart(PRODUCTS[0].id)}
                className="bg-stone-900 text-white font-semibold text-xs tracking-widest uppercase h-14 px-10 rounded-full hover:bg-amber-600 transition-all shadow-xl cursor-pointer"
              >
                สั่งซื้อเลย — ฿{PRODUCTS[0].price.toLocaleString()}
              </button>
              <a
                href="#products"
                className="flex items-center justify-center border border-stone-300 text-stone-800 font-semibold text-xs tracking-widest uppercase h-14 px-8 rounded-full hover:border-stone-900 transition-all"
              >
                สำรวจคอลเลกชัน
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10" />
            <div className="relative w-full max-w-md aspect-3/4 rounded-2xl p-3 bg-white shadow-2xl border border-stone-100 group overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={PRODUCTS[0].image} 
                alt="Solaris Luxury Product" 
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/80 rounded-xl border border-white/50 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Signature Item</p>
                  <p className="text-sm font-serif font-bold text-stone-900">{PRODUCTS[0].name}</p>
                </div>
                <span className="text-xs font-bold bg-amber-600 text-white px-3 py-1 rounded-full">⭐ {PRODUCTS[0].rating}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">OUR COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              ผลิตภัณฑ์ดูแลผิวทรงประสิทธิภาพ
            </h2>
            <div className="w-12 h-0.5 bg-amber-600 mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-stone-900 text-white shadow-lg"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full aspect-square bg-stone-50 rounded-xl overflow-hidden mb-6 relative">
                    {product.badge && (
                      <span className="absolute top-4 left-4 z-10 bg-stone-900 text-amber-200 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs font-bold text-stone-500">
                      ★ {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-xs mb-6 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                  <div>
                    <span className="text-xs text-stone-400 line-through block">฿{product.originalPrice}</span>
                    <span className="text-xl font-serif font-bold text-stone-900">฿{product.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    + ใส่ตะกร้า
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
