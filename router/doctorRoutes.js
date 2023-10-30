const express = require("express");
const { DoctorModel } = require("../model/doctorModel");
const {Datemidlleware} = require("../middleware/datemiddleware")

const doctorRouter = express.Router();

doctorRouter.post("/appointments",Datemidlleware, async (req, res) => {
  const payload = req.body;
  try {
    const DoctorDetails = new DoctorModel(payload);
    await DoctorDetails.save();
    res
      .status(200)
      .json({ msg: "appointments Booked Successfully", DoctorDetails });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

doctorRouter.get("/", async (req, res) => {
  const filter = {};
  const sort = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  if (req.query.specialization) {
    filter.specialization = req.query.specialization;
  }

  if (req.query.sort) {
    if (req.query.sort === "asc") {
      sort.date = 1;
    }
    if (req.query.sort === "desc") {
      sort.date = -1;
    }
  }

  if (req.query.search) {
    filter.name = { $regex: `${req.query.search}`, $options: "i" };
  }
  console.log(sort, filter);

  try {
    const appointments = await DoctorModel.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
    res
      .status(200)
      .json({ msg: "Appointments data fetched Successfully", appointments });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

doctorRouter.patch("/update/:id",async(req,res)=>{
    const {id}= req.params;
    try {
        const found = await DoctorModel.findById(id);
        if(found){
            await DoctorModel.findByIdAndUpdate(id,req.body);
            res.status(200).json({"msg":"Appointments updates successfully!"})
        }else{
            res.status(200).json({"msg":"Appointments not found"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})

doctorRouter.delete("/delete/:id",async(req,res)=>{


    const {id}= req.params;
    try {
        const found = await DoctorModel.findById(id);
        if(found){
            await DoctorModel.findByIdAndDelete({_id:id});
            res.status(200).json({"msg":"Appointments deleted successfully!"})
        }else{
            res.status(200).json({"msg":"Appointments not found"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Internal Server Error"})
    }
})


module.exports = { doctorRouter };
