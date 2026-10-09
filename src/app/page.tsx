import Link from "next/link";
import { auth } from "../auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "../components/auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = !!session?.user;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 text-slate-900 pb-16">
      {/* Top Header Navigation Bar */}
      <nav className="bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20">
              📦
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Product Manager</h1>
              <p className="text-xs text-slate-500 font-medium">ระบบจัดการและคลังข้อมูลสินค้าออนไลน์</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Statistics / Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase">
              Dashboard Overview
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">รายการสินค้าทั้งหมดในระบบ</h2>
            <p className="text-blue-100 text-sm max-w-xl">
              จัดการ ตรวจสอบ ข้อมูลรายละเอียดสินค้า รูปภาพ ราคา และสถานะสต็อกสินค้าของคุณได้อย่างสะดวกและรวดเร็ว
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[140px]">
            <span className="block text-3xl font-extrabold">{products.length}</span>
            <span className="text-xs text-blue-100 font-medium">รายการทั้งหมด</span>
          </div>
        </div>

        {/* Product Cards Grid with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const sampleImages = [
              "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
            ];
            const imageUrl = (product as any).imageUrl || sampleImages[index % sampleImages.length];

            return (
              <article
                key={product.id}
                data-testid="product"
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image Container */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-slate-700 font-mono text-xs font-semibold rounded-lg shadow-xs">
                        {product.id}
                      </span>
                      <span className="px-2.5 py-1 bg-blue-600/90 backdrop-blur-xs text-white text-xs font-semibold rounded-lg shadow-xs">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description || "ไม่มีรายละเอียดสินค้า"}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">คงเหลือ: {product.stock} ชิ้น</span>
                      <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
                        ฿{product.price.toLocaleString("th-TH")}
                      </span>
                    </div>
                  </div>
                </div>

                {isLoggedIn && (
                  <div className="grid grid-cols-2 gap-3 px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="py-2.5 px-4 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      ✏️ แก้ไขข้อมูล
                    </Link>
                    <Link
                      href={`/products/${product.id}/delete`}
                      className="py-2.5 px-4 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      🗑️ ลบสินค้า
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="text-4xl">📭</div>
            <p className="text-slate-600 font-medium text-base">ไม่พบข้อมูลสินค้าในระบบ</p>
            <p className="text-slate-400 text-xs">กรุณาเพิ่มสินค้าใหม่เพื่อเริ่มต้นใช้งาน</p>
          </div>
        )}
      </div>
    </main>
  );
}