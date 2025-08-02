// models/Pin.js
const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      url: {
        type: String,
        required: [true, 'Image URL is required'],
      },
      filename: {
        type: String,
      },
    },
    destination: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
        },
        message: 'Please enter a valid URL',
      },
    },
    category: {
      type: String,
      enum: ['Art', 'DIY', 'Travel', 'Food', 'Fashion', 'Tech', 'Other'],
      default: 'Other',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Pin', pinSchema);
