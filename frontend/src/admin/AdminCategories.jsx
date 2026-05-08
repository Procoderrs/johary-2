import { useEffect, useState } from "react";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../api/category";

export default function AdminCategories() {

  // ================= STATES =================
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // ================= LOAD =================
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getCategories();

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setCategories(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // ================= EDIT =================
  const handleEdit = (cat) => {
    setName(cat.name);
    setParentId(cat.parentId || "");
    setEditingId(cat._id);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, {
          name,
          parentId: parentId || null,
        });
      } else {
        await createCategory({
          name,
          parentId: parentId || null,
        });
      }

      setName("");
      setParentId("");
      setEditingId(null);

      load();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    load();
  };

  // ================= FLAT LIST (for dropdown) =================
  const getFlatList = (nodes = []) => {
    let result = [];

    const traverse = (items = []) => {
      items.forEach((item) => {
        result.push({
          id: item._id,
          name: item.name,
        });

        if (item.children) traverse(item.children);
      });
    };

    traverse(nodes);
    return result;
  };

  const flat = getFlatList(categories);

  // ================= UI =================
  return (
  <div className="min-h-screen bg-bg p-6">

    {/* HEADER */}
    <div className="mb-10">

      <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
        Jewelry Admin
      </p>

      <h1
        className="text-4xl text-dark-text"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Categories
      </h1>

      <p className="text-text-light text-sm mt-2">
        Manage your jewellery categories
      </p>

    </div>

    {/* FORM */}
    <div className="bg-card border border-border-1 rounded-[30px] p-7 shadow-sm mb-10">

      <div className="mb-6">

        <h2
          className="text-2xl text-dark-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {editingId ? "Edit Category" : "Create Category"}
        </h2>

        <div className="w-16 h-[2px] bg-primary-gold-accent mt-2 rounded-full"></div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-5"
      >

        {/* INPUT */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="
            bg-bg-1
            border border-border-2
            rounded-2xl
            px-5 py-3
            outline-none
            focus:border-primary-gold-accent
            text-dark-text
            placeholder:text-text-2
            transition-all
          "
        />

        {/* SELECT */}
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="
            bg-bg-1
            border border-border-2
            rounded-2xl
            px-5 py-3
            outline-none
            focus:border-primary-gold-accent
            text-secondary-text
            transition-all
          "
        >
          <option value="">No Parent</option>

          {flat.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}

        </select>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            bg-primary-gold-accent
            hover:bg-hover-bg
            text-white
            rounded-2xl
            px-5 py-3
            font-medium
            transition-all
          "
        >
          {editingId ? "Update Category" : "Create Category"}
        </button>

      </form>

    </div>

    {/* CATEGORY CARDS */}
    {loading ? (
      <div className="text-text-6">
        Loading...
      </div>
    ) : (
      <div className="grid xl:grid-cols-2 gap-6">

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="
              bg-card
              border border-border-1
              rounded-[30px]
              p-6
              shadow-sm
              hover:shadow-md
              transition-all duration-300
            "
          >

            {/* TOP */}
            <div className="flex items-start justify-between gap-4 mb-6">

              <div>

                <div className="flex items-center gap-3 mb-2">

                  <h3
                    className="text-3xl text-dark-text leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {cat.name}
                  </h3>

                  <span className="
                    bg-bg-4
                    text-text-3
                    text-xs
                    px-3 py-1
                    rounded-full
                  ">
                    {cat.children?.length || 0} items
                  </span>

                </div>

                <p className="text-text-light text-sm">
                  Jewellery category collection
                </p>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => handleEdit(cat)}
                  className="
                    px-4 py-2
                    rounded-full
                    border border-border-3
                    text-text-3
                    hover:bg-hover-soft
                    transition-all
                    text-sm
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="
                    px-4 py-2
                    rounded-full
                    border border-red-100
                    text-discount
                    hover:bg-red-50
                    transition-all
                    text-sm
                  "
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
                    className="
                      flex items-center justify-between
                      bg-bg-1
                      border border-border
                      rounded-2xl
                      px-5 py-4
                    "
                  >

                    <div>

                      <p className="text-dark-text font-medium">
                        {child.name}
                      </p>

                      <p className="text-xs text-text-light mt-1">
                        Sub Category
                      </p>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => handleEdit(child)}
                        className="
                          text-sm
                          text-secondary-text
                          hover:text-text-3
                          transition-all
                        "
                      >
                        Edit
                      </button>

                      <span className="text-border-3">
                        •
                      </span>

                      <button
                        onClick={() => handleDelete(child._id)}
                        className="
                          text-sm
                          text-text-6
                          hover:text-discount
                          transition-all
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            ) : (

              <div className="
                bg-bg-1
                border border-dashed border-border
                rounded-2xl
                py-8
                text-center
              ">

                <p className="text-text-6 text-sm">
                  No subcategories available
                </p>

              </div>

            )}

          </div>
        ))}

      </div>
    )}
  </div>
);
}