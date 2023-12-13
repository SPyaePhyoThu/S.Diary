const Diary = require("../models/diaryModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const mongoose = require("mongoose");

//get all diaries
exports.getAllDiaries = catchAsync(async (req, res, next) => {
  const diaries = await Diary.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: diaries,
    },
  });
});

//get a single diary
exports.getDiary = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("No Diary found with that Id", 404));
  }
  const diary = await Diary.findById(id);

  if (!diary) {
    return next(new AppError("No Diary found with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: diary,
    },
  });
});

//create new Diary
exports.createDiary = catchAsync(async (req, res, next) => {
  const { feeling, about, details } = req.body;

  let emptyFields = [];

  if (!feeling) {
    emptyFields.push("feeling");
  }
  if (!about) {
    emptyFields.push("about");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (emptyFields.length > 0) {
    return next(new AppError("Please fill in all fields.", 404));
  }

  const newDiary = await Diary.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newDiary,
    },
  });
});

//delete a diary
exports.deleteDiary = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("No Diary found with that Id", 404));
  }
  const diary = await Diary.findByIdAndDelete(req.params.id);

  if (!diary) {
    return next(new AppError("No Diary found with that Id", 404));
  }

  res.status(204).json({
    status: "success",
    data: diary,
  });
});

//update Diary
exports.updateDiary = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("No Diary found with that Id", 404));
  }

  const diary = await Diary.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!diary) {
    return next(new AppError("No Diary found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: diary,
  });
});

exports.getMomentsOfTheMonth = catchAsync(async (req, res, next) => {
  const starredDiary = await Diary.aggregate([
    {
      $match: { selected: true },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
