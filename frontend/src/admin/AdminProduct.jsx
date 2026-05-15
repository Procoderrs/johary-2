import { useEffect, useState, useRef } from "react";
import { getCategories } from "../api/category";
import { createProduct, updateProduct, getProductBySlug } from "../api/product";
import { useNavigate, useParams } from "react-router-dom";
import { getFilters } from "../api/filter";

export default function ProductForm() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [parentId, setParentId] = useState("");
  const [childOptions, setChildOptions] = useState([]);
  const [childCategoryId, setChildCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingChildId, setPendingChildId] = useState("");
  
  // product ka raw category _id store karne k liye
  // taake jab categories load hon to child set kar sakein
useEffect(() => {
  if (slug && categories.length > 0) {
    loadProduct();
  }
}, [slug, categories]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    brand: "",
    stock:"",
    metalType: "",
    stoneType: "",
    isFeatured: false,  // ✅
  isTrending: false,  // ✅
  rating:"",
 reviewCount:"",
  });

  const [variantTypes, setVariantTypes] = useState([
    { name: "", options: [""] },
  ]);
  const [variants, setVariants] = useState([]);

  const MAX_IMAGES = 3;
  const totalExisting = existingImages.length;
  const remainingSlots = Math.max(MAX_IMAGES - totalExisting, 0);

  // ─── USEEFFECT 1: page load par categories + filters load karo ───
  useEffect(() => {
    loadCategories();
    loadFilters();
  }, []);

  // ─── USEEFFECT 2: jab categories aayein AUR slug ho, tab category dropdowns set karo ───
  // (kyunki loadProduct categories se pehle chal sakti thi)
 


  

  // ─── USEEFFECT 3: slug change ho (edit mode) to product load karo ───
  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  // ─────────────────────────────────────────
  const loadCategories = async () => {
    const res = await getCategories();
      console.log("CATEGORIES:", res.data.data); 

    setCategories(res.data.data || []);
  };
