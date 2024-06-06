import User from "@/models/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Doesn't Exist ! Go SignUp" },
        { status: 400 }
      );
    }
    console.log("User logged in is :-", user);
    if (!(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Check Your Credentials " },
        { status: 400 }
      );
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "User Logged In", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
