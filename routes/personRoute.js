const express = require('express');
const router = express.Router();
const Person = require("../models/person");

router.post("/",async (req,res) => {
    try{
      // access data which sends from client side that is put in req.body by body parser
      const data = req.body;
  
      // make a blank object of person type and this person is of mongo schema
      const newPerson = new Person(data);
  
      // save data in mongo 
      // newPerson.save().then(() => console.log("Data Saaved")).catch((err) => "Some Error",err)
      const savedResponse = await newPerson.save();
      console.log("Data Saved !!");
      res.status(200).json(savedResponse);
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error!!"})
    }
  
});
  
router.get("/",async (req,res) => {
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

// export in server.js
module.exports = router;