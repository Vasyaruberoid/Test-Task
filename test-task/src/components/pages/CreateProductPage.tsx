import { useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../../feature/productsSlice"; // убедитесь, что этот экшен добавляет продукт в store
import { Product } from "../../feature/productsSlice";
import { Link } from "react-router-dom";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = () => {
    if (!title || !image || !description || price <= 0) {
      alert("Please fill in all fields correctly!");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      image,
      description,
      price,
      isFavorite: false,
    };

    dispatch(addProduct(newProduct));

    setTitle("");
    setImage("");
    setDescription("");
    setPrice(0);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Product
          </Button>
          <Link to={`/Test-Task/products`}>
            <Button sx={{ float: "right", mt: 2 }}>BACK TO PRODUCTS</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProductPage;