console.log(categories)
  const loadFilters = async () => {
    try {
      setLoading(true);
      const res = await getFilters();
       console.log("FILTERS FROM API:", res.data.data); // ← YEH
      setFilters(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  const loadProduct = async () => {
    try {
      const res = await getProductBySlug(slug);
      const product = res.data.data;

    console.log("PRODUCT FROM API:", product);
    console.log("brand:", product.brand);
    console.log("metalType:", product.metalType);
    console.log("stoneType:", product.stoneType);
    console.log("category:", product.category);

      // ── form fill karo ──
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discount: product.discount || "",
        stock:product.stock||"",
        // populate ho chuka hai isliye ._id lena zaroori hai
        brand: product.brand?._id || "",
        metalType: product.metalType?._id || "",
        stoneType: product.stoneType?._id || "",
        isFeatured: product.isFeatured || false,  // ✅
        isTrending: product.isTrending || false,  // ✅
        rating:product.rating ||0,
        reviewCount:product.reviewCount||0,
      });

      setVariants(product.variants || []);
      setExistingImages(product.images || []);
      setImages([]);

      // ── category set karo ──
     if (product.category) {
  const cat = product.category;
  const catId = String(cat._id || cat);
  const parentCatId = cat.parentId? String(cat.parentId): null;

  if (parentCatId) {
    // ← child category hai
   setParentId(String(parentCatId));
    //setPendingChildId(catId);  // ← child set karo

    if (categories.length > 0) {
  const parentCat = categories.find(
    (c) => String(c._id) === String(parentCatId)
  );

  const children = parentCat?.children || [];

  setChildOptions(children);
    setChildCategoryId(catId);

  
} else {
  pendingCategoryId.current = parentCatId;
 
}
  } else {
    // ← parent category hai
    setParentId(catId);
   
      const parentCat = categories.find((c) => c._id === catId);
       console.log('parent-cat',parentCat)
      setChildOptions(parentCat?.children || []);
      setChildCategoryId("")
     
  }
}
    } catch (err) {
      console.log("loadProduct error:", err);
    }
  };

  // ─────────────────────────────────────────
  const handleParentChange = (e) => {
    const id = e.target.value;
    setParentId(id);
const cat = categories.find(
  (c) => String(c._id) === String(id)
);

setChildOptions(cat?.children || []);
    setChildCategoryId("");
  };

  
console.log(categories);


  const handleImageChange = (index, file) => {
    const imgCopy = [...images];
    imgCopy[index] = file;
    setImages(imgCopy);

    const previewCopy = [...preview];
    previewCopy[index] = file ? URL.createObjectURL(file) : null;
    setPreview(previewCopy);
  };

  const addVariantType = () => {
    setVariantTypes([...variantTypes, { name: "", options: [""] }]);
  };

  const addOption = (index) => {
    const copy = [...variantTypes];
    copy[index].options.push("");
    setVariantTypes(copy);
  };

  const generateVariants = () => {
    let result = [{}];
    variantTypes.forEach((variant) => {
      const temp = [];
      result.forEach((r) => {
        variant.options.forEach((opt) => {
          if (!opt) return;
          temp.push({ ...r, [variant.name]: opt });
        });
      });
      result = temp;
    });
    setVariants(result.map((v) => ({ combination: v, price: "", stock: "" })));
  };

  const updateVariantField = (i, field, value) => {
    const copy = [...variants];
    copy[i][field] = value;
    setVariants(copy);
  };

  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", Number(form.price || 0));
      data.append("discount", form.discount || 0);
      data.append("brand", form.brand);
      data.append("stock",form.stock||0)
      data.append("metalType", form.metalType);
      data.append("stoneType", form.stoneType);
      data.append("category", childCategoryId || parentId);
      data.append("variants", JSON.stringify(variants));
      data.append("existingImages", JSON.stringify(existingImages)); 
data.append("isFeatured", form.isFeatured);
data.append("isTrending", form.isTrending);
data.append("rating",form.rating||0);
data.append("reviewCount",form.reviewCount||0);
    console.log("brand:", form.brand);
    console.log("metalType:", form.metalType);
    console.log("stoneType:", form.stoneType);
    console.log("category:", form.category);
    console.log("child",childCategoryId)



      images.forEach((img) => {
        if (img) data.append("images", img);
      });

      if (slug) {
        await updateProduct(slug, data);
      } else {
        await createProduct(data);
      }

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── JSX same rakho, bas select mein value check karo ───
  return (
  <div className="min-h-screen bg-bg px-6 py-10">
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-10">
        <p className="text-sm tracking-[4px] uppercase text-primary-gold-accent font-medium mb-2">
          Jewelry Admin
        </p>

        <h1
          className="text-4xl font-heading text-dark-text font-"
          
        >
          {slug ? "Edit Product" : "Create Product"}
        </h1>

        <p className="text-secondary-text mt-2 text-sm">
          Manage your luxury jewelry catalog with elegance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* BASIC INFO */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">
          <div className="mb-6">
            <h2
              className="text-2xl text-dark-text font-heading"
          
            >
              Basic Information
            </h2>

            <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
          </div>

          <div className="space-y-6">

            <div>
              <label className="text-sm font-medium text-secondary-text">
                Product Name
              </label>

              <input
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Diamond Wedding Ring"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-secondary-text">
                Description
              </label>

              <textarea
                rows={5}
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-4 outline-none focus:border-primary-gold-accent transition-all resize-none"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Write a luxurious product description..."
              />
            </div>


            <div>
  <label className="text-sm font-medium text-secondary-text">
    Rating (0 - 5)
  </label>
  <input
    type="number"
    min="0"
    max="5"
    step="0.1"
    className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
    value={form.rating}
    onChange={(e) => setForm({ ...form, rating: e.target.value })}
    placeholder="4.5"
  />
</div>
{/* isFeatured + isTrending toggles */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Featured */}
  <div className="flex items-center justify-between bg-bg-1 border border-border-2 rounded-2xl px-5 py-4">
    <div>
      <p className="text-sm font-medium text-dark-text">Featured Product</p>
      <p className="text-xs text-text-light mt-0.5">Homepage pe show hoga</p>
    </div>
    <button
      type="button"
      onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
        form.isFeatured ? "bg-primary-gold-accent" : "bg-gray-200"
      }`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
        form.isFeatured ? "left-6" : "left-0.5"
      }`} />
    </button>
  </div>

  {/* Trending */}
  <div className="flex items-center justify-between bg-bg-1 border border-border-2 rounded-2xl px-5 py-4">
    <div>
      <p className="text-sm font-medium text-dark-text">Trending Product</p>
      <p className="text-xs text-text-light mt-0.5">Trending section mein aayega</p>
    </div>
    <button
      type="button"
      onClick={() => setForm({ ...form, isTrending: !form.isTrending })}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
        form.isTrending ? "bg-primary-gold-accent" : "bg-gray-200"
      }`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
        form.isTrending ? "left-6" : "left-0.5"
      }`} />
    </button>
  </div>

