'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { createClient } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import Header from '@/components/layout/Header';

interface ProductImage {
  url: string;
  path: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  images: string[];
  features: string[];
  tags: string[];
  delivery_time: string;
  license_type: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading: authLoading } = useAuth();
  const { role, isDesigner, loading: roleLoading } = useRole();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Product data
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('1-3 days');
  const [licenseType, setLicenseType] = useState('personal');
  const [features, setFeatures] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<ProductImage[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id || !user) return;

      try {
        const supabase = createClient();
        
        // Get designer ID
        let { data: designerData } = await supabase
          .from('designers')
          .select('id')
          .eq('user_id', user.id)
          .single();

        // If designer profile doesn't exist, create one automatically
        if (!designerData) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, username')
            .eq('id', user.id)
            .single();

          const typedProfile = profile as { full_name?: string; username?: string } | null;
          const designerName = typedProfile?.full_name || typedProfile?.username || user.email?.split('@')[0] || 'Designer';
          
          const { data: newDesigner, error: createError } = await supabase
            .from('designers')
            .insert({
              user_id: user.id,
              name: designerName,
              username: designerName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
              avatar_initials: designerName.substring(0, 2).toUpperCase(),
              bio: '',
              verified: true,
            } as never)
            .select('id')
            .single();

          if (createError) {
            setError('Failed to create designer profile. Please contact support.');
            setLoading(false);
            return;
          }

          designerData = newDesigner;
        }

        if (!designerData) {
          setError('Designer profile not found');
          setLoading(false);
          return;
        }

        const designerIdForQuery = (designerData as { id: string }).id;

        // Get product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .eq('designer_id', designerIdForQuery)
          .single();

        if (productError || !productData) {
          setError('Product not found or you do not have permission to edit it');
          setLoading(false);
          return;
        }

        const typedProduct = productData as unknown as Product;

        setProduct(typedProduct);
        setName(typedProduct.name);
        setDescription(typedProduct.description || '');
        setCategory(typedProduct.category);
        setPrice(typedProduct.price.toString());
        setOriginalPrice(typedProduct.original_price?.toString() || '');
        setDeliveryTime(typedProduct.delivery_time || '1-3 days');
        setLicenseType(typedProduct.license_type || 'personal');
        setFeatures(typedProduct.features || ['']);
        setTags(typedProduct.tags || []);
        setExistingImages(typedProduct.images || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
        setLoading(false);
      }
    };

    if (!authLoading && !roleLoading) {
      fetchProduct();
    }
  }, [params.id, user, authLoading, roleLoading]);

  // Redirect if not designer
  useEffect(() => {
    if (!authLoading && !roleLoading && !isDesigner) {
      router.push('/dashboard');
    }
  }, [authLoading, roleLoading, isDesigner, router]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (uploadedImages: ProductImage[]) => {
    setImages(prev => [...prev, ...uploadedImages]);
  };

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }

    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // Combine existing images with new uploads
    const allImages = [...existingImages, ...images.map((img) => img.url)];
    
    if (allImages.length === 0) {
      setError('Please upload at least one product image');
      return;
    }

    const validFeatures = features.filter((f) => f.trim() !== '');

    setSaving(true);

    try {
      const supabase = createClient();

      // Update product
      const { error: updateError } = await supabase
        .from('products')
        .update({
          name: name.trim(),
          description: description.trim(),
          category,
          price: priceNum,
          original_price: originalPrice ? parseFloat(originalPrice) : null,
          delivery_time: deliveryTime,
          license_type: licenseType,
          features: validFeatures,
          tags,
          images: allImages,
          updated_at: new Date().toISOString(),
        } as never)
        .eq('id', params.id as string);

      if (updateError) throw updateError;

      router.push('/designer/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
      setSaving(false);
    }
  };

  if (authLoading || roleLoading || loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#5D6BC6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        </div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => router.push('/designer/products')}
              className="px-6 py-2 bg-gradient-to-r from-[#8B5A8C] to-[#5D6BC6] text-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300"></div>
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#5D6BC6]/15 to-[#1647A3]/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#BD9587]/20 to-[#A2655F]/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <Header />

      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#5D6BC6] mb-4 cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Update your product information</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Images */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product Images</h2>
            
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Images:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setExistingImages(existingImages.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] text-white text-xs rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <ImageUpload
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                maxFiles={5 - existingImages.length - images.length}
                existingImages={images.map(img => img.url)}
                bucket="product-images"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                You can upload up to {5 - existingImages.length - images.length} more images (max 5 total)
              </p>
            </div>

            {/* Basic Information */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
            
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                    placeholder="Describe your product..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">Select a category</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                  >
                    <option value="instant">Instant</option>
                    <option value="1-3 days">1-3 days</option>
                    <option value="3-7 days">3-7 days</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pricing</h2>
            
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (IDR) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Original Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    min="0"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  License Type
                </label>
                <select
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                >
                  <option value="personal">Personal Use</option>
                  <option value="commercial">Commercial Use</option>
                  <option value="extended">Extended License</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Features</h2>
            
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-[#5D6BC6] hover:text-[#1647A3] font-medium cursor-pointer transition-colors"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tags</h2>
            
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#5D6BC6] focus:border-transparent transition-colors"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-2 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white rounded-xl hover:shadow-lg hover:shadow-[#5D6BC6]/30 cursor-pointer transition-all duration-300"
                >
                  Add
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#5D6BC6]/10 dark:bg-[#5D6BC6]/20 text-[#5D6BC6] dark:text-[#8B9AD6] rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-[#1647A3] dark:hover:text-white cursor-pointer transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] text-white rounded-xl hover:shadow-lg hover:shadow-[#5D6BC6]/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
              >
                {saving ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
