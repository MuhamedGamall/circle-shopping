import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { Mail, MessageSquarePlusIcon } from "lucide-react";
import MaxWidthWrapper from "./wrappers/max-width-wrapper";
export default function Footer() {
  return (
    <MaxWidthWrapper>
      <footer className=" border-t my-10">
        <div className=" flex justify-center flex-col items-center   ">
          <div className="bg-slate-100  flex sm:flex-row flex-col gap-20 items-center  justify-between p-7 w-full border-b">
            <div className="sm:text-left text-center">
              <h6 className="text-[20px] font-bold text-slate-800">
                We&#39;re Always Here To Help
              </h6>
              Reach out to us through any of these support channels
              <p className="text-slate-400"></p>
            </div>
            <Link
              href={"mailto:muhamedgamal250@gmail.com"}
              target="_blank"
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <span className=" bg-white rounded-full border p-2">
                <Mail />
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-slate-500 sm:text-left text-center">
                  EMAIL SUPPORT
                </span>
                muhamedgamal250@gmail.com
              </div>
            </Link>
          </div>

          <div className=" mb-3 mt-5 flex gap-2 items-center justify-center ">
            <h5 className="text-[15px] ">Social media</h5>
            <ul className="flex items-center gap-2 text-[27px] hover:[&>li]:text-slate-600 [&>li]:cursor-pointer">
              <li>
                <Link
                  href={"lhttps://www.linkedin.com/in/muhamed-gamal-468339241"}
                >
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link
                  href={"https://github.com/MuhamedGamall?tab=repositories"}
                >
                  <FaGithubSquare />
                </Link>
              </li>
            </ul>
          </div>
          <span className=" mt-2 mb-5 text-center text-[15px]">
            &copy; {new Date().getFullYear()} All Rights Reserved for
            <span className="text-[#2d5d2a] ml-[3px] font-bold whitespace-nowrap text-[13px]">
              Circle
            </span>
            .
          </span>
        </div>
      </footer>
    </MaxWidthWrapper>
  );
}
