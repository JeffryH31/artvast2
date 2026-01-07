"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";
import Header from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  featured: boolean;
  image_url?: string;
  orders?: { id: string }[];
}

interface DesignerStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  totalViews: number;
}

export default function DesignerProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const { isDesigner, loading: roleLoading } = useRole();
  const { confirm } = useConfirmDialog();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DesignerStats>({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        router.push("/");
      } else if (!isDesigner) {
        router.push("/dashboard");
      } else {
        fetchDesignerProducts();
      }
    }
  }, [user, isDesigner, authLoading, roleLoading, router]);

  const fetchDesignerProducts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();

      // Get designer record
      let designerId: string | undefined;
      const { data: existingDesigner, error: designerError } = await supabase
        .from("designers")
        .select("id")
        .eq("user_id", user.id)
        .single();

      // If designer profile doesn't exist, create one automatically
      if (designerError || !existingDesigner) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, username")
          .eq("id", user.id)
          .single();

        const profileData = profile as { full_name?: string; username?: string } | null;
        const designerName = profileData?.full_name || profileData?.username || user.email?.split('@')[0] || 'Designer';
        
        const { data: newDesigner, error: createError } = await supabase
          .from("designers")
          .insert({
            user_id: user.id,
            name: designerName,
            username: designerName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            avatar_initials: designerName.substring(0, 2).toUpperCase(),
            bio: '',
            verified: true,
          } as never)
          .select("id")
          .single();

        if (createError) {
          throw new Error("Failed to create designer profile. Please contact support.");
        }

        designerId = (newDesigner as unknown as { id: string })?.id;
      } else {
        designerId = (existingDesigner as unknown as { id: string })?.id;
      }

      if (!designerId) {
        throw new Error("Could not get designer ID.");
      }

      // Fetch products with order count
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select(`
          id,
          name,
          description,
          price,
          category,
          created_at,
          featured,
          image_url,
          orders(id)
        `)
        .eq("designer_id", designerId)
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;

      type ProductWithOrders = Product & { orders?: { id: string }[] };
      const products = (productsData || []) as unknown as ProductWithOrders[];
      setProducts(products);

      // Calculate stats
      const totalSales = products.reduce(
        (sum, p) => sum + (p.orders?.length || 0),
        0
      );
      const totalRevenue = products.reduce(
        (sum, p) => sum + p.price * (p.orders?.length || 0),
        0
      );

      setStats({
        totalProducts: products.length,
        totalSales,
        totalRevenue,
        totalViews: 0, // TODO: Implement view tracking
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = await confirm({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmVariant: 'danger',
    });
    
    if (!confirmed) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast.success("Product deleted successfully");
      // Refresh products list
      fetchDesignerProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  if (authLoading || roleLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user || !isDesigner) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your digital products and track performance
              </p>
            </div>
            <Link
              href="/designer/products/new"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-green-500/20"
            >
              + Upload New Product
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
                <svg
                  className="w-8 h-8 text-purple-500 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalProducts}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Sales</p>
                <svg
                  className="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalSales}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                <svg
                  className="w-8 h-8 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(stats.totalRevenue)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-500/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Views</p>
                <svg
                  className="w-8 h-8 text-orange-500 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalViews}
              </p>
            </div>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 dark:bg-white/5 rounded-xl h-64"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-xl p-6">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-center py-16 shadow-sm">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upload your first product to start selling
              </p>
              <Link
                href="/designer/products/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                + Upload Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden hover:border-green-500 dark:hover:border-green-500/50 transition-all group shadow-sm"
                >
                  {/* Product Image */}
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <svg
                        className="w-16 h-16 text-green-400 dark:text-green-500/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 dark:text-white font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {product.featured && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {product.orders?.length || 0} sales
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-white text-sm text-center rounded-lg transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/designer/products/edit/${product.id}`}
                        className="flex-1 px-3 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-500/20 dark:hover:bg-green-500/30 text-green-600 dark:text-green-400 text-sm text-center rounded-lg transition-colors cursor-pointer"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400 text-sm rounded-lg transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
