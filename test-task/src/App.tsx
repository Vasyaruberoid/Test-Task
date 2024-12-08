import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetailPage from "./components/pages/ProductDetailsPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import { Container } from "@mui/material";
import Error404 from "./components/pages/Error404";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/Test-Task"
            element={<Navigate to="/Test-Task/products" />}
          />
          <Route path="/Test-Task/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/Test-Task/create-product"
            element={<CreateProductPage />}
          />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
