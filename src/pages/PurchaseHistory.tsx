import { useContext } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Receipt } from "../context/ReceiptProvider";
import  Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"; 
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const PurchaseHistory = () => {
    const { receipts } = useContext(ReceiptContext);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{color: "#5AB2FF"}} gutterBottom>
                Purchase History
            </Typography>
            {receipts.length === 0 ? (
                <Typography variant="body1" color="primary">
                    No purchases found.
                </Typography>
            ) : (
                receipts.map((receipt: Receipt) => (
                    <Card key={receipt.id} sx={{ marginBottom: 2, border: "1px solid #ccc" }}>
                        <CardContent>
                            <Typography variant="h6" sx={{color: "#5AB2FF"}}>
                                Receipt ID: {receipt.id}
                            </Typography>
                            <Typography variant="body1" color="primary">
                                Total Amount: ${receipt.totalAmount.toFixed(2)}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" sx={{ marginTop: 1 }}>
                                Items:
                            </Typography>
                            <List>
                                {receipt.items.map((item) => (
                                    <ListItem key={item.productId} disableGutters>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={`Quantity: ${item.quantity} - Price: $${item.price}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default PurchaseHistory;
