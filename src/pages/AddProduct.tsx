import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid2, Container } from '@mui/material';
import { ReceiptContext } from "../context/ReceiptProvider";
import { Product } from '../context/ReceiptProvider';

const AddProduct = () => {
  const { id } = useParams();  
  const { products, addProduct, editProduct } =  useContext(ReceiptContext);  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Product>();
  const navigate = useNavigate();  

  useEffect(() => {
    if (id) {
      const productToEdit = products.find(product => product.id === parseInt(id));
      if (productToEdit) {
        setValue("title", productToEdit.title);
        setValue("price", productToEdit.price);
        setValue("category", productToEdit.category);
        setValue("description", productToEdit.description);
        setValue("image", productToEdit.image);
      }
    }
  }, [id, products, setValue]);

  const onSubmit = async (data: Product) => {
    if (id) {
      const fullData = {...data, id: Number(id)};
      editProduct(fullData);
      navigate('/');
    } else {
      await addProduct(data);
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <h1 style={{ color: "#1976d2"}}>{id ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs:12}}>
          <TextField
              fullWidth
              label="Product Title"
              variant="outlined"
              {...register("title", { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid2>
          <Grid2  size={{xs:12}}>
            <TextField
              fullWidth
              label="Price"
              variant='outlined'
              type="number"
              {...register("price", {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be a positive number' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              />
          </Grid2>
          <Grid2 size={{xs:12}}>
          <TextField
              fullWidth
              label="Product Description"
              variant="outlined"
              {...register("description")}
            />
          </Grid2>
          <Grid2 size={{xs:12}}>
          <TextField
              fullWidth
              label="Product Image URL"
              variant="outlined"
              {...register("image")}
            />
          </Grid2>
          <Grid2 size={{xs:12}}>
            <Button variant="contained" color="primary" type="submit">
              {id ? 'Update Product' : 'Add Product'}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
};

export default AddProduct;
