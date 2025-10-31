import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login-Register/Login";
import { UserProvider } from "./context/AuthProvider";
import { useContext } from "react";
import UserContext from "./context/AuthProvider";
import AddProducts from "./Components/Products/AddProducts";
import { ProductProvider } from "./context/ProductProvider";
import ManageProducts from "./Components/Products/ManageProducts";
import AllProducts from "./Components/Products/AllProducts";
import ProductDetails from "./Components/Products/ProductDetails";
import { CompareProvider } from "./context/CompareProvider";
import CompareProducts from "./Components/Products/CompareProducts";
import Register from "./Components/Login-Register/Register";
import ManageShops from "./Components/Shops/ManageShops";
import { ShopProvider } from "./context/ShopProvider";
import { CategoryProvider } from "./context/CategoryProvider";
import ManageCategories from "./Components/Category/ManageCategories";
import ManageFloor from "./Components/Floor/ManageFloor";
import { FloorProvider } from "./context/FloorProvider";
import { OfferProvider } from "./context/OfferProvider";
import ManageOffers from "./Components/Offer/ManageOffers";
import CategoryWise from "./Components/Filters/CategoryWise";
import ShopWise from "./Components/Filters/ShopWise";
import FloorWise from "./Components/Filters/FloorWise";
import OfferWise from "./Components/Filters/OfferWise";

function AppRoutes() {
  const userContext = useContext(UserContext);
  const { isLoggedIn, role } = userContext;

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? <Dashboard role={role} /> : <Navigate to="/login" />
          }
        >
          <Route exact path="/manageproducts" element={<ManageProducts />} />
          <Route exact path="/addproducts" element={<AddProducts />} />
          <Route exact path="/allproducts" element={<AllProducts />} />
          <Route exact path="/categorywise" element={<CategoryWise />} />
          <Route exact path="/offerwise" element={<OfferWise />} />
          <Route exact path="/shopwise" element={<ShopWise />} />
          <Route exact path="/floorwise" element={<FloorWise />} />
          <Route exact path="/productdetails" element={<ProductDetails />} />
          <Route exact path="/compareproducts" element={<CompareProducts />} />
          <Route exact path="/manageshops" element={<ManageShops />} />
          <Route
            exact
            path="/managecategories"
            element={<ManageCategories />}
          />
          <Route exact path="/managefloors" element={<ManageFloor />} />
          <Route exact path="/manageoffers" element={<ManageOffers />} />
        </Route>
        <Route
          exact
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/allproducts" />}
        />
        <Route
          exact
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/allproducts" />}
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <CompareProvider>
      <UserProvider>
        <ProductProvider>
          <ShopProvider>
            <CategoryProvider>
              <FloorProvider>
                <OfferProvider>
                  <AppRoutes />
                </OfferProvider>
              </FloorProvider>
            </CategoryProvider>
          </ShopProvider>
        </ProductProvider>
      </UserProvider>
    </CompareProvider>
  );
}

export default App;
