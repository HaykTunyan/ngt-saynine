import React, { useState } from "react";
import { useRouter } from "next/router";

export default function BuyModal({ setShowModal, buyImage }) {
  console.log(" buyImage ", buyImage);

  const router = useRouter();

  const saveNFT = () => {
    localStorage.setItem("buyImage", JSON.stringify(buyImage));
    setShowModal(false);
    router.push("/account");
    
  };

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-80  lg:w-135 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="bg-neutral-600 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="pt-4" />
              <h3 className="text-lg lg:text-3xl  font-semibold text-white">
                Your NFT
              </h3>

              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="pt-2" />
            <div className="relative p-6 flex-auto ">
              <div className="flex justify-between my-4 ">
                <div className="text-xs lg:text-base font-bold text-orange-alft ">
                  Your NFT :
                </div>
                <div className="text-xs lg:text-base font-bold text-orange-alft">
                  {buyImage?.title}
                </div>
              </div>
              <div className="flex justify-between my-4">
                <div className="text-xs lg:text-base font-bold text-yellow-alfa leading-relaxed">
                  Counter:
                </div>
                <div className="text-xs lg:text-base font-bold text-yellow-alfa">
                  {buyImage?.counter}
                </div>
              </div>
              <div className="flex justify-between my-4">
                <div className="text-xs lg:text-base font-bold text-yellow-alfa">
                  Price:
                </div>
                <div className="text-xs lg:text-base font-bold text-yellow-alfa">
                  {buyImage?.price}
                </div>
              </div>
              <div className="flex justify-between my-4">
                <div className="text-xs lg:text-base font-bold text-yellow-alfa">
                  Link:
                </div>
                <div className="text-xs lg:text-base font-bold text-yellow-alfa">
                  {buyImage?.link}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-10 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={saveNFT}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
