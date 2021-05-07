const { response } = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {
    const { desde = 0, limite = 5 } = req.query;
    const filter = { state:true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
        .populate('user','name')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categories
    });    
} 

const getCategory = async (req, res = response) => {
    const { id } = req.params;
    
    const category = await Category.findById(id).populate('user','name');
     
    res.status(200).json({
        category
    });
}


const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if(categoryDB){
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name }, ya existe`
        });
    }
    
    //Generar los datos a guardar
    const data = {
        name,
        user: req.authenticatedUser._id
    }    

    const category = new Category(data);

    //Guardar la categoria en DB
    try{
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno en el servidor"
        });
    }
}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data} = req.body;
    
    data.name = data.name.toUpperCase();
    data.user = req.authenticatedUser._id;
    
    const category = await Category.findByIdAndUpdate( id, data, { new:true });

    res.json( category );
}    

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    
    //Delete Físico de una Categoria
    //const category = await Category.findByIdAndDelete( id );

    //Delete Lógico de una Categoria
    const category = await Category.findByIdAndUpdate( id, { state: false }, { new:true });

    res.json(category);
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}