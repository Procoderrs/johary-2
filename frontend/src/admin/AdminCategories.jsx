import { useEffect, useState } from "react";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "../api/category";
import CategoryList from "../components/Categorylist";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter category name");
    await addCategory(name, parentId);
    setName("");
    setParentId(null);
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  const handleEdit = async (cat) => {
    const newName = prompt("Enter new name", cat.name);
    if (!newName) return;
    await updateCategory(cat._id, newName, cat.parent);
    loadCategories();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select value={parentId || ""} onChange={(e) => setParentId(e.target.value || null)} className="border p-2 rounded mr-2">
          <option value="">-- Parent (none) --</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <button onClick={handleAdd} className="bg-indigo-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminCategories;