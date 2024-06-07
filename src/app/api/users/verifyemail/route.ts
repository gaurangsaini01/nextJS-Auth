//har route me dbConnect kern padega unlike in express jisme ek baar kerdiya
import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server"; //manually import req , response here

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token is",token)

    if (!token) {
      return NextResponse.json({ error: "Token Not Found" }, { status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid/Wrong/Expired Token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    
    await user.save();

    return NextResponse.json({success:true,message:"User Verified Successfully",user},{status:200})

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
