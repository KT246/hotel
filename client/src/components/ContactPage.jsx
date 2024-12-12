import React from "react";
import { FaLocationDot, FaHeadphones } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { SiZalo } from "react-icons/si";

const ContactPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-[73vh]">
        <div className="bg-white px-8 py-8">
          <h3 className="text-blue-500 text-xl font-semibold mb-5">
            Liên hệ chúng tôi
          </h3>
          <div className="border-dashed border-b-[1px] border-gray-500 py-5 flex items-center gap-3">
            <FaLocationDot />
            <p>170 An Dương Vương, TP. Quy Nhon, Bình Định</p>
          </div>
          <div className="border-dashed border-b-[1px] border-gray-500 py-5 flex items-center gap-3">
            <FaHeadphones />
            <p>+84 0833825469</p>
          </div>
          <div className="border-dashed border-b-[1px] border-gray-500 py-5 flex items-center gap-3 ">
            <SiZalo className="text-3xl" />
            <p>LUXURI HOTEL</p>
          </div>
          <div className="border-dashed border-b-[1px] border-gray-500 py-5 flex items-center gap-3">
            <MdAttachEmail />
            <p>1212.TP. Quy Nhon,fsdfdsfdsffd</p>
          </div>
          <p className="pt-5 ">
            <span className="text-red-500">*</span>Khách hàng có thể liên hệ 24h
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
