import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded Token:-", decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to get data from token", success: false },
      { status: 500 }
    );
  }
}
