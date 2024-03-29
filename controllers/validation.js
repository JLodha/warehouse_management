const Joi = require("@hapi/joi");

//Register Validation
const managerRegisterValid = data => {
    const schema = Joi.object({
        name1 : Joi.string().min(1).required(), 
        email: Joi.string().min(5).required(),
        password: Joi.string().min(1).required(),  
        manager_type: Joi.string().min(6).required()

    });
    return schema.validate(data);
};

//Login Validation
const managerLoginValid = data => {
    const schema = Joi.object({
        email2: Joi.string().min(5).required().email(),
        password2: Joi.string().min(1).required(),
        listbox2: Joi.string().min(2).required()
    });
    return schema.validate(data);
};


module.exports.managerRegisterValid = managerRegisterValid;
module.exports.managerLoginValid = managerLoginValid;