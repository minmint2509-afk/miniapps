"use client";

import { useState } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 font-sans selection:bg-amber-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-amber-600">
            SOLARIS<span className="text-stone-800">SKIN</span>
          </span>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-amber-600 transition-colors">คุณสมบัติ</a>
            <a href="#product" className="hover:text-amber-600 transition-colors">สินค้า</a>
            <a href="#reviews" className="hover:text-amber-600 transition-colors">รีวิวผู้ใช้จริง</a>
          </nav>
          
          {/* ปุ่มตะกร้าสินค้าแบบอัปเดตตัวเลขตามการกด */}
          <button className="relative bg-stone-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors shadow-sm active:scale-95">
            ตะกร้าสินค้า ({cartCount})
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6">
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
              ☀️ SPF50+ PA++++ Broad Spectrum
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-stone-900">
              ปกป้องผิวผิวกาย <br />
              <span className="text-amber-500">เบาสบาย...</span> ไม่เหนียวเหนอะหนะ
            </h1>
            <p className="text-stone-600 text-lg max-w-md leading-relaxed">
              เซรั่มกันแดดทาตัวเนื้อน้ำ ซึมไวภายใน 5 วินาที ไม่ติดขน ไม่ทิ้งคราบขาว พร้อมบำรุงผิวให้กระจ่างใสยาวนานตลอดวัน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* เปลี่ยนเป็นปุ่มกดเพิ่มลงตะกร้า */}
              <button
                onClick={addToCart}
                className="flex items-center justify-center bg-amber-500 text-white font-medium h-12 px-8 rounded-full hover:bg-amber-600 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                เพิ่มลงตะกร้า — ฿490
              </button>
              <a
                href="#features"
                className="flex items-center justify-center border border-stone-300 text-stone-700 font-medium h-12 px-6 rounded-full hover:bg-white transition-all"
              >
                ดูส่วนผสม
              </a>
            </div>
          </div>

          {/* Product Highlight Image */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-amber-200/50 rounded-full blur-3xl -z-10" />
            <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-amber-100 to-amber-50 rounded-3xl p-8 border border-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-48 h-64 bg-amber-400/20 rounded-2xl border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-700 font-medium text-sm text-center p-4">
                [ วางรูปขวดครีมกันแดดที่นี่ ]
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
