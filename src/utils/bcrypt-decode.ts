'use server'
import bcrypt from "bcrypt";
export default async function bcryptDecode({
  confirmPassword,
  currPassword,
}: {
  confirmPassword: string;
  currPassword: string;
}): Promise<boolean|undefined> {
  try {
    return await bcrypt.compare(
      confirmPassword || "" /* empty string if no password provided */,
      currPassword || "" /* empty string if no password provided */
    );

  } catch (err) {
    console.error(err);
  }

}
