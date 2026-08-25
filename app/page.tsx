"use client";

import { useState } from "react";

// 1. เพิ่มรายการสินค้าหลายๆ ชิ้นพร้อมลิงก์รูปภาพ
const PRODUCTS = [
  {
    id: 1,
    name: "Solaris Daily Body Serum SPF50+",
    category: "กันแดดผิวกาย",
    price: 490,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1608248597263-00079e95906a?w=600&q=80",
    description: "เซรั่มกันแดดเนื้อน้ำ ซึมไวภายใน 5 วินาที ไม่เหนียวเหนอะหนะ",
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Solaris Invisible Face Fluid SPF50+",
    category: "กันแดดผิวหน้า",
    price: 590,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    description: "สูตรคุมมันยาวนาน 12 ชม. ไม่เยิ้มระหว่างวัน ไม่ทิ้งคราบขาว",
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Solaris After Sun Soothing Gel",
    category: "ฟื้นฟูผิวหลังออกแดด",
    price: 350,
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    description: "เจลว่านหางจระเข้เข้มข้น ปลอบประโลมและลดความร้อนสะสมบนผิว",
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Solaris Glowing Sun Oil SPF30",
    category: "ออยล์กันแดดผิวฉ่ำ",
    price: 650,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&q=80",
    description: "เพิ่มความโกลว์ให้ผิวฉ่ำวาว กันน้ำ กันเหงื่อ เหมาะกับไปทะเล",
    isBestSeller: false,
  },
  {
    id: 5,
    name: "Solaris Refreshing Sun Mist SPF50+",
    category: "สเปรย์กันแดด",
    price: 420,
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    description: "สเปรย์ฉีดทับเมคอัพได้ ละอองละเอียดบางเบา พกพาสะดวก",
    isBestSeller: false,
  },
  {
    id: 6,
    name: "Solaris Lip Protection Balm SPF30",
    category: "บำรุงริมฝีปาก",
    price: 220,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&q=80",
    description: "ลิปบาล์มกันแดด แก้ปากดำคล้ำ เติมความชุ่มชื้นยาวนาน",
    isBestSeller: false,
  },
];

export default function Home() {
  const [cart, setCart] = useState({});
  const [isOpenCart, setIsOpenCart] = useState(false);

  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
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
    <div className="min-h-screen bg-amber-50/30 text-stone-800 font-sans selection:bg-amber-200 relative pb-20">
      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-stone-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-tight text-amber-600">
            SOLARIS<span className="text-stone-800">SKIN</span>
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#hero" className="hover:text-amber-600 transition-colors">หน้าแรก</a>
            <a href="#products" className="hover:text-amber-600 transition-colors">สินค้าทั้งหมด</a>
          </nav>
          
          <button 
            onClick={() => setIsOpenCart(true)}
            className="relative bg-stone-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors shadow-sm active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>ตะกร้าสินค้า</span>
            <span className="bg-amber-500 text-stone-900 font-bold px-2 py-0.5 rounded-full text-xs">
              {totalCartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Pop-up Cart Drawer */}
      {isOpenCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                <h2 className="text-lg font-bold text-stone-900">
                  ตะกร้าสินค้าของคุณ ({totalCartCount})
                </h2>
                <button 
                  onClick={() => setIsOpenCart(false)}
                  className="text-stone-400 hover:text-stone-800 text-xl font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-220px)] divide-y divide-stone-100">
                {totalCartCount === 0 ? (
                  <div className="text-center py-16 text-stone-400">
                    <p className="text-4xl mb-3">🛒</p>
                    <p className="font-medium">ไม่มีสินค้าในตะกร้า</p>
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = PRODUCTS.find((p) => p.id === Number(id));
                    if (!item) return null;
                    return (
                      <div key={item.id} className="py-4 flex gap-4 items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-xl bg-amber-50 border border-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-stone-900 text-sm truncate">{item.name}</h3>
                          <p className="text-amber-600 font-bold text-sm mt-0.5">฿{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 border border-stone-200 rounded-lg px-2 py-1 bg-stone-50">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="px-1 text-stone-500 hover:text-stone-900 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                          <button 
                            onClick={() => addToCart(item.id)}
                            className="px-1 text-stone-500 hover:text-stone-900 font-bold cursor-pointer"
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

            <div className="pt-4 border-t border-stone-100 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-600">ราคารวมทั้งหมด</span>
                <span className="text-2xl font-black text-amber-600">฿{totalPrice.toLocaleString()}</span>
              </div>
              <button 
                disabled={totalCartCount === 0}
                className={`w-full py-3.5 rounded-full font-bold transition-all ${
                  totalCartCount > 0 
                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25 cursor-pointer active:scale-98" 
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                }`}
              >
                สั่งซื้อสินค้า
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 space-y-24">
        {/* Hero Section (ใส่รูปจริงแทนช่องสี่เหลี่ยมสีเหลือง) */}
        <section id="hero" className="py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6">
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
              ☀️ SPF50+ PA++++ Broad Spectrum
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-stone-900">
              ปกป้องผิวผิวกาย <br />
              <span className="text-amber-500">เบาสบาย...</span> ไม่เหนียวเหนอะหนะ
            </h1>
            <p className="text-stone-600 text-lg max-w-md leading-relaxed">
              เซรั่มกันแดดเนื้อน้ำ ซึมไวภายใน 5 วินาที ไม่ติดขน ไม่ทิ้งคราบขาว พร้อมบำรุงผิวให้กระจ่างใสยาวนานตลอดวัน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => addToCart(PRODUCTS[0].id)}
                className="flex items-center justify-center bg-amber-500 text-white font-semibold h-12 px-8 rounded-full hover:bg-amber-600 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                เพิ่มลงตะกร้า — ฿{PRODUCTS[0].price}
              </button>
              <a
                href="#products"
                className="flex items-center justify-center border border-stone-300 text-stone-700 font-semibold h-12 px-6 rounded-full hover:bg-white transition-all"
              >
                ดูสินค้าทั้งหมด
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-amber-300/40 rounded-full blur-3xl -z-10" />
            <div className="relative w-full max-w-sm aspect-4/5 bg-white rounded-3xl p-4 shadow-2xl border border-amber-100/50 flex flex-col items-center justify-center overflow-hidden group">
              <img 
                src={PRODUCTS[0].image} 
                alt="Solaris Main Product" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* 2. ส่วนแสดงรายการสินค้าแบบ Grid (เพิ่มเข้ามาใหม่) */}
        <section id="products" className="scroll-mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-stone-900 mb-3">
              สินค้าทั้งหมดของเรา
            </h2>
            <p className="text-stone-600">
              เลือกลิขสิทธิ์การดูแลและปกป้องผิวที่เหมาะกับไลฟ์สไตล์ของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {product.isBestSeller && (
                  <span className="absolute top-8 left-8 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    ขายดี 🔥
                  </span>
                )}
                
                <div>
                  <div className="w-full aspect-square bg-stone-100 rounded-2xl overflow-hidden mb-5 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                      {product.category}
                    </span>
                    <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
                      ⭐ {product.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-lg mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div>
                    <span className="text-xs text-stone-400 block">ราคา</span>
                    <span className="text-xl font-extrabold text-stone-900">฿{product.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-stone-900 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>+ เพิ่มลงตะกร้า</span>
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
