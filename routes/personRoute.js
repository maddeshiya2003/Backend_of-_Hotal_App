const express = require('express');
const router = express.Router();
const Person = require("../models/person");
const {jwtAuthMiddleware,generateToken} = require("../jwtToken");

// signup route

router.post("/signup",async (req,res) => {
    try{
      // access data which sends from client side that is put in req.body by body parser
      const data = req.body;
  
      // make a blank object of person type and this person is of mongo schema
      const newPerson = new Person(data);
  
      // save data in mongo 
      // newPerson.save().then(() => console.log("Data Saaved")).catch((err) => "Some Error",err)
      const savedResponse = await newPerson.save();
      console.log("Data Saved !!");

      // this paylod is used for what to save in that token
      const paylod = {
        id : savedResponse.id,
        username : savedResponse.username
      }

      // to generate that token and this generateToken function is came from jwtToken.js file
      const token = generateToken(paylod);
      console.log("Genetared Token is:", token)

      // send saved response and token also
      res.status(200).json({savedResponse:savedResponse, token:token});
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error!!"})
    }
  
});

// login route

router.post("/login",async (req,res) => {
  try{
    // extract username password of login user who login 
    const {username,password} = req.body;

    // check username password are valid or not
    const user = await Person.findOne({username:username});

    // if user doesnot match username and password then return error
    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json({error:"Invalid username or password"});
    }

    // generate token 
    const paylod = {
      id:user.username,
      id:user.id
    }
    const token = generateToken(paylod);

    // return token as response
    res.json({token});
    
  } 
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error!!"}) 
  }

});

// profile route

router.get("/profile", jwtAuthMiddleware, async (req,res) =>{
  try{
    const userData = req.user;
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json(user);
  } 
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error!!"})
  }
})

router.get("/",jwtAuthMiddleware,async (req,res) => {
    try{
      let data = await Person.find();
      console.log("Data Found !!");
      res.status(200).json(data);
    }
    catch(err) {
      console.log(err);
      res.status(500).json({error:"Internal Server Error!!"})
    }
});

router.get("/:workType",async (req,res) => {
  try{
    let workType = req.params.workType;
    if(workType === "manager"|| workType === "chef" || workType === "waiter" ){
      const data = await Person.find({work:workType});
      console.log("Data Found !!");
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error:"Invalid Work Type!!"})
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error:"Internal Server Error!!"})
  }
});


router.put("/:id",async (req,res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const response = await Person.findByIdAndUpdate(id,updatedData,{
      runValidators:true,
      new:true
    }); 
    
    if(!response){
      return res.status(404).json({error:"Person Not Found!!"});
    }

    console.log("Data Updated !!");
    res.status(200).json(response);    

  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Internal Server Error!!"})
  }
});

router.delete("/:id", async (req,res) => {
  try{
    const id = req.params.id;

    let deleteData = await Person.findByIdAndDelete(id);

    if(!deleteData){
      return res.status(404).json({error:"Person Not Found!!"});
    }

    console.log("Data Delete");
    res.status(500).json("Data Delete")

  } 
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error!!"})
  }
})

module.exports = router;