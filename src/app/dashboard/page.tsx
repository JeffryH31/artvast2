"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { createClient } from "@/lib/supabase/client";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useLanguage, useDatabaseTranslation } from "@/lib/i18n";
import toast from "react-hot-toast";

interface Order {
  id: string;
  product_id: string;
  status: string;
  total_price: number;
  created_at: string;
  product?: {
    title: string;
    image_url: string;
  };
}

interface SavedProduct {
  id: string;
  product_id: string;
  product?: {
    id: string;
    title: string;
    image_url: string;
    price: number;
    designer?: {
      name: string;
    };
  };
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

const PORTFOLIO_CATEGORIES = [
  "Illustration",
  "UI/UX Design",
  "Branding",
  "Typography",
  "Photography",
  "3D Design",
  "Motion Graphics",
  "Print Design",
  "Web Design",
  "Other",
];

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { isDesigner } = useRole();
  const router = useRouter();
  const { t } = useLanguage();
  const { translateCategory } = useDatabaseTranslation();
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "saved" | "settings" | "products" | "portfolio"
  >("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    full_name: string;
    avatar_url: string;
    bio: string;
    role: string;
  } | null>(null);

  // Portfolio states
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [designerId, setDesignerId] = useState<string | null>(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] =
    useState<PortfolioItem | null>(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: "",
    description: "",
    category: "Illustration",
    image_url: "",
    featured: false,
  });
  const [portfolioSubmitting, setPortfolioSubmitting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      const supabase = createClient();
      setLoading(true);

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, bio, role")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch orders (jika table orders ada)
        const { data: ordersData } = await supabase
          .from("orders")
          .select(
            `
            *,
            product:products(title, image_url)
          `
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (ordersData) {
          setOrders(ordersData);
        }

        // Fetch saved products (jika table saved_products ada)
        const { data: savedData } = await supabase
          .from("saved_products")
          .select(
            `
            *,
            product:products(id, title, image_url, price, designer:designers(name))
          `
          )
          .eq("user_id", user.id)
          .limit(10);

        if (savedData) {
          setSavedProducts(savedData);
        }

        // Fetch designer info if user is a designer
        const { data: designerData } = await supabase
          .from("designers")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        // Type assertion for profileData
        const profileWithRole = profileData as { role?: string; full_name?: string; username?: string } | null;
        
        let finalDesignerId = (designerData as { id: string } | null)?.id;

        // If user is a designer but no designer record exists, create one
        if (!designerData && profileWithRole?.role === "designer") {
          const designerName =
            profileWithRole?.full_name ||
            profileWithRole?.username ||
            user.email?.split("@")[0] ||
            "Designer";

          const { data: newDesigner } = await supabase
            .from("designers")
            .insert({
              user_id: user.id,
              name: designerName,
              username:
                designerName.toLowerCase().replace(/\s+/g, "-") +
                "-" +
                Date.now(),
              avatar_initials: designerName.substring(0, 2).toUpperCase(),
              bio: "",
              verified: true,
            } as never)
            .select("id")
            .single();

          finalDesignerId = (newDesigner as { id: string } | null)?.id;
        }

        if (finalDesignerId) {
          setDesignerId(finalDesignerId);

          // Fetch portfolio items
          const { data: portfolioData } = await supabase
            .from("portfolio_items")
            .select("*")
            .eq("designer_id", finalDesignerId)
            .order("created_at", { ascending: false });

          if (portfolioData) {
            setPortfolioItems(portfolioData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Header Skeleton */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-48 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 dark:bg-white/10 rounded w-64 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  // Portfolio functions
  const openAddPortfolioModal = () => {
    setEditingPortfolio(null);
    setPortfolioForm({
      title: "",
      description: "",
      category: "Illustration",
      image_url: "",
      featured: false,
    });
    setShowPortfolioModal(true);
  };

  const openEditPortfolioModal = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPortfolioForm({
      title: item.title,
      description: item.description || "",
      category: item.category,
      image_url: item.image_url,
      featured: item.featured,
    });
    setShowPortfolioModal(true);
  };

  const closePortfolioModal = () => {
    setShowPortfolioModal(false);
    setEditingPortfolio(null);
    setPortfolioForm({
      title: "",
      description: "",
      category: "Illustration",
      image_url: "",
      featured: false,
    });
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!designerId) {
      toast.error("Designer profile not found");
      return;
    }

    if (!portfolioForm.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!portfolioForm.image_url) {
      toast.error("Please upload an image");
      return;
    }

    setPortfolioSubmitting(true);
    const supabase = createClient();

    try {
      if (editingPortfolio) {
        // Update existing
        const { error } = await supabase
          .from("portfolio_items")
          .update({
            title: portfolioForm.title,
            description: portfolioForm.description || null,
            category: portfolioForm.category,
            image_url: portfolioForm.image_url,
            featured: portfolioForm.featured,
          } as never)
          .eq("id", editingPortfolio.id);

        if (error) throw error;

        setPortfolioItems((prev) =>
          prev.map((item) =>
            item.id === editingPortfolio.id
              ? { ...item, ...portfolioForm }
              : item
          )
        );
        toast.success("Portfolio item updated!");
      } else {
        // Create new
        const { data, error } = await supabase
          .from("portfolio_items")
          .insert({
            designer_id: designerId,
            title: portfolioForm.title,
            description: portfolioForm.description || null,
            category: portfolioForm.category,
            image_url: portfolioForm.image_url,
            featured: portfolioForm.featured,
          } as never)
          .select()
          .single();

        if (error) throw error;

        setPortfolioItems((prev) => [data, ...prev]);
        toast.success("Portfolio item added!");
      }

      closePortfolioModal();
    } catch (error) {
      console.error("Error saving portfolio item:", error);
      toast.error("Failed to save portfolio item");
    } finally {
      setPortfolioSubmitting(false);
    }
  };

  const handleDeletePortfolio = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setPortfolioItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Portfolio item deleted!");
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      toast.error("Failed to delete portfolio item");
    }
  };

  const handlePortfolioImageUpload = (
    files: { url: string; path: string; name: string }[]
  ) => {
    if (files.length > 0) {
      setPortfolioForm((prev) => ({ ...prev, image_url: files[0].url }));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-24 pb-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile?.full_name || user.email?.split("@")[0] || "User"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm max-w-lg">
                  {profile?.bio || t.dashboard.welcomeMessage}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {orders.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.dashboard.orders}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {savedProducts.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.dashboard.saved}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: "overview", label: t.dashboard.overview },
              { id: "orders", label: t.dashboard.myOrders },
              { id: "saved", label: t.dashboard.savedProducts },
              ...(isDesigner
                ? [
                    // { id: "products", label: t.dashboard.myProducts }, // Hidden - transaction features disabled
                    { id: "portfolio", label: t.dashboard.portfolio },
                  ]
                : []),
              { id: "settings", label: t.dashboard.settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? isDesigner &&
                      (tab.id === "products" || tab.id === "portfolio")
                      ? "bg-green-500 text-white"
                      : "bg-purple-500 text-white"
                    : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 dark:bg-white/5 rounded-xl h-48"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Orders */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t.dashboard.recentOrders}
                      </h2>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-purple-600 dark:text-purple-400 text-sm hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        {t.dashboard.viewAll}
                      </button>
                    </div>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded-lg"
                          >
                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-500 dark:text-gray-400"
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
                            <div className="flex-1">
                              <p className="text-gray-900 dark:text-white font-medium">
                                {order.product?.title || "Product"}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                ${order.total_price}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                order.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : order.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg
                          className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3"
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
                        <p className="text-gray-500 dark:text-gray-400">
                          {t.dashboard.noOrders}
                        </p>
                        <Link
                          href="/marketplace"
                          className="text-purple-600 dark:text-purple-400 text-sm hover:text-purple-700 dark:hover:text-purple-300 mt-2 inline-block"
                        >
                          {t.dashboard.browseProducts}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Saved Products */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t.dashboard.savedProducts}
                      </h2>
                      <button
                        onClick={() => setActiveTab("saved")}
                        className="text-purple-600 dark:text-purple-400 text-sm hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        {t.dashboard.viewAll}
                      </button>
                    </div>
                    {savedProducts.length > 0 ? (
                      <div className="space-y-4">
                        {savedProducts.slice(0, 3).map((saved) => (
                          <Link
                            key={saved.id}
                            href={`/product/${saved.product_id}`}
                            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                          >
                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 dark:text-white font-medium">
                                {saved.product?.title || "Product"}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                by {saved.product?.designer?.name || "Designer"}
                              </p>
                            </div>
                            <p className="text-purple-600 dark:text-purple-400 font-medium">
                              ${saved.product?.price || 0}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg
                          className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400">
                          {t.dashboard.noSavedProducts}
                        </p>
                        <Link
                          href="/marketplace"
                          className="text-purple-600 dark:text-purple-400 text-sm hover:text-purple-700 dark:hover:text-purple-300 mt-2 inline-block"
                        >
                          {t.dashboard.discoverProducts}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link
                      href="/marketplace"
                      className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                      <svg
                        className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2"
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
                      <p className="text-gray-900 dark:text-white font-medium text-sm">
                        {t.nav.marketplace}
                      </p>
                    </Link>
                    <Link
                      href="/designers"
                      className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                      <svg
                        className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-gray-900 dark:text-white font-medium text-sm">
                        {t.nav.designers}
                      </p>
                    </Link>
                    <Link
                      href="/portfolio"
                      className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2"
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
                      <p className="text-gray-900 dark:text-white font-medium text-sm">
                        {t.nav.portfolio}
                      </p>
                    </Link>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl p-4 text-center transition-colors border border-gray-200 dark:border-white/10 shadow-sm"
                    >
                      <svg
                        className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-gray-900 dark:text-white font-medium text-sm">
                        {t.dashboard.settings}
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
                  {orders.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-white/10">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                          <div className="w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
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
                          <div className="flex-1">
                            <h3 className="text-gray-900 dark:text-white font-medium">
                              {order.product?.title || "Product"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                              {new Date(order.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : order.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : order.status === "processing"
                                  ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {order.status}
                            </span>
                            <p className="text-gray-900 dark:text-white font-semibold">
                              ${order.total_price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
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
                        {t.dashboard.noOrders}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {t.dashboard.browseProducts}
                      </p>
                      <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        {t.nav.marketplace}
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Saved Products Tab */}
              {activeTab === "saved" && (
                <div>
                  {savedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {savedProducts.map((saved) => (
                        <Link
                          key={saved.id}
                          href={`/product/${saved.product_id}`}
                          className="bg-white dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all group shadow-sm"
                        >
                          <div className="aspect-video bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-400 dark:text-gray-600"
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
                          </div>
                          <div className="p-4">
                            <h3 className="text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {saved.product?.title || "Product"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              by {saved.product?.designer?.name || "Designer"}
                            </p>
                            <p className="text-purple-600 dark:text-purple-400 font-semibold mt-2">
                              ${saved.product?.price || 0}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        {t.dashboard.noSavedProducts}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {t.dashboard.discoverProducts}
                      </p>
                      <Link
                        href="/marketplace"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        {t.dashboard.discoverProducts}
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* My Products Tab hidden - transaction features disabled
              {activeTab === "products" && isDesigner && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t.dashboard.myProducts}
                    </h2>
                    <Link
                      href="/designer/products/new"
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      + {t.designerDashboard.addProduct}
                    </Link>
                  </div>

                  <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Product management interface coming soon. This will allow
                      you to manage your products, view analytics, and more.
                    </p>
                  </div>
                </div>
              )}
              */}

              {/* Portfolio Tab (Designer Only) */}
              {activeTab === "portfolio" && isDesigner && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t.dashboard.portfolio}
                    </h2>
                    <button
                      onClick={openAddPortfolioModal}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      + {t.dashboard.addPortfolio}
                    </button>
                  </div>

                  {portfolioItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {portfolioItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm group"
                        >
                          {/* Image */}
                          <div className="aspect-video bg-gray-100 dark:bg-white/10 relative overflow-hidden">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-gray-300 dark:text-gray-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            {item.featured && (
                              <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded">
                                {t.dashboard.portfolioFeatured}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {item.title}
                              </h3>
                              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs rounded-full whitespace-nowrap">
                                {translateCategory(item.category)}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                                {item.description}
                              </p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditPortfolioModal(item)}
                                className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 text-sm rounded-lg transition-colors cursor-pointer"
                              >
                                {t.common.edit}
                              </button>
                              <button
                                onClick={() => handleDeletePortfolio(item.id)}
                                className="px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400 text-sm rounded-lg transition-colors cursor-pointer"
                              >
                                {t.common.delete}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm text-center py-16">
                      <svg
                        className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        {t.dashboard.noPortfolioItems}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {t.dashboard.createFirstPortfolio}
                      </p>
                      <button
                        onClick={openAddPortfolioModal}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer"
                      >
                        + {t.dashboard.addPortfolio}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="max-w-2xl">
                  <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm transition-colors duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      {t.dashboard.accountSettings}
                    </h2>

                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.dashboard.fullName}
                        </label>
                        <input
                          type="text"
                          defaultValue={profile?.full_name || ""}
                          placeholder={t.dashboard.fullName}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.auth.email}
                        </label>
                        <input
                          type="email"
                          value={user.email || ""}
                          disabled
                          className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t.dashboard.bio}
                        </label>
                        <textarea
                          rows={4}
                          defaultValue={profile?.bio || ""}
                          placeholder={t.dashboard.bio}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none transition-colors"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
                        >
                          {t.common.save}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-500/20 p-6 mt-6">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                      {t.common.delete}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {t.dashboard.deleteConfirm}
                    </p>
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm cursor-pointer">
                      {t.common.delete}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Portfolio Modal */}
      {showPortfolioModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingPortfolio
                  ? t.dashboard.editPortfolio
                  : t.dashboard.addPortfolio}
              </h2>
              <button
                onClick={closePortfolioModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePortfolioSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.dashboard.portfolioImage} *
                </label>
                {portfolioForm.image_url ? (
                  <div className="relative">
                    <img
                      src={portfolioForm.image_url}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPortfolioForm((prev) => ({ ...prev, image_url: "" }))
                      }
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <ImageUpload
                    onUpload={handlePortfolioImageUpload}
                    maxFiles={1}
                    existingImages={[]}
                    bucket="product-images"
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.dashboard.portfolioTitle} *
                </label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) =>
                    setPortfolioForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder={t.dashboard.portfolioTitle}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.dashboard.portfolioCategory} *
                </label>
                <select
                  value={portfolioForm.category}
                  onChange={(e) =>
                    setPortfolioForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-green-500 transition-colors cursor-pointer"
                >
                  {PORTFOLIO_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.dashboard.portfolioDescription}
                </label>
                <textarea
                  value={portfolioForm.description}
                  onChange={(e) =>
                    setPortfolioForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder={t.dashboard.portfolioDescription}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={portfolioForm.featured}
                  onChange={(e) =>
                    setPortfolioForm((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {t.dashboard.portfolioFeatured}
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={closePortfolioModal}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors cursor-pointer"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  disabled={portfolioSubmitting}
                  className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed cursor-pointer"
                >
                  {portfolioSubmitting
                    ? t.common.loading
                    : editingPortfolio
                    ? t.common.save
                    : t.dashboard.addPortfolio}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
