export const flattenCategories = (nodes = []) => {
  const result = [];
  const map = new Map();

  // STEP 1: build full map first (IMPORTANT FIX)
  const buildMap = (items = []) => {
    items.forEach((item) => {
      map.set(item._id.toString(), item.name);

      if (item.children?.length) {
        buildMap(item.children);
      }
    });
  };

  buildMap(nodes);

  // STEP 2: flatten properly
  const flatten = (items = []) => {
    items.forEach((item) => {
      result.push({
        id: item._id,
        name: item.name,
        parentId: item.parentId ? item.parentId.toString() : null,
      });

      if (item.children?.length) {
        flatten(item.children);
      }
    });
  };

  flatten(nodes);

  // STEP 3: attach parent name safely
  return result.map((item) => ({
    ...item,
    parentName: item.parentId ? map.get(item.parentId) : "-",
  }));
};