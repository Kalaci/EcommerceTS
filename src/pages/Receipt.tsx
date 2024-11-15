import { useContext } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Button, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Receipt = () => {
    const { activeReceipt, removeFromReceipt, clearActiveReceipt, addToPurchaseHistory } = useContext(ReceiptContext);

    if (!activeReceipt) {
        return (
            <Box sx={{ padding: "20px" }}>
                <Typography variant="h6">Your cart is empty.</Typography>
            </Box>
        );
    }

    const handleCheckout = () =>{
        addToPurchaseHistory();
        clearActiveReceipt();
    }

    const handleRemove = (productId: number) => {
        removeFromReceipt(productId, 1);
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">Your Cart</Typography>
            <List>
                {activeReceipt.items.map((item) => (
                    <div key={item.productId}>
                        <ListItem>
                            <ListItemText
                                primary={item.title}
                                secondary={`Price: $${item.price} | Quantity: ${item.quantity}`}
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemove(item.productId)}
                            >
                                Remove
                            </Button>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>

            <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Total: ${activeReceipt.totalAmount}
            </Typography>

            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={clearActiveReceipt}
                >
                    Clear Cart
                </Button>
            </Box>
        </Box>
    );
};

export default Receipt;
