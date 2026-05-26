import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categorySlice";

const CategoryGrid = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading && categories.length === 0) {
    return (
      <div className="py-8 bg-white border-b border-gray-100 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#832729] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-4 bg-[#fbf9f4]/60 border-b border-gray-200/40 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-gray-700">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              to={cat.link} 
              className="hover:text-[#832729] border-b-2 border-transparent hover:border-[#832729] transition-all duration-300 pb-1 whitespace-nowrap cursor-pointer"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
