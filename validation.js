const Joi = require('joi')

const validate = (body) => {
const schema = Joi.object(
    {
        title: Joi.string().min(3).max(30).required(),
        note: Joi.string().min(3).max(100).required()
    }
)

const validation = schema.validate(body)

    if(!validation.error) return {
    status:200
        }
    return {
        status:400,
        error: validation.error.details[0].message
    }
}

const dummyFunc = () => {
    console.log("You're dumb")
}

module.exports = {
    validate,
    dummyFunc
}