import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/src/DBConfiguration/dbConfig";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connect();

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  let { email, password } = data;

  //checking if user exist
  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({ error: "User doesnot exist" }, { status: 400 });
  }

  //checking if password is correct
  let validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return Response.json({ error: "Password is incorrect" }, { status: 400 });
  }

  //creating token data object
  const tokenData = {
    id: user._id,
    email: user.email,
  };

  //creating token
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });
                    
  //setting token cookies
  const cookieStore = cookies();
  cookieStore.set("token", token, { httpOnly: true });

  return Response.json({
    msg: "Login successful",
    success: true,
    headers: { "Set-Cookies": `token=${token}` },
  });
}