</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <label className="text-sm font-medium text-secondary-text">
                  Price
                </label>

                <input
                  className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-[#C8A96B]"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  placeholder="$299"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-secondary-text">
                  Discount (%)
                </label>

                <input
                  className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                  placeholder="10%"
                />
              </div>

               <div>
                <label className="text-sm font-medium text-secondary-text">
                  Stock
                </label>

                <input
                  className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-[#C8A96B]"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                  placeholder="$299"
                />
              </div>

            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">

          <div className="mb-6">
            <h2
              className="text-2xl text-dark-text font-heading"
              
            >
              Category
            </h2>

            <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm font-medium text-secondary-text">
                Main Category
              </label>

              <select
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                value={parentId || ""}
                onChange={handleParentChange}
              >
                <option value="">Select Category</option>

                {categories.map((c) => (
                  <option key={c._id} value={String(c._id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-secondary-text">
                Sub Category
              </label>

              <select
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                value={childCategoryId || ""}
                onChange={(e) => setChildCategoryId(e.target.value)}
              >
                <option value="">Select Sub Category</option>

                {childOptions.map((c) => (
                  <option key={c._id} value={String(c._id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">

          <div className="mb-6">
            <h2
              className="text-2xl text-dark-text font-heading"
             
            >
              Product Filters
            </h2>

            <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* BRAND */}
            <div>
              <label className="text-sm font-medium text-secondary-text">
                Brand
              </label>

              <select
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                value={form.brand || ""}
                onChange={(e) =>
                  setForm({ ...form, brand: e.target.value })
                }
              >
                <option value="">Select Brand</option>

                {(filters.brand || []).map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* METAL */}
            <div>
              <label className="text-sm font-medium text-secondary-text">
                Metal Type
              </label>

              <select
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                value={form.metalType || ""}
                onChange={(e) =>
                  setForm({ ...form, metalType: e.target.value })
                }
              >
                <option value="">Select Metal</option>

                {(filters.metal || []).map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* STONE */}
            <div>
              <label className="text-sm font-medium text-secondary-text">
                Stone Type
              </label>

              <select
                className="w-full mt-2 bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent"
                value={form.stoneType || ""}
                onChange={(e) =>
                  setForm({ ...form, stoneType: e.target.value })
                }
              >
                <option value="">Select Stone</option>

                {(filters.stoneType || []).map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* VARIANTS */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2
                className="text-2xl text-dark-text font-heading"
               
              >
                Product Variants
              </h2>

              <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
            </div>

            <button
              type="button"
              onClick={addVariantType}
              className="px-5 py-2 rounded-full border border-primary-gold-accent text-primary-gold-accent hover:bg-primary-gold-accent hover:text-white transition-all"
            >
              + Add Variant
            </button>
          </div>

          {variantTypes.map((v, i) => (
            <div
              key={i}
              className="mb-5 bg-bg-1 border border-border-1 rounded-3xl p-6"
            >

              <input
                className="w-full bg-white border border-border-2 rounded-2xl px-5 py-3 mb-4 outline-none focus:border-primary-gold-accent"
                placeholder="Variant Name"
                value={v.name}
                onChange={(e) => {
                  const copy = [...variantTypes];
                  copy[i].name = e.target.value;
                  setVariantTypes(copy);
                }}
              />

              {v.options.map((opt, j) => (
                <input
                  key={j}
                  className="w-full bg-white border border-border-2 rounded-2xl px-5 py-3 mb-3 outline-none focus:border-primary-gold-accent"
                  placeholder="Option"
                  value={opt}
                  onChange={(e) => {
                    const copy = [...variantTypes];
                    copy[i].options[j] = e.target.value;
                    setVariantTypes(copy);
                  }}
                />
              ))}

              <button
                type="button"
                onClick={() => addOption(i)}
                className="text-sm text-primary-gold-accent font-medium"
              >
                + Add Option
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={generateVariants}
            className="mt-4 bg-primary-gold-accent hover:hover-bg text-white px-7 py-3 rounded-full transition-all"
          >
            Generate Variants
          </button>
        </div>

        {/* GENERATED VARIANTS */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">

          <div className="mb-6">
            <h2
              className="text-2xl text-dark-text font-heading"
              
            >
              Variant Details
            </h2>

            <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
          </div>

          {variants.map((v, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-6 rounded-3xl border 
              border-border-1 bg-bg-1 mb-4"
            >

              <div className="flex flex-wrap gap-3">
                {Object.entries(v.combination || {}).map(
                  ([key, value], idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-border-2 px-4 py-2 rounded-full text-sm"
                    >
                      <span className="text-secondary-text capitalize">
                        {key}:
                      </span>

                      <span className="ml-2 text-dark-text font-semibold">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex gap-4">

                <input
                  className="w-32 bg-white border border-border-2 rounded-2xl px-4 py-3 outline-none focus:border-primary-gold-accent"
                  placeholder="Price"
                  value={v.price || ""}
                  onChange={(e) =>
                    updateVariantField(i, "price", e.target.value)
                  }
                />

                <input
                  className="w-32 bg-white border border-border-2 rounded-2xl px-4 py-3 outline-none focus:border-primary-gold-accent"
                  placeholder="Stock"
                  value={v.stock || ""}
                  onChange={(e) =>
                    updateVariantField(i, "stock", e.target.value)
                  }
                />

              </div>
            </div>
          ))}
        </div>

        {/* IMAGES */}
        <div className="bg-white border border-border-1 rounded-[28px] p-8 shadow-sm">

          <div className="mb-6">
            <h2
              className="text-2xl text-dark-text font-heading"
              
            >
              Product Images
            </h2>

            <div className="w-16 h-0.5px bg-primary-gold-accent mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {existingImages.slice(0, MAX_IMAGES).map((img, i) => (
              <div
                key={`old-${i}`}
                className="relative h-40 rounded-3xl overflow-hidden border border-border-1"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setExistingImages(
                      existingImages.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-red-500 shadow"
                >
                  ×
                </button>
              </div>
            ))}

            {Array(remainingSlots)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`new-${i}`}
                  className="relative h-40 border border-dashed border-primary-gold-accent rounded-3xl flex items-center justify-center bg-bg-1 overflow-hidden"
                >

                  {preview?.[i] ? (
                    <img
                      src={preview[i]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-text-2 text-sm">
                      Upload Image
                    </span>
                  )}

                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleImageChange(i, e.target.files[0])
                    }
                  />
                </div>
              ))}

          </div>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-primary-gold-accent hover:bg-primary-gold-accent text-white py-4 rounded-full text-lg transition-all shadow-sm"
        >
          {loading
            ? "Saving..."
            : slug
            ? "Update Product"
            : "Save Product"}
        </button>

      </form>
    </div>
  </div>
);
}