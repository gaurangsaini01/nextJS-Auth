import User from "@/models/user";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getdatafromtoken";

connect();

export async function GET(request: NextRequest) {
  try {
    //extract data from token
    const id = await getDataFromToken(request);
    const userDetails = await User.findById(id).select("-password");
    if (!userDetails) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 500 });
    }
    return NextResponse.json(
      {
        message: "User Data Retrieved",
        data: userDetails,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
