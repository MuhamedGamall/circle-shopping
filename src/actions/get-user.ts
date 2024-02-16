import mongo_connect from "./mongo-connect";
import { UserData } from "../../types";
import { UserInfo } from "@/models/user-info";
import { User } from "@/models/user";

export default async function getUser(email: string) {
  await mongo_connect();
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  const data = { ...user, ...userInfo } as UserData;
  return data;
}
