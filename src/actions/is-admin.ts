import { UserInfos } from "@/models/UserInfos";
import mongo_connect from "./mongo-connect";

export default async function isAdmin( email : string ) {
  await mongo_connect();
  const {admin} = await UserInfos.findOne({ email},{admin:1})
  return  admin 
}
