"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
};

const initialProducts: Product[] = [
    { id: "p001", name: "Mechanical Keyboard", price: 2590, description: "คีย์บอร์ด Mechanical สำหรับทำงานและเล่นเกม" },
    { id: "p002", name: "Wireless Mouse", price: 1290, description: "เมาส์ไร้สาย น้ำหนักเบา" },
    { id: "p003", name: "USB-C Hub", price: 1890, description: "USB-C Hub พร้อม HDMI และ Card Reader" },
];

export default function ProductExplorer() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(id: string) {
        if (confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?")) {
            setProducts(products.filter((item) => item.id !== id));
            if (selectedProduct?.id === id) setSelectedProduct(null);
        }
    }

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <div>
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", margin: 0 }}>📦 รายการสินค้า</h1>
                    <p style={{ fontSize: "14px", color: "#64748b", margin: "8px 0 0 0" }}>จัดการและดูข้อมูลสินค้าทั้งหมดในระบบ โทนขาว-น้ำเงิน</p>
                </div>
                <input 
                    type="text" 
                    placeholder="ค้นหาสินค้า..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", width: "240px", fontSize: "14px" }}
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {filteredProducts.map((item) => (
                    <div
                        key={item.id}
                        style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                    >
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", margin: 0 }}>{item.name}</h3>
                                <span style={{ padding: "4px 10px", backgroundColor: "#eff6ff", fontSize: "12px", fontWeight: "600", color: "#2563eb", borderRadius: "9999px" }}>
                                    {item.id}
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.5" }}>{item.description}</p>
                            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", margin: "0 0 16px 0" }}>฿{item.price.toLocaleString()}</p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                            <button
                                type="button"
                                onClick={() => setSelectedProduct(item)}
                                style={{ padding: "8px", fontSize: "12px", fontWeight: "500", color: "#1e293b", backgroundColor: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer" }}
                            >
                                🔍 ดูรายละเอียด
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                style={{ padding: "8px", fontSize: "12px", fontWeight: "500", color: "#dc2626", backgroundColor: "#fef2f2", border: "none", borderRadius: "8px", cursor: "pointer" }}
                            >
                                🗑️ ลบสินค้า
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 50 }}>
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "400px", width: "100%", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
                        <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginTop: 0 }}>รายละเอียดสินค้า</h2>
                        <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a", margin: "12px 0 8px 0" }}>{selectedProduct.name}</h3>
                        <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 12px 0" }}>{selectedProduct.description}</p>
                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#2563eb", margin: "0 0 20px 0" }}>฿{selectedProduct.price.toLocaleString()}</p>
                        <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            style={{ width: "100%", padding: "10px", backgroundColor: "#1e293b", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
                        >
                            ปิดหน้าต่าง
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}