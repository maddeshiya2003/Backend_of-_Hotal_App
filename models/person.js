const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre("save", async function(next) {
    const person = this;

    try {

        if(!person.isModified("password"))  return next();

        // random salt like: !@#$%^&*()?|/\[}+=<.,
        const salt = await bcrypt.genSalt(10);

        // mix user given password and salt to genetate hashedpassword
        const hashedPassword = await bcrypt.hash(person.password,salt)

        // override user password to hashedpassword
        person.password = hashedPassword;

        next();
 
    } catch (err) {
        next(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}


// isme person schema ko model me bana rahe hai
const Person = mongoose.model("Person",personSchema)

module.exports = Person;