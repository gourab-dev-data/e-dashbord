import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductData();
    }, []);

    const getProductData = async () => {
        let result = await fetch("http://localhost:5000/api/v1/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        setProducts(result.data);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        getProductData();
        console.log(result);
    }
    return (
        <div className="productList">
            <div className="productListBox">
                <h3>Product List</h3>
                <div className="productListTable">
                    <ul>
                        <li>Sl No</li>
                        <li>Title</li>
                        <li>Description</li>
                        <li>Category</li>
                        <li>Company</li>
                        <li>Price</li>
                        <li>Action</li>
                    </ul>
                    {
                        products.map((item, index) =>
                            <ul key={item._id}>
                                <li>{index + 1}</li>
                                <li>{item.title}</li>
                                <li>{item.description}</li>
                                <li>{item.category}</li>
                                <li>{item.company}</li>
                                <li>{item.price}</li>
                                <li onClick={() => deleteProduct(item._id)}><MdDelete /></li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default ProductList;