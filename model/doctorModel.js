const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    specialization: { type: String, required: true },
   experience: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    slots: { type: Number, required: true },
    fee: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const DoctorModel = mongoose.model("doctor", DoctorSchema);
module.exports = { DoctorModel };
