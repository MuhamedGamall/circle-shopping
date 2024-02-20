import Image from "next/image";

export function AvatarContainer({
  image,
  username,
}: {
  image?: string;
  username: string;
}) {
  return (
    <div className=" w-[40px] h-[40px]  rounded-full border-[3px]">
      {!!image ? (
        <Image
          src={image || ""}
          alt="profile image"
          width={35}
          height={35}
          className="w-full object-cover rounded-full"
        />
      ) : (
        <span className="bg-black text-white font-bold w-full h-full flex items-center justify-center rounded-full text-[18px] ">
          {username.slice(0, 1)}
        </span>
      )}
    </div>
  );
}
