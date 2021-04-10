const { request, response } = require('express'); 

const isAdminRole = (req = request, res = response, next) => {
    
    if(!req.authenticatedUser){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, name} = req.authenticatedUser;

    if(role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${name} no es un usuario administrador`
        });
    }

    next();    
}

const containsRole = (...roles) => {
    return (req = request, res = response, next) => {
        
        if(!req.authenticatedUser){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.authenticatedUser.role)){
            return res.status(401).json({
                msg: `Se requiere que el usuario autenticador posea uno de los siguientes roles ${roles}`
            });
        }
        
        next();
    }
}
    

module.exports = {
    isAdminRole, containsRole
}