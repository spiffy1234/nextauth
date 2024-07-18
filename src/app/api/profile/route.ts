import { connect } from "@/src/DBConfiguration/dbConfig";
import User from "@/src/models/userModel";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";
import { NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getIdFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return Response.json({ msg: "User Found", success: true, user });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
