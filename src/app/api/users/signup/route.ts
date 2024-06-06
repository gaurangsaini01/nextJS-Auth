//har route me dbConnect kern padega unlike in express jisme ek baar kerdiya
import connect from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server"; //manually import req , response here
import bcrypt from "bcrypt";
import sendMail from "@/utils/mailer";
connect();

export async function POST(req: NextRequest) {
  try {
    // Your code logic here
    //await is very very important here
    const reqBody = await req.json(); //This removes the need for Express.json() to parse body in express
    const { email, username, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists, Go login",
        },
        { status: 400 }
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log(newUser);

    //send verification email
    const emailResponse = await sendMail({ email, emailType: "verify", userId: newUser._id });
    console.log(emailResponse);
    return NextResponse.json({ message: "User Registered Successfully !",success:true },{status:200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
