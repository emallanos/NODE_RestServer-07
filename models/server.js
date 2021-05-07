const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        let patch = "/api";

        this.paths = {
            auth: patch + "/auth",
            buscar: patch + "/busqueda",
            categorias: patch + "/categorias",
            productos: patch + "/productos",
            usuarios: patch + "/usuarios"
        }

        //Conectar a Base de Datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Lectura parseo del body
        this.app.use( express.json() );    

        //Directorio Publico
        this.app.use( express.static('public') );
    }

    routes(){
        let patch = "../routes/";

        this.app.use(this.paths.auth, require(patch + 'authService'));
        this.app.use(this.paths.categorias, require(patch + 'categoriesService'));
        this.app.use(this.paths.productos, require(patch + 'productService'));
        this.app.use(this.paths.buscar, require(patch + 'searchService'));
        this.app.use(this.paths.usuarios, require(patch + 'userService'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server;