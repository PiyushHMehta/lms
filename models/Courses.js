import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String, // New field for course description
    required: true, // Ensure description is provided
    trim: true,
  },
  teacherName: {
    type: String, 
    required: true,
    trim: true,
  },
  numEnrolled: {
    type: Number,
    default: 0,
  },
  resources: {
    type: [String], // Array of resource URLs or names
    default: [],
  },
  comments: {
    type: [String], // Array of comments
    default: [],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Course = mongoose.models?.Course || mongoose.model('Course', courseSchema);

export default Course;
