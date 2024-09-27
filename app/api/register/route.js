import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
}

// POST: Register a new user
export async function POST(req) {
    await connectToDatabase();
    const { name, email, password, isTeacher, courses } = await req.json();

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDoc = await User.create({
        name,
        email,
        password: hashedPassword,
        isTeacher,
        courses: courses || [], // Ensure courses is an array, default to empty if not provided
    });

    return new Response(JSON.stringify(userDoc), { status: 201 });
}

export async function PUT(req) {
    await connectToDatabase();
    const { name, courseName } = await req.json();

    // Find the user by name
    const user = await User.findOne({ name });

    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Check if the course already exists in the user's courses
    if (!user.courses.includes(courseName)) {
        user.courses.push(courseName); // Add the new course
    }

    // Save the updated user document
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
}