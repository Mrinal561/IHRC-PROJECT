// import React, { useState, useRef, useEffect } from 'react';
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// interface SubCategory {
//   name: string;
//   id?: number;
// }

// // Add this new component
// const SubCategoryAutosuggest = ({ 
//   value, 
//   onChange,
//   onSubCategorySelect,
//   label = "Sub Category",
//   placeholder = "Enter Sub Category",
//   isDisabled
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Fetch subcategories when input changes
//   useEffect(() => {
//     const searchSubCategories = async () => {
//       if (!value) {
//         setFilteredSubCategories([]);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const { data } = await httpClient.get(endpoints.common.getSubCategory(), {
//           params: { search: value }
//         });
//         console.log(data,"sub category")
//         setSubCategories(data?.data || []);
//         setFilteredSubCategories(data?.data || []);
//       } catch (error) {
//         console.error('Error fetching subcategories:', error);
//         setSubCategories([]);
//         setFilteredSubCategories([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     searchSubCategories();
//   }, [value]);

//   const handleCreateSubCategory = async (categoryName: string) => {
//     try {
//       const { data } = await httpClient.post(endpoints.common.createSubCategory(), {
//         sub_category: categoryName  // Changed from 'name' to 'sub_category'
//       });
      
//       const newCategory = data;
//       setSubCategories(prev => [...prev, newCategory]);
//       onChange(categoryName);
//       onSubCategorySelect(newCategory.id || categoryName);
//       setIsOpen(false);
//     } catch (error) {
//       console.error('Error creating subcategory:', error);
//     }
//   };

//   const handleSelect = (category: SubCategory) => {
//     onChange(category.name);
//     onSubCategorySelect(category.id || category.name);
//     setIsOpen(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleCreateSubCategory(value);
//     }
//   };

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <p className="mb-2">{label}</p>
//       <div 
//         className="relative"
//         onKeyDown={handleKeyDown}
//         tabIndex={-1}
//       >
//         <OutlinedInput
//           value={value}
//           onChange={(inputValue) => {
//             onChange(inputValue);
//             setIsOpen(true);
//           }}
//           label={placeholder}
//           isDisabled={isDisabled}
//         />
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           type="button"
//           className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
//           disabled={isDisabled}
//         >
//           {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
//           {isLoading ? (
//             <div className="p-2 text-gray-500">Loading subcategories...</div>
//           ) : filteredSubCategories.length > 0 ? (
//             <ul className="max-h-60 overflow-auto">
//               {filteredSubCategories.map((category) => (
//                 <li
//                   key={category.id || category.name}
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                   onClick={() => handleSelect(category)}
//                 >
//                   {category.name}
//                 </li>
//               ))}
//             </ul>
//           ) : value && !isLoading ? (
//             <div 
//               className="p-2 text-gray-600 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleCreateSubCategory(value)}
//             >
//               Press Enter to Create new subcategory "{value}"
//             </div>
//           ) : (
//             <div className="p-2 text-gray-500">No subcategories found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubCategoryAutosuggest;


import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface SubCategory {
  id?: number;
  sub_category: string;
  created_at?: string;
  updated_at?: string;
}

const SubCategoryAutosuggest = ({ 
  value, 
  onChange,
  onSubCategorySelect,
  label = "Sub Category",
  placeholder = "Enter Sub Category",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchSubCategories = async () => {
      if (!value) {
        setFilteredSubCategories([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.common.getSubCategory(), {
          params: { search: value }
        });
        // Handle array of subcategories or single subcategory
        const subcategoriesData = Array.isArray(data) ? data : [data];
        setSubCategories(subcategoriesData);
        setFilteredSubCategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
        setFilteredSubCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchSubCategories();
  }, [value]);

  const handleCreateSubCategory = async (categoryName: string) => {
    try {
      const { data } = await httpClient.post(endpoints.common.createSubCategory(), {
        sub_category: categoryName
      });
      
      const newCategory = data;
      setSubCategories(prev => [...prev, newCategory]);
      onChange(categoryName);
      onSubCategorySelect(newCategory.id || categoryName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  const handleSelect = (category: SubCategory) => {
    onChange(category.sub_category);
    onSubCategorySelect(category.id || category.sub_category);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateSubCategory(value);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <p className="mb-2">{label}</p>
      <div 
        className="relative"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <OutlinedInput
          value={value}
          onChange={(inputValue) => {
            onChange(inputValue);
            setIsOpen(true);
          }}
          label={placeholder}
          isDisabled={isDisabled}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
          disabled={isDisabled}
        >
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-2 text-gray-500">Loading subcategories...</div>
          ) : filteredSubCategories.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredSubCategories.map((category) => (
                <li
                  key={category.id || category.sub_category}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(category)}
                >
                  {category.sub_category}
                </li>
              ))}
            </ul>
          ) : value && !isLoading ? (
            <div 
              className="p-2 text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCreateSubCategory(value)}
            >
              Press Enter to Create new subcategory "{value}"
            </div>
          ) : (
            <div className="p-2 text-gray-500">No subcategories found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubCategoryAutosuggest;