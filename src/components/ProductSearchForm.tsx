"use client";

import { useState } from "react";
import { SORT_FIELDS, type SearchQuery } from "@/lib/products";

type ProductSearchFormProps = {
    onSearch: (query: SearchQuery) => Promise<void>;
};

export default function ProductSearchForm({ onSearch }: ProductSearchFormProps) {
    const [q, setQ] = useState("");
    const [limit, setLimit] = useState<number>(10);
    const [sortBy, setSortBy] = useState("title");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSearch({ q, keyword: q, limit, sortBy });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
            <div className="flex flex-col gap-1.5">
                <label htmlFor="q" className="text-xs font-semibold text-slate-600">คำค้น</label>
                <input
                    id="q"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="ค้นหาชื่อสินค้า..."
                    className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="limit" className="text-xs font-semibold text-slate-600">จำนวนรายการ</label>
                <input
                    id="limit"
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="sortBy" className="text-xs font-semibold text-slate-600">เรียงตาม</label>
                <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50/50 cursor-pointer"
                >
                    {SORT_FIELDS.map((field) => (
                        <option key={field.value} value={field.value}>{field.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                    {isSubmitting ? "กำลังค้นหา..." : "ค้นหา"}
                </button>
            </div>
        </form>
    );
}