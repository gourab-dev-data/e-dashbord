const productSchema = require("../models/products");

//@Dec      Get All Products
//@Routes   Get /api/v1/products
//@Acess    Public
exports.getProducts = async (req, res, next) => {
    //console.log(req.body);
    const userDeatils = await productSchema.find();
    if (userDeatils.length > 0) {
        res.status(200).json({ status: true, data: userDeatils });
    } else {
        res.status(200).json({ status: false, data: 'No data found.' });
    }
}

//@Dec      Get Single Product
//@Routes   Get /api/v1/products/:id
//@Acess    Public
exports.getProduct = async (req, res, next) => {
    console.log(req.params.id);
    const userDeatils = await productSchema.findById(req.params.id);
    if (userDeatils) {
        res.status(200).json({ status: true, data: userDeatils });
    } else {
        res.status(200).json({ status: false, data: 'No data found.' });
    }
}


//@Dec      Add Products
//@Routes   Post /api/v1/products
//@Acess    Public
exports.addProduct = async (req, res, next) => {
    console.log(req.body);
    const userDeatils = await productSchema.create(req.body);
    res.status(200).json({ status: true, data: userDeatils });
}


//@Dec      Delete Products
//@Routes   Post /api/v1/products/:id
//@Acess    Public
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);

        if (deletedProduct) {
            res.status(200).json({ status: true, data: 'Product deleted.' });
        } else {
            res.status(404).json({ status: false, data: 'No data found.' });
        }
    } catch (error) {
        next(error); // Pass to error-handling middleware
    }
}

//@Dec      Update Products
//@Routes   Post /api/v1/products/:id
//@Acess    Public
exports.updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (updateProduct) {
            res.status(200).json({ status: true, data: 'Product Updated.' });
        } else {
            res.status(404).json({ status: false, data: 'No data found.' });
        }
    } catch (error) {
        next(error); // Pass to error-handling middleware
    }
}

//@Dec      Get Search Products
//@Routes   Get /api/v1/products/search/:key
//@Acess    Public
exports.searchProducts = async (req, res, next) => {
    console.log(req.params.key);
    const userDeatils = await productSchema.find({
        "$or": [
            { 'title': { $regex: req.params.key } },
            { 'category': { $regex: req.params.key } },
            { 'company': { $regex: req.params.key } },
            { 'price': { $regex: req.params.key } }
        ]
    });
    if (userDeatils.length > 0) {
        res.status(200).json({ success: true, data: userDeatils });
    } else {
        res.status(200).json({ success: false, data: 'No data found.' });
    }
}