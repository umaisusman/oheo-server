// const mongoose = require("mongoose");

// const businessAddressSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
//   business: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   country: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
// }, { timestamps: true });

// const BusinessAddress = mongoose.model("BusinessAddress", businessAddressSchema);
// module.exports = BusinessAddress;



// const mongoose = require("mongoose");

// const BusinessSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
//     business: { type: String, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     country: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Business", BusinessSchema);


const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    business: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);
