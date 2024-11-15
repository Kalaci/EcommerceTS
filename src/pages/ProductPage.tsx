import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Button, TextField, Typography, Box } from "@mui/material";

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
        <Box sx={{ padding: "20px", backgroundColor: "#FBFBFB", minHeight: "100vh" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                {/* Left: Image Section */}
                <Box
                    sx={{
                        flex: "1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "400px",
                            borderRadius: "8px",
                        }}
                    />
                </Box>

                {/* Right: Text Section */}
                <Box
                    sx={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        textAlign: "left",
                        gap: "20px",
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#5AB2FF", fontWeight: "bold" }}>
                        {product.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5AB2FF" }}>
                        ${product.price}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ marginTop: "10px", color: "#555", lineHeight: "1.5" }}
                    >
                        {product.description}
                    </Typography>


                    <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "20px" , alignSelf: "center"}}>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            sx={{
                                marginTop: "20px",
                                width: "100px",
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#5AB2FF", color: "#FFF" }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleEditProduct}>
                            Edit Product
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ color: "red", borderColor: "red" }}
                            onClick={handleDeleteProduct}
                        >
                            Delete Product
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
