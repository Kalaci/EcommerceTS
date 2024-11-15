import { useContext, useState } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Card, CardContent, CardMedia, Typography, Grid2, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const { products } = useContext(ReceiptContext);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: "20px", backgroundColor: "#FBFBFB" }}>
            <TextField
                label="Search by product title"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <Grid2 container spacing={3}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <Card
                                style={{
                                    width: "400px",
                                    height: "400px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                                onClick={() => handleProductClick(product.id)}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            WebkitLineClamp: 4,
                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                                        Price: ${product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                ) : (
                    <Typography>No products found</Typography>
                )}
            </Grid2>
        </div>
    );
};

export default Homepage;
