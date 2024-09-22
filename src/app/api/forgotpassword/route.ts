import User from "@/src/models/userModel";
import { connect } from "@/src/DBConfiguration/dbConfig";
import { sendMail } from "@/src/helpers/mailer";

connect();
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    //check if user exist
    let user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "Email not found" }, { status: 400 });
    }

    //send reset password link
    await sendMail({ email, emailType: "RESET", userId: user._id });
    return Response.json({
      msg: "Password reset link sent to your email",
      success: true,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
