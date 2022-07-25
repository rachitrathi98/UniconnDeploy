const mongoose = require("mongoose");
const Teacher = require("./teacher");
const { ObjectId } = require('mongoose').Types;

const reviewSchema = new mongoose.Schema({
  // for_whom
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  //by_whom
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  rating: {
    type: Number,
    min: [1, `Can't rate less than 1 star`],
    max: [5, `Can't rate more than 5 stars`],
    required: [true, "Review must have a rating"],
  },

  isAnonymous: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  comments: String,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
},
  { timestamps: true },
);

reviewSchema.index({ teacherId: 1, studentId: 1 }, { unique: true });


reviewSchema.statics.calcAverageRatings = async function(teacherId) {
  const stats = await this.aggregate([
    {
      $match: { teacherId: teacherId }
    },
    {
      $group: {
        _id: '$teacherId',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Teacher.findByIdAndUpdate(teacherId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Teacher.findByIdAndUpdate(teacherId, {
      ratingsQuantity: 0,
      ratingsAverage: 3
    });
  }
};

// DOCUMENT MIDDLEWARE:  
reviewSchema.pre('save', function(next) {
  if (this.isAnonymous) {
    this.studentId = ObjectId()
  }
  next();
});

// to populate students, teachers and select specific fields
reviewSchema.pre(/^find/, function(next) {
  // this
  this.populate({
        path: 'teacherId',
        select: 'emailId department position'
      }).populate({
        path: 'studentId',
        select: 'emailId branch'
      })
  next();
});

reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.teacherId._id);
});

// findByIdAndUpdate
// findByIdAndDelete  
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  if (this.r) {
    await this.r.constructor.calcAverageRatings(this.r.teacherId._id);
  }
});


module.exports = mongoose.model("Review", reviewSchema);
