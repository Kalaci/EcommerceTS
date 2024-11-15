import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Button, TextField, Typography, Box, Grid2 } from "@mui/material";

const ProductPage = () => {
    const { id } = useParams(); 
    const { products, addToReceipt, deleteProduct } = useContext(ReceiptContext);
    const navigate = useNavigate();
    
    const [product, setProduct] = useState<any>(null); 
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        if (id) {
            const foundProduct = products.find((product) => product.id.toString() === id);
            setProduct(foundProduct);
        }
    }, [id, products]);

    if (!product) return <Typography>Product not found</Typography>;

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAddToCart = () => {
        addToReceipt(product.id, quantity);
    };

    const handleDeleteProduct = () => {
        deleteProduct(product.id);
        navigate('/');
    };

    const handleEditProduct = () => {
        navigate(`/edit-product/${product.id}`);
    };

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#FBFBFB" }}>
            <Grid2 container>
                <Grid2  size={{xs:12, md:6}} >
                    <img
                        src={product.image}
                        style={{ width: "100%", height: "auto", maxWidth: "400px" }}
                    />
                </Grid2>

                <Grid2 size={{xs:12, md:6}} >
                    <Typography style={{ color: "#1976d2"}} variant="h4">{product.title}</Typography>
                    <Typography style={{ color: "#1976d2"}} variant="h6">${product.price}</Typography>
                    <Typography style={{ color: "#1976d2"}} variant="body1" sx={{ marginTop: "10px" }}>
                        {product.description}
                    </Typography>

                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        sx={{ marginTop: "20px", width: "100px", color: "white"}}
                        
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                        <Button variant="contained" color="primary" onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleEditProduct}>
                            Edit Product
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleDeleteProduct} >
                            Delete Product
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ProductPage;
