"use server";
export default async function getCEOEmail() {
  return process.env.CEO_EMAIL;
}
