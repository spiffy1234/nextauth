import bcryptjs from "bcryptjs";
import User from "@/src/models/userModel";
import { connect } from "@/src/DBConfiguration/dbConfig";
import { sendMail } from "@/src/helpers/mailer";

connect();

export async function POST(request: Request) {
  try {
    let data = await request.json();
    let { firstname, lastname, email, password, confirmpassword, mobile } =
      data;

    //if password matching
    if (password !== confirmpassword) {
      return Response.json(
        { error: "Password doesnot match" },
        { status: 400 }
      );
    }

    //checking if user already exist
    const user = await User.findOne({ email });

    if (user) {
      return Response.json({ error: "Email already exist" }, { status: 400 });
    }

    //hashing
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log(data);
    //create and save new user

    let newUser = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hashedPassword,
    });
    console.log()

    // Send verification email
    await sendMail({ email, emailType: "VERIFY", userId: newUser._id });

    return Response.json({
      newUser,
      success: true,
      msg: "User created successfully",
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
