import Course from "@/models/Courses"; // Adjust the import path based on your folder structure
import mongoose from "mongoose";

// Connect to MongoDB
async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
}

// POST: Create a new course
export async function POST(req) {
    await connectToDatabase();
    const { name, description, numEnrolled, resources, comments, teacherName } = await req.json();

    const courseDoc = await Course.create({
        name,
        description, // Store description
        numEnrolled: numEnrolled || 0,
        resources: resources || [],
        comments: comments || [],
        teacherName, // Store teacher name
    });

    return new Response(JSON.stringify(courseDoc), { status: 201 });
}

// PUT: Update an existing course
export async function PUT(req) {
    await connectToDatabase();
    const { _id, name, description, numEnrolled, resources, comments, teacherName } = await req.json();

    const updatedCourse = await Course.findByIdAndUpdate(
        _id,
        { name, description, numEnrolled, resources, comments, teacherName }, // Include teacher name and description
        { new: true }
    );

    return new Response(JSON.stringify(updatedCourse), { status: 200 });
}

// GET: Retrieve all courses
export async function GET() {
    await connectToDatabase();
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), { status: 200 });
}

// DELETE: Remove a course by ID
export async function DELETE(req) {
    await connectToDatabase();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    await Course.findByIdAndDelete(_id);
    return new Response(JSON.stringify(true), { status: 204 });
}
