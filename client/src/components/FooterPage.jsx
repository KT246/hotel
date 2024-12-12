import React from "react";

const FooterPage = () => {
  return (
    <div className="bg-blue-500 text-white text-center py-4">
      <p>All material herein © 2024–2025 LUXURI HOTEL Company Ltd.</p>
      <p>The world's leading provider of online travel and related services.</p>
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-10 h-10 bg-white rounded-full">
          <img src="/guong.png" alt="" />
        </div>
        <p>LUXURI HOTEL</p>
      </div>
    </div>
  );
};

export default FooterPage;
