import { useEffect, useState } from "react";
import { getFilters, createFilter, deleteFilter } from "../api/filter";
import { RiCloseLine } from "@remixicon/react";

export default function FilterAdmin() {
  const [type, setType] = useState("brand");
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const loadFilters = async () => {
    try {
      setLoading(true);
      const res = await getFilters();
      setFilters(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    await createFilter({ type, name });
    setName("");
    loadFilters();
  };

  const handleDelete = async (id) => {
    await deleteFilter(id);
    loadFilters();
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] p-6">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          Filter Manager
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage all product filters in one place
        </p>
      </div>

      {/* ADD SECTION */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 mb-10">

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-200 rounded-xl p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]"
        >
          <option value="brand">Brand</option>
          <option value="stoneShape">Stone Shape</option>
          <option value="stoneColor">Stone Color</option>
          <option value="stoneType">Stone Type</option>
          <option value="metal">Metal Type</option>
          <option value="price">Price</option>
          <option value="carat">Carat</option>
        </select>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new value..."
          className="border border-gray-200 rounded-xl p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]"
        />

        <button
          onClick={handleAdd}
          className="bg-[#c9a96e] hover:bg-[#b8965d] transition text-white px-6 py-3 rounded-xl font-medium shadow-sm"
        >
          Add Filter
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 mb-6">Loading filters...</p>
      )}

      {/* FILTER CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {Object.keys(filters).map((key) => (
          <div
            key={key}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-5"
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">

              <div>
                <h3 className="font-semibold text-gray-800 capitalize">
                  {key}
                </h3>
                <span className="text-xs text-gray-400">
                  {filters[key]?.length || 0} items
                </span>
              </div>

            </div>

            {/* ITEMS */}
            <div className="flex flex-wrap gap-2">

              {filters[key]?.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#faf7f2] text-gray-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm border border-gray-100 hover:border-[#c9a96e] transition"
                >
                  {item.name}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <RiCloseLine size={16} />
                  </button>
                </div>
              ))}

            </div>

            {/* EMPTY STATE */}
            {filters[key]?.length === 0 && (
              <p className="text-sm text-gray-400 mt-4">
                No filters added yet
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}