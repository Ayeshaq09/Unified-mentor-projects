const { createContext, useState } = require("react");

// ProductContext
const CategoryContext = createContext();

export default CategoryContext;

// ProductProvider
export const CategoryProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;

  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    const url = `${host}/category/fetchcategories`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setCategories(json.categories);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const addCategory = async (category) => {
    const url = `${host}/category/addcategory`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          categoryName: category.category
        }),
      });

      const json = await response.json();
      if (json.success) {
        setCategories(categories.concat(json.category));
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const deleteCategory = async (id) => {
    const url = `${host}/category/deletecategory/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setCategories(categories.filter((item) => item.id !== id));
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const updateCategory = async (categoryItem) => {
    const { id, category } = categoryItem;
    const url = `${host}/category/updatecategory/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          category
        }),
      });

      const json = await response.json();
      if (json.success) {
        const newCategories = JSON.parse(JSON.stringify(categories));
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id === id) {
            newCategories[i].category = category;
            break;
          }
        }
        setCategories(newCategories);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
