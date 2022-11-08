import React, { useState, useEffect } from "react";
import Image from "next/image";
import { vmContract } from "../../../web/Web3clinet";
import { ethers } from "ethers";
import { ABI } from "../../../web/contracts";
import { toast } from "react-toastify";
const CONTACT_ADDRESS = "0x951bf41E354E05e278d504cf13Dae71302f94c0a";

function MorganChild({ userToken, successRes }) {
  const [balanaceNFT, getBalanceNFT] = useState();
  const [morgan, setMorgan] = useState();
  const [megaData, getMegaData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const listData = new Array(10).fill([1]);

  // NFT 2
  useEffect(() => {
    if (userToken) {
      vmContract.methods
        .balanceOf(String(userToken), 2)
        .call(function (err, res) {
          if (err) {
            return;
          }
          getBalanceNFT(res);
        });
    }
  }, [userToken, successRes]);

  useEffect(() => {
    if (balanaceNFT > 0) {
      const list = Array(Number(balanaceNFT)).fill([1]);
      setMorgan(list)
    }
  }, [balanaceNFT]);

  async function getMegaNFT() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTACT_ADDRESS, ABI, signer);
    try {
      const response = await contract.getMegaNFTs(
        2,
        10
      );
      toast.success(" Get Morgan NFT successfuly ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getMegaData(response);
      console.log(" successfuly ")
    } catch (error) {
      setErrorMessage(error);
      toast.error('invalid BigNumber value', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-12 gap-10">
      {/*  */}
      <div className="flex justify-center lg:hidden">
        <Image
          src="/nfts/Fight_1.png"
          width={300}
          height={390}
          className={`w-full h-full object-cover `}
        />
      </div>
      {/*  */}
      {/* {balanaceNFT < 10 && lastNFT?.map((index) => (
        <div className="hidden lg:flex lg:justify-center" key={index} >
          <Image
            src="/nfts/Fight_1.png"
            width={300}
            height={390}
            className={`w-full h-full object-cover `}
          />
        </div>
      ))} */}
      {/*  */}
      {balanaceNFT > 9 && listData.map((index) => (
        <div className="hidden lg:flex  lg:justify-center" key={index} >
          <Image
            src="/nfts/Fight_1.png"
            width={300}
            height={390}
            className={`w-full h-full object-cover `}
          />
        </div>
      ))}
      {/*  */}
      <div className="flex flex-col lg:justify-center items-center">
        <div className="py-5 lg:hidden">
          <span className="text-xs font-semibold  px-5 py-2 rounded-3xl bg-orange text-white ">
            {balanaceNFT}
          </span>
        </div>
        <div className="">
          {balanaceNFT > 9 && (
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold  text-sm p-5 rounded-full shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
              onClick={getMegaNFT}
            >
              Send
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="">
        </div>
      </div>

    </div>
    <div className=" border-1px border-orange mt-5" />
    </>
  );
}

export default MorganChild;
