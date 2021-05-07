const { response } = require("express");
const { Product, Category } = require("../models");

const getProducts = async (req, res = response) => {
    const { desde = 0, limite = 5 } = req.query;
    const filter = { state:true };

    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'category', select: 'name' })
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        products
    });    
} 

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    
    const product = await Product.findById(id)
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'category', select: 'name' });
     
    res.status(200).json({
        product
    });
}


const createProduct = async (req, res = response) => {
    const { state, user, ...body } = req.body;
    
    if(body.precio){
        body.precio = Number(body.precio)
    }else{
        body.precio = 0;
    }

    //Generar los datos a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.authenticatedUser._id,
        precio: body.precio,
    }    

    const product = new Product(data);

    //Guardar el producto en DB
    try{
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno en el servidor"
        });
    }
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...body} = req.body;
    
    const data = {};
    data.user = req.authenticatedUser._id;
    if(body.name){ data.name = body.name.toUpperCase(); }
    if(body.precio){ data.precio = Number(body.precio); }
    if(body.category){ data.category = body.category; }

    console.log("Datos: ", data);

    const product = await Product.findByIdAndUpdate( id, data, { new:true });

    res.json( product );
}    

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    
    //Delete Físico de un Producto
    //const product = await Product.findByIdAndDelete( id );

    //Delete Lógico de un Producto
    const product = await Product.findByIdAndUpdate( id, { state: false }, { new:true });

    res.json(product);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}