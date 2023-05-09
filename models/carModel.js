const mongoose = require('mongoose');

let carSchema = mongoose.Schema({
    model:{
        type:Number,
        required:true
    },
    make:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    registration:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model("Cars", carSchema);