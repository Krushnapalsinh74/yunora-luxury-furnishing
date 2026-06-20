import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./api";

export function useProducts(params?: { search?: string; page?: number; limit?: number; category?: number }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.products(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.product(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: api.categories,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBanners(type?: string) {
  return useQuery({
    queryKey: ["banners", type],
    queryFn: () => api.banners(type),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOffers() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: api.offers,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDealers(city?: string) {
  return useQuery({
    queryKey: ["dealers", city],
    queryFn: () => api.dealers(city),
    staleTime: 1000 * 60 * 2,
  });
}

export function useReviews(params?: { productName?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => api.reviews(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useBlogs(params?: { category?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => api.blogs(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => api.blog(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: api.siteSettings,
    staleTime: 1000 * 60 * 10,
  });
}

export function useInventory(productId: number) {
  return useQuery({
    queryKey: ["inventory", productId],
    queryFn: () => api.inventory(productId),
    enabled: !!productId,
    staleTime: 1000 * 60,
  });
}

export function useHomepageSections() {
  return useQuery({
    queryKey: ["homepageSections"],
    queryFn: api.homepageSections,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: api.campaigns,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlaceOrder() {
  return useMutation({ mutationFn: api.placeOrder });
}

export function useSubmitLead() {
  return useMutation({ mutationFn: api.submitLead });
}

export function useSubmitReview() {
  return useMutation({ mutationFn: api.submitReview });
}

export function useSubmitWarranty() {
  return useMutation({ mutationFn: api.submitWarranty });
}

export function useSubmitTicket() {
  return useMutation({ mutationFn: api.submitTicket });
}

export function useApplyDealer() {
  return useMutation({ mutationFn: api.applyDealer });
}

export function useValidateCoupon() {
  return useMutation({ mutationFn: api.validateCoupon });
}
