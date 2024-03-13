const mongoose = require('mongoose');

// define the person schema ki wo dikhega kaisa
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        required:true,
        enum:["Spicy","Sour","Sweet"]
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:Array,
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
});

// isme person schema ko model me bana rahe hai
const MenuItem = mongoose.model("MenuItem",menuItemSchema)

module.exports = MenuItem;