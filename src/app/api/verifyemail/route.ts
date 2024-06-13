import { connect } from "@/src/DBConfiguration/dbConfig";
import User from "@/src/models/userModel";

connect();
export async function POST(request: Request) {
  try {
    let data = await request.json();
    let { token } = data;

    console.log(token, "__please_");

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return Response.json({ error: "Invalid Token" }, { status: 400 });
    }
    console.log(user, "____herryfh");

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return Response.json({ msg: "successful", success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
