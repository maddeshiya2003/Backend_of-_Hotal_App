const express = require('express');
const router = express.Router();
const MenuItem = require("../models/menu");

router.get("/",async (req,res) => {
    try{
      const menuData = await MenuItem.find();
      console.log("Data Found !!");
      res.status(200).json(menuData);
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"})
    }
});
  
router.post("/",async (req,res) => {
    try{
      const data = req.body;
      const menuResponse = new MenuItem(data);
      let savedResponse = await menuResponse.save();
      console.log("Data Found !!");
      res.status(200).json(savedResponse);
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"})
    }
});

router.get("/:tasteType",async (req,res) => {
  try{
    let tasteType = req.params.tasteType;
    // if(tasteType === "Spicy" || tasteType === "Sour" || tasteType === "Sweet"  ){
      const menuData = await MenuItem.find({taste:tasteType});
      console.log("Data Found !!");
      res.status(200).json(menuData);
    // } else {
    //   res.status(404).json({error:"Invalid Taste Type!!"})
    // }

  } 
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"})
  }
});

router.put("/:id",async (req,res) => {
  try {
    let id = req.params.id;
    let updateData = req.body;

    let record = await MenuItem.findByIdAndUpdate(id,updateData,{
      runValidators:true,
      new:true
    });

    if(!record){
      return res.status(404).json({error:"Invalid Menu Item"});
    }
    
    console.log("Menu Updated !!");
    res.status(200).json(record);
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Internal Server Error"})
  }
});

router.delete("/:id",async (req,res) => {

  try {
    let id = req.params.id;
    let record = await MenuItem.findByIdAndDelete(id);

    if(!record){
      return res.status(404).json({error:"Menu Not Found"});
    }

    console.log("Menu Deleted")
    res.status(200).json("Menu Deleted")

  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Internal Server Error"});
  }

});

module.exports = router;