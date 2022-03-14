const Joi = require("@hapi/joi");

//Register Validation
const managerRegisterValid = data => {
    const schema = Joi.object({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),  
        manager_type: Joi.string().min(6).required()

    });
    return schema.validate(data);
};

//Login Validation
const managerLoginValid = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};


module.exports.managerRegisterValid = managerRegisterValid;
module.exports.managerLoginValid = managerLoginValid;