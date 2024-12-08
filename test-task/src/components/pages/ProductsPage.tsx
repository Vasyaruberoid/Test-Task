import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  toggleFavorite,
  removeProduct,
} from "../../feature/productsSlice";
import { fetchProducts } from "../../api/productsApi";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  TextField,
  InputAdornment,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(setProducts([]));
    fetchProducts().then((data) => {
      dispatch(setProducts(data));
    });
  }, [dispatch]);

  const handleFavoriteToggle = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredProducts =
    filter === "favorites" ? products.filter((p) => p.isFavorite) : products;

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleFilterChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
      />
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  height="200"
                />
              </Link>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">
                  {product.description.slice(0, 100)}...
                </Typography>
                <Typography variant="h6">{`$${product.price}`}</Typography>
              </CardContent>
              <IconButton onClick={() => handleFavoriteToggle(product.id)}>
                <FavoriteIcon
                  // color={product.isFavorite ? "secondary" : "default"}
                />
              </IconButton>
              <IconButton onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsPage;
