const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <ul className="pl-4">
      {categories.map(cat => (
        <li key={cat._id} className="mb-2">
          <span className="font-medium">{cat.name}</span>
          <button onClick={() => onEdit(cat)} className="ml-2 text-blue-500">Edit</button>
          <button onClick={() => onDelete(cat._id)} className="ml-1 text-red-500">Delete</button>
          <CategoryList categories={cat.children} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;