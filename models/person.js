const mongoose = require('mongoose');

// define the person schema ki wo dikhega kaisa
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    } ,
    age: {
        type:Number,
    },
    work:{
        type:String,
        enum:["manager","chef","waiter"],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        required:true
    }
});

// isme person schema ko model me bana rahe hai
const Person = mongoose.model("Person",personSchema)

module.exports = Person;