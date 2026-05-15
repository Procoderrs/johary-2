import { useEffect, useState } from "react";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../api/category";
import {useQuery,useQueryClient} from '@tanstack/react-query'

export default function AdminCategories() {

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [image, setImage] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
// ✅ yeh lagao
const queryClient = useQueryClient();

const { data: categories = [], isLoading: loading } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories().then(r => 
    Array.isArray(r.data) ? r.data : r.data?.data || []
  ),
});

  const handleEdit = (cat) => {
    setName(cat.name);
    setParentId(cat.parentId ? String(cat.parentId) : "");
    setEditingId(cat._id);
    setPreview(cat.image || "");
    setImage(null);
    // Form tak scroll karo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (parentId) formData.append("parentId", parentId);
      if (image) formData.append("image", image);

      if (editingId) {
        await updateCategory(editingId, formData);
      } else {
        await createCategory(formData);
      }

      setName("");
      setParentId("");
      setImage(null);
      setEditingId(null);
      setPreview(null);
      queryClient.invalidateQueries(['categories']);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    queryClient.invalidateQueries(['categories']);
  };

  const getFlatList = (nodes = []) => {
    let result = [];
    const traverse = (items = []) => {
      items.forEach((item) => {
        result.push({ id: item._id, name: item.name });
        if (item.children) traverse(item.children);
      });
    };
    traverse(nodes);
    return result;
  };

  const flat = getFlatList(categories);

  return (
    <div className="min-h-screen bg-bg p-6">

      {/* HEADER */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
          Jewelry Admin
        </p>
        <h1 className="text-4xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
          Categories
        </h1>
        <p className="text-text-light text-sm mt-2">Manage your jewellery categories</p>
      </div>

      {/* FORM */}
      <div className="bg-card border border-border-1 rounded-[30px] p-7 shadow-sm mb-10">
        <div className="mb-6">
          <h2 className="text-2xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
            {editingId ? "Edit Category" : "Create Category"}
          </h2>
          <div className="w-16 h-[2px] bg-primary-gold-accent mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-5">

          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent text-dark-text placeholder:text-text-2 transition-all"
          />

          {/* IMAGE */}
          <div className="flex flex-col gap-3">
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3"
            />
            {preview && (
              <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-2xl border" />
            )}
          </div>

          {/* PARENT SELECT */}
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent text-secondary-text transition-all"
          >
            <option value="">No Parent</option>
            {flat.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-primary-gold-accent hover:bg-hover-bg text-white rounded-2xl px-5 py-3 font-medium transition-all"
          >
            {editingId ? "Update Category" : "Create Category"}
          </button>

          {/* CANCEL */}
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setName(""); setParentId(""); setImage(null);
                setEditingId(null); setPreview(null);
              }}
              className="border border-border-2 text-text-3 rounded-2xl px-5 py-3 font-medium transition-all hover:bg-bg-1"
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      {/* CATEGORY CARDS */}
      {loading ? (
        <div className="text-text-6">Loading...</div>
      ) : (
        <div className="grid xl:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-card border border-border-1 rounded-[30px] p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >

              {/* PARENT CAT */}
              <div className="flex items-center gap-4 mb-6">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-14 h-14 object-cover rounded-2xl border border-border-1 flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl border border-dashed border-border-2 flex-shrink-0 flex items-center justify-center">
                    <span className="text-text-6 text-xs">No img</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-2xl text-dark-text leading-none truncate" style={{ fontFamily: "var(--font-heading)" }}>
                      {cat.name}
                    </h3>
                    <span className="bg-bg-4 text-text-3 text-xs px-3 py-1 rounded-full flex-shrink-0">
                      {cat.children?.length || 0} items
                    </span>
                  </div>
                  <p className="text-text-light text-sm">Jewellery category collection</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1.5 rounded-full border border-border-3 text-text-3 hover:bg-hover-soft transition-all text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1.5 rounded-full border border-red-100 text-discount hover:bg-red-50 transition-all text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* CHILDREN */}
              {cat.children?.length > 0 ? (
                <div className="space-y-3">
                  {cat.children.map((child) => (
                    <div
                      key={child._id}
                      className="flex items-center justify-between bg-bg-1 border border-border rounded-2xl px-4 py-3"
                    >
                      {/* Child image + name */}
                      <div className="flex items-center gap-3">
                        {child.image ? (
                          <img
                            src={child.image}
                            alt={child.name}
                            className="w-10 h-10 object-cover rounded-xl border border-border-1 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl border border-dashed border-border-2 flex-shrink-0 flex items-center justify-center bg-bg-2">
                            <span className="text-text-6 text-[9px]">No img</span>
                          </div>
                        )}
                        <div>
                          <p className="text-dark-text font-medium">{child.name}</p>
                          <p className="text-xs text-text-light mt-0.5">Sub Category</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(child)}
                          className="text-sm text-secondary-text hover:text-text-3 transition-all px-3 py-1 rounded-full border border-border-3 hover:bg-hover-soft"
                        >
                          Edit
                        </button>
                        <span className="text-border-3">•</span>
                        <button
                          onClick={() => handleDelete(child._id)}
                          className="text-sm text-text-6 hover:text-discount transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-bg-1 border border-dashed border-border rounded-2xl py-8 text-center">
                  <p className="text-text-6 text-sm">No subcategories available</p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}