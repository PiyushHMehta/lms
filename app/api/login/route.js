import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
}

// POST: Login user
export async function POST(req) {
    await connectToDatabase();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new Response("Invalid credentials", { status: 401 });
    }

    // Return user data (excluding password)
    const { password: _, ...userData } = user._doc;
    return new Response(JSON.stringify(userData), { status: 200 });
}
