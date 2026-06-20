// In development: Vite proxies /api/yunora → localhost:8080 (our API server proxy)
// In production (Firebase): calls go directly to the Yunora backend with auth handled server-side
const PROXY_BASE = "/api/yunora";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${PROXY_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${PROXY_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error || `API error ${res.status}`);
  }
  return res.json();
}

export type ApiProduct = {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  salePrice?: number;
  stock: number;
  color?: string;
  material?: string;
  description?: string;
  imageUrl?: string;
  categoryId?: number;
  createdAt: string;
};

export type ApiProductsResponse = {
  items: ApiProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  imageUrl?: string;
};

export type ApiBanner = {
  id: number;
  title: string;
  imageUrl?: string;
  linkUrl?: string;
  type: string;
  priority: number;
  startsAt?: string;
  expiresAt?: string;
};

export type ApiOffer = {
  id: number;
  text: string;
  priority: number;
  startsAt?: string;
  expiresAt?: string;
};

export type ApiCampaign = {
  id: number;
  name: string;
  type: string;
  description?: string;
  startsAt?: string;
  endsAt?: string;
};

export type ApiDealer = {
  id: number;
  businessName: string;
  contactName: string;
  phone: string;
  city: string;
};

export type ApiReview = {
  id: number;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ApiReviewsResponse = {
  items: ApiReview[];
  total: number;
  page: number;
  totalPages: number;
};

export type ApiBlog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
};

export type ApiBlogsResponse = {
  items: ApiBlog[];
  total: number;
  page: number;
  totalPages: number;
};

export type ApiHomepageSection = {
  id: number;
  sectionType: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  linkUrl?: string;
  buttonText?: string;
  sortOrder: number;
};

export type ApiSiteSettings = {
  siteName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  pinterest?: string;
  googleMapsEmbed?: string;
};

export type ApiInventory = {
  productId: number;
  totalStock: number;
  warehouses: { warehouseId: number; stock: number; lowStockThreshold: number }[];
};

export type ApiOrderTracking = {
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  timeline: { status: string; label: string; completed: boolean; active: boolean }[];
};

export const api = {
  products: (params?: { search?: string; page?: number; limit?: number; category?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.category) q.set("category", String(params.category));
    return get<ApiProductsResponse>(`/api/public/products${q.toString() ? `?${q}` : ""}`);
  },
  product: (id: number) => get<ApiProduct>(`/api/public/products/${id}`),
  categories: () => get<ApiCategory[]>("/api/public/categories"),
  banners: (type?: string) => get<ApiBanner[]>(`/api/public/banners${type ? `?type=${type}` : ""}`),
  offers: () => get<ApiOffer[]>("/api/public/offers"),
  campaigns: () => get<ApiCampaign[]>("/api/public/campaigns"),
  dealers: (city?: string) => get<ApiDealer[]>(`/api/public/dealers${city ? `?city=${encodeURIComponent(city)}` : ""}`),
  reviews: (params?: { productName?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.productName) q.set("productName", params.productName);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    return get<ApiReviewsResponse>(`/api/public/reviews${q.toString() ? `?${q}` : ""}`);
  },
  blogs: (params?: { category?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    return get<ApiBlogsResponse>(`/api/public/blogs${q.toString() ? `?${q}` : ""}`);
  },
  blog: (slug: string) => get<ApiBlog>(`/api/public/blogs/${slug}`),
  homepageSections: () => get<ApiHomepageSection[]>("/api/public/homepage-sections"),
  siteSettings: () => get<ApiSiteSettings>("/api/public/site-settings"),
  inventory: (productId: number) => get<ApiInventory>(`/api/public/inventory/${productId}`),
  trackOrder: (orderNumber: string) => get<ApiOrderTracking>(`/api/public/orders/${orderNumber}`),

  placeOrder: (body: { customerName: string; customerEmail: string; total: number; items: unknown[]; city: string; phone: string }) =>
    post<{ ok: boolean; orderNumber: string; id: number }>("/api/public/orders", body),

  submitLead: (body: { name: string; email: string; phone: string; source: string; notes?: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/leads", body),

  submitReview: (body: { customerName: string; productName: string; rating: number; comment: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/reviews", body),

  submitWarranty: (body: { customerName: string; productName: string; orderId?: string; issue: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/warranty", body),

  submitTicket: (body: { subject: string; customerName: string; customerEmail: string; type: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/tickets", body),

  applyDealer: (body: { businessName: string; contactName: string; email: string; phone: string; city: string }) =>
    post<{ ok: boolean; id: number }>("/api/public/dealer-apply", body),

  validateCoupon: (body: { code: string; orderAmount: number }) =>
    post<{ valid: boolean; type?: string; value?: number; minOrderAmount?: number; error?: string }>("/api/public/coupons/validate", body),
};
