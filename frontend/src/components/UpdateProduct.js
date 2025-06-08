import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const id = params.id;
    const token = JSON.parse(localStorage.getItem("token"));

    // Memoizing getProduct to avoid unnecessary re-renders
    const getProduct = useCallback(async () => {
        let result = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        result = await result.json();
        let data = result.data;
        //console.log(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setCompany(data.company);
        setPrice(data.price);
    }, [id]); // Only change when the id changes

    useEffect(() => {
        getProduct();
    }, [getProduct]); // Ensure getProduct is called when it's updated

    const collectProductData = async () => {
        if (!title || !description || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const raw = JSON.stringify({
            "title": title,
            "description": description,
            "price": price,
            "category": category,
            "userId": userId,
            "company": company
        });
        let result = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
            method: "PUT",
            body: raw,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        result = await result.json();
        //console.log(result);
        navigate('/');
    }

    return (
        <div className="updateProduct">
            <div className="updateProductBox">
                <h3>Update Product</h3>
                <input type="text" className="inputbox" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                {error && !title ? <span className="invalidError">Enter valid title</span> : ''}
                <textarea className="inputbox" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                {error && !description ? <span className="invalidError">Enter valid description</span> : ''}
                <input type="text" className="inputbox" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                {error && !price ? <span className="invalidError">Enter valid price</span> : ''}
                <input type="text" className="inputbox" placeholder="Product Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                {error && !category ? <span className="invalidError">Enter valid category</span> : ''}
                <input type="text" className="inputbox" placeholder="Product Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                {error && !company ? <span className="invalidError">Enter valid company</span> : ''}
                <button className="appButton" onClick={collectProductData} type="button">Submit</button>
            </div>
        </div>
    );
}

export default UpdateProduct;
