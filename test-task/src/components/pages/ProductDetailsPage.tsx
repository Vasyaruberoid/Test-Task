import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import { Button, Typography, Container } from "@mui/material";
import { Product } from "../../feature/productsSlice";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <img src={product.image} alt={product.title} style={{ width: "20%" }} />
      <Typography variant="h4">{product.title}</Typography>
      <Typography variant="h6">{`$${product.price}`}</Typography>
      <Typography>{product.description}</Typography>
      <Link to="/Test-Task/products">
        <Button
          sx={{ float: "right", mt: 2 }}
          variant="contained"
          color="primary"
        >
          Back to Products
        </Button>
      </Link>
    </Container>
  );
};

export default ProductDetailPage;
