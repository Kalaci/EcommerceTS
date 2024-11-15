import {useState, useEffect} from "react";

interface Product{
    id :number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

interface FetchReturnType{
    products: Product[];
}


const useFetch = (url: string): FetchReturnType=>{
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch(url)
            .then(res=>res.json())
            .then((data)=>setProducts(data))
            .catch((error) => console.error("Fetch error:", error));
    }, [url]);

    return { products };
}

export default useFetch;