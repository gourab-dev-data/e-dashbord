import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getProductData();
    }, []);

    const getProductData = async () => {
        let result = await fetch("http://localhost:5000/api/v1/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        result = await result.json();
        if (result.status) {
            setProducts(result.data);
        }
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        result = await result.json();
        getProductData();
        //console.log(result);
    }

    const searchHandeler = async (event) => {
        const key = event.target.value;
        //console.log(key);
        if (key) {
            let result = await fetch(`http://localhost:5000/api/v1/products/search/${key}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                }
            });
            result = await result.json();
            if (result.status) {
                setProducts(result.data);
            }
            //console.log(result);
        } else {
            getProductData();
        }

    }
    return (
        <div className="productList">
            <div className="productListBox">
                <input type="text" className="searchInput" placeholder="Search Product" onChange={searchHandeler} />
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
                    {products && products.length > 0 ? (
                        products.map((item, index) => (
                            <ul key={item._id}>
                                <li>{index + 1}</li>
                                <li>{item.title}</li>
                                <li>{item.description}</li>
                                <li>{item.category}</li>
                                <li>{item.company}</li>
                                <li>{item.price}</li>
                                <li>
                                    <span onClick={() => deleteProduct(item._id)}><MdDelete /></span>
                                    <Link to={`/update/${item._id}`}><FaEdit /></Link>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <h3>No data found</h3>
                    )}
                    
                </div>
            </div>
        </div >

    )
}

export default ProductList;