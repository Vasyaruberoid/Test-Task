import { useEffect, useState } from "react";
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
  Container,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState<string>("all");

  // Загрузка продуктов при монтировании компонента
  useEffect(() => {
    dispatch(setProducts([]));
    fetchProducts().then((data) => {
      dispatch(setProducts(data));
    });
  }, [dispatch]);

  // Обработчик для переключения избранного
  const handleFavoriteToggle = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  // Обработчик для удаления продукта
  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  // Обработчик изменения фильтра
  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  // Применение фильтра
  const filteredProducts =
    filter === "favorites" ? products.filter((p) => p.isFavorite) : products;

  return (
    <Container>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Кнопки для фильтрации */}
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        onClick={() => handleFilterChange("all")}
        sx={{ mr: 1 }}
      >
        All
      </Button>
      <Button
        variant={filter === "favorites" ? "contained" : "outlined"}
        onClick={() => handleFilterChange("favorites")}
      >
        Favorites
      </Button>
      <Link to={`/Test-Task/create-product`}>
        <Button sx={{ float: "right", mt: 2 }}>Create Card</Button>
      </Link>
      <Grid container spacing={5} sx={{ mt: 2 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  height="200"
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3, // Ограничение до 3 строк
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="h6">{`$${product.price}`}</Typography>
                </CardContent>
              </Link>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // Останавливаем событие для ссылки
                  handleFavoriteToggle(product.id);
                }}
                color={product.isFavorite ? "primary" : "default"} // Используем primary, если в избранном
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // Останавливаем событие для ссылки
                  handleDelete(product.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
