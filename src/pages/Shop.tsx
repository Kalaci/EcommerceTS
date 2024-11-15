import { useContext, useState } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const Shop = () => {
    const { products, activeReceipt, addToReceipt } = useContext(ReceiptContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const truncateTitleByChars = (title: string, maxChars: number) => {
        return title.length > maxChars ? title.substring(0, maxChars) + "..." : title;
    };

    const handleAddToCart = (productId: number) => {
        addToReceipt(productId, 1);
    };

    return (
        <>
            <Box sx={{ padding: "20px", backgroundColor: "#FBFBFB" }}>
                <TextField
                    label="Search by product title"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                    }}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "48%",
                                        md: "20%",
                                    },
                                    maxWidth: "400px",
                                }}
                            >
                                <Card
                                    sx={{
                                        height: "400px",
                                        padding: "16px",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image}
                                        alt={product.title}
                                        onClick={() => handleProductClick(product.id)}
                                    />
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                fontSize: { xm: "12px", sm: "14px", md: "14px", xl: "16px" },
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            {truncateTitleByChars(product.title, 25)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                WebkitLineClamp: {
                                                    xs: 2,
                                                    sm: 1,
                                                    md: 1,
                                                },
                                            }}
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                                            Price: ${product.price}
                                        </Typography>
                                    
                                        <Button
                                            sx={{
                                                padding: "6px 12px",
                                                fontSize: "14px",
                                                marginTop: "10px",
                                                color: "#5AB2FF"
                                            }}
                                            onClick={()=>handleAddToCart(product.id)}
                                        >
                                            Add To Cart
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    ) : (
                        <Typography>No products found</Typography>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Shop;
