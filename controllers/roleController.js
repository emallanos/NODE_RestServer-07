const Role = require('../models/role');

const getRoles = async () =>{

    console.log("ENTRO");

    const [total, roles] = await Promise.all([
        Role.countDocuments(),
        Role.find()
    ]);

    console.log("Total: ", total, " Roles: ", roles);

    return roles;
}

module.exports = {
    getRoles
}