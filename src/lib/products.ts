import { z } from "zod";

export type Product = {
    id: string;
    title: string;
    price: number;
    stock: number;
    category: string;
    description?: string;
};

export type ProductDraft = {
    title: string;
    price: number;
    stock: number;
    category: string;
    description?: string;
};

export type ProductList = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export const CATEGORIES = [
    "Electronics",
    "Accessories",
    "Computer",
] as const;

export const SORT_FIELDS = [
    { label: "ชื่อสินค้า", value: "title" },
    { label: "ราคา", value: "price" },
] as const;

export const SearchQuerySchema = z.object({
    q: z.string().optional(),
    keyword: z.string().optional(),
    limit: z.number().optional(),
    sortBy: z.string().optional(),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const defaultQuery: SearchQuery = {
    q: "",
    keyword: "",
    limit: 10,
    sortBy: "title",
};

export const ProductDraftSchema = z.object({
    title: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
    price: z.number().min(0, "ราคาต้องไม่ต่ำกว่า 0"),
    stock: z.number().min(0, "จำนวนต้องไม่ต่ำกว่า 0"),
    category: z.string().min(1, "กรุณาเลือกหมวดหมู่"),
    description: z.string().optional(),
});

const initialProducts: Product[] = [
    {
        id: "p001",
        title: "Mechanical Keyboard",
        price: 2590,
        stock: 10,
        category: "Accessories",
        description: "คีย์บอร์ด Mechanical สำหรับทำงานและเล่นเกม",
    },
    {
        id: "p002",
        title: "Wireless Mouse",
        price: 1290,
        stock: 15,
        category: "Accessories",
        description: "เมาส์ไร้สาย น้ำหนักเบา",
    },
    {
        id: "p003",
        title: "USB-C Hub",
        price: 1890,
        stock: 8,
        category: "Computer",
        description: "USB-C Hub พร้อม HDMI และ Card Reader",
    },
];

declare global {
    // eslint-disable-next-line no-var
    var demoProducts: Product[] | undefined;
}

const products =
    globalThis.demoProducts ??
    structuredClone(initialProducts);

if (process.env.NODE_ENV !== "production") {
    globalThis.demoProducts = products;
}

export function getProducts() {
    return products;
}

export function getProduct(id: string) {
    return products.find((product) => product.id === id);
}

export async function fetchProducts(query: SearchQuery): Promise<ProductList> {
    let filtered = [...products];
    const searchTerm = query.q || query.keyword;
    if (searchTerm) {
        const kw = searchTerm.toLowerCase();
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(kw));
    }
    
    const limit = query.limit || filtered.length;
    const limitedProducts = filtered.slice(0, limit);

    return {
        products: limitedProducts,
        total: filtered.length,
        skip: 0,
        limit: limit,
    };
}

export function addProduct(values: ProductDraft): Product {
    const newProduct: Product = {
        id: "p" + Date.now(),
        ...values,
    };
    products.push(newProduct);
    return newProduct;
}

export function updateProduct(
    id: string,
    values: ProductDraft,
) {
    const product = getProduct(id);
    if (!product) {
        throw new Error("Product not found");
    }
    product.title = values.title;
    product.price = values.price;
    product.stock = values.stock;
    product.category = values.category;
    product.description = values.description;
}

export function deleteProduct(id: string) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        throw new Error("Product not found");
    }
    products.splice(index, 1);
}