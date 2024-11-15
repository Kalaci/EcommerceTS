import { createContext, ReactElement, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";


// const initProducts:Product[] = []

// const sampleProducts = [
//     { id: 1, name: "Sample Product 1", price: 10 },
//     { id: 2, name: "Sample Product 2", price: 15 },
// ];

export interface Product{
    id :number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}
interface CartItem {
    productId: number;
    quantity: number;
    title: string;
    price: number;
}

export interface Receipt {
    id: number;
    items: CartItem[];
    totalAmount: number;
}

interface ReceiptContextType {
    activeReceipt: Receipt | null;
    receipts: Receipt[];
    products: Product[];
    addToReceipt: (productId: number, quantity: number) => void;
    removeFromReceipt: (productId: number, quantity: number) => void;
    clearActiveReceipt: () => void;
    addToPurchaseHistory: () => void;
    addProduct: (product: Product) => Promise<void>;
    editProduct: (product: Product) => Promise<void>;
    deleteProduct: (productId: number) => void;
}

const defaultContextValue: ReceiptContextType = {
    activeReceipt: null,
    receipts: [],
    products: [],
    addToReceipt: () => {},  
    removeFromReceipt: () => {},  
    clearActiveReceipt: () => {},  
    addToPurchaseHistory: () => {},
    addProduct: async (product: Product): Promise<void> => {},
    editProduct: async (product: Product): Promise<void> => {},
    deleteProduct: (productId: number) => {},
}


export const ReceiptContext = createContext<ReceiptContextType>(defaultContextValue);


type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ReceiptProvider = ({ children }: ChildrenType)=>{
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [activeReceipt, setActiveReceipt] = useState<Receipt | null>(null);
    const {products: fetchedProducts } = useFetch('https://fakestoreapi.com/products');
    const [products, setProducts] = useState<Product[]>([]); 

    useEffect(()=>{

        try {
            const storedActiveReceipt = JSON.parse(localStorage.getItem('activeReceipt') || 'null');
            if (storedActiveReceipt) setActiveReceipt(storedActiveReceipt);

            const storedReceipts = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
            setReceipts(storedReceipts);
            
        } catch (error) {
            console.error("Error from localStorage:", error);
        }

    },[])

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        if (storedProducts.length > 0) {
          setProducts(storedProducts);
        } else {
          setProducts(fetchedProducts);
          localStorage.setItem("products", JSON.stringify(fetchedProducts));
        }
      }, [fetchedProducts]);


    const saveReceiptToStorage = (activeReceipt: Receipt) => {
        try {
            if(activeReceipt.items.length === 0){
                localStorage.removeItem('activeReceipt');
            }else{
            localStorage.setItem("activeReceipt", JSON.stringify(activeReceipt));
            }
        } catch (error) {
            console.error(`Error saving to localStorage: ${error}`);
        }
    };


    const addToReceipt = (productId: number, quantity: number) => {
        if (!activeReceipt) {
            const product = products.find((item) => item.id === productId);
            if (!product) return;

            const newReceipt: Receipt = {
                id: Date.now(),
                items: [{ productId, quantity, title: product.title, price: product.price }],
                totalAmount: product.price * quantity,
            };
            saveReceiptToStorage(newReceipt)
            setActiveReceipt(newReceipt);
        } else {
            const updatedItems = [...activeReceipt.items];
            const itemIndex = updatedItems.findIndex((item) => item.productId === productId);

            if (itemIndex >= 0) {
                updatedItems[itemIndex].quantity += quantity;
            } else {
                const product = products.find((item) => item.id === productId);
                if (!product) return;

                updatedItems.push({
                    productId,
                    quantity,
                    title: product.title,
                    price: product.price,
                });
            }

            const updatedReceipt = {
                ...activeReceipt,
                items: updatedItems,
                totalAmount: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };
            saveReceiptToStorage(updatedReceipt)
            setActiveReceipt(updatedReceipt);
        }
    };

    const removeFromReceipt = (productId: number, quantity: number) => {
        if (!activeReceipt) return;

        const updatedItems = activeReceipt.items
            .map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - quantity }
                    : item
            )
            .filter((item) => item.quantity > 0);

        const updatedReceipt = {
            ...activeReceipt,
            items: updatedItems,
            totalAmount: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
        setActiveReceipt(updatedItems.length ? updatedReceipt : null);
        saveReceiptToStorage(updatedReceipt);
    };

    const clearActiveReceipt = () => {
        localStorage.removeItem('activeReceipt');
        setActiveReceipt(null);
    };

    const addToPurchaseHistory= () =>{
        if (!activeReceipt) return;

        const currentReceiptsHistory: Receipt[] = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
        const updatedReceiptHistory = [...currentReceiptsHistory, activeReceipt];

        setReceipts(updatedReceiptHistory);
        setActiveReceipt(null);

        localStorage.setItem('purchaseHistory', JSON.stringify(updatedReceiptHistory));
        localStorage.removeItem('activeReceipt');
    }
    
    const addProduct = async (product: Product) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const newProduct = await response.json();
            setProducts((prevProducts) => [...prevProducts, newProduct]);

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const editProduct = async (product: Product) =>{
        console.log("Editing product:", product);
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
              }),
            });
            if (!response.ok) {
              throw new Error('Failed to update the product');
            }

            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map((prod) =>
                  prod.id === updatedProduct.id ? { ...prod, ...updatedProduct } : prod
                )
            );
          } catch (error) {
            console.error('Error updating product:', error);
          }
    }

    const deleteProduct = (productId: number) =>{
        setProducts((prevProducts) => 
            prevProducts.filter((item) => item.id !== productId)
        );
    }

    const value: ReceiptContextType = {
        activeReceipt,
        receipts,
        products,
        addToReceipt,
        removeFromReceipt,
        clearActiveReceipt,
        addToPurchaseHistory,
        addProduct,
        editProduct,
        deleteProduct,
    };
    return (
        <ReceiptContext.Provider value={value}>
            {children}
        </ReceiptContext.Provider>
    );
}
