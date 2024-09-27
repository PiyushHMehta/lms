import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: { type: [String], default: [] }, // Array of course IDs
    isTeacher: { type: Boolean, default: false }
});

export default mongoose.models?.User || mongoose.model('User', UserSchema);
