import { connect } from "@/src/DBConfiguration/dbConfig";
import User from "@/src/models/userModel";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";

connect();

export async function GET() {
  try {
    const userId = getIdFromToken();
    console.log(userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log(user);
    return Response.json({ msg: "User Found", success: true, user });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
