import React, { useState } from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../../feature/productsSlice";
import { Product } from "../../feature/productsSlice";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(), // временное значение для id
      title,
      image,
      description,
      price,
      isFavorite: false,
    };
    dispatch(addProduct(newProduct));
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateProductPage;
