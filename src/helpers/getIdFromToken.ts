import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getIdFromToken() {
  try {
    const token: any = await cookies().get("token")?.value;
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
