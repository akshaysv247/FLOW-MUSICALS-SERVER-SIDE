const mongoose = require('mongoose');

// const { ObjectId } = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    songs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;
