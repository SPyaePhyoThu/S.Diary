const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const User = require("./userModel");

const diarySchema = new Schema(
  {
    feeling: {
      type: Array,
      required: true,
    },
    about: {
      type: Array,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user"],
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// diarySchema.pre(/^find/, function (next) {
//   this.populate({ path: "user", select: "name _id" });

//   next();
// });

module.exports = mongoose.model("Diary", diarySchema);
