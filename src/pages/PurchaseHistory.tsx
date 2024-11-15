import { useContext } from "react";
import { ReceiptContext } from "../context/ReceiptProvider";
import { Receipt } from "../context/ReceiptProvider";

const PurchaseHistory = () => {
    const { receipts } = useContext(ReceiptContext);

    return (
        <div>
            <h1>Purchase History</h1>
            {receipts.length === 0 ? (
                <p>No purchases found.</p>
            ) : (
                receipts.map((receipt) => (
                    <div key={receipt.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>Receipt ID: {receipt.id}</h3>
                        <p>Total Amount: ${receipt.totalAmount.toFixed(2)}</p>
                        <h4>Items:</h4>
                        <ul>
                            {receipt.items.map((item) => (
                                <li key={item.productId}>
                                    {item.title} - Quantity: {item.quantity} - Price: ${item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default PurchaseHistory;
