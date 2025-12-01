const mongoose = require("mongoose")

const userPropertySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    amenities: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: false
    },   
})

const user_property = mongoose.model('user_property', userPropertySchema);
module.exports =user_property


// ///////////case 1
// const a=1
// const b=1
// module.exports.a=a
// module.exports.b=b

// const {a,b} = require("../myfile")

// ////////////case 2
// const a=1
// module.exports.a=a

// const {a} = require("../myfile")

// ////////////case 3
// module.exports.a=1
// const {a} = require("../myfile")

// ////////////case 4
// const a=1
// module.exports=a
// const a = require("../myfile")
