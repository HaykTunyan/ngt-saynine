import Container from "../../components/Container";
import Image from "next/image";
import ProfressLine from "../../components/ProgressLine";
import { useEffect, useState } from "react";
import { NFT, NFTread } from "../../web/contracts";
import axios from "axios";
import TransferNft from "./TransferNft";
import UseToken from "./UseToken";
import GetMegaNFT from "./GetMegaNft";
import MinNFT from "./MintNft";
import UseNFT from "../../components/Modal/UseNft";

function Account() {
  // Hooks.
  const [buyImage, useBuyImage] = useState();
  const [nftImages, setByImages] = useState();
  const [showModal, setShowModal] = useState(false);
  const [usedNft, getUsedNft] = useState();
  const [count, getCount] = useState();
  const [userToken, getUserToken] = useState();

  const receiverAddress = "0x92d96c53D4e89F0BA9fcb20444358A639d1492D5";

  const showDisplayImages = () => {
    switch (buyImage?.nftId) {
      case "1":
        return setByImages("/images/NFT-1.png");
      case "2":
        return setByImages("/images/NFT-2.png");
      case "3":
        return setByImages("/images/NFT-3.png");
      case "4":
        return setByImages("/images/NFT-4.png");
      case "5":
        return setByImages("./images/NFT-5.png");
      default:
        return setByImages("/images/NFT-1.png");
    }
  };

  const showUseModal = (buyImage) => {
    setShowModal(true);
    getUsedNft(buyImage);
  };

  useEffect(() => {
    showDisplayImages();
    const buyImage = JSON.parse(localStorage.getItem("buyImage"));
    const countNft = JSON.parse(localStorage.getItem("count"));
    if (buyImage) {
      useBuyImage(buyImage);
      getCount(countNft);
    }
  }, [showModal, count]);

  useEffect(() => {
    if (count === 0) {
      localStorage.removeItem("buyImage");
    }
  }, [count]);

  useEffect( () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    getUserToken(token);
  }, [] )

  useEffect(() => {
    axios.get("/api/NFTdata").then(console.log);
  }, []);

  return (
    <Container className="lg:px-4">
      <div className="pt-20">
        <h1 className="text-4xl xl:text-8xl font-normal text-white">
          My Account
        </h1>
        <div className="pt-6" />
      </div>
      <div className="pt-10 xl:pt-20" />
      {/* Buy NFT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-10">
        {buyImage && (
          <div className="col-span-2 px-4 py-3 border-orange rounded-2xl border-1px flex">
            <div className="w-4/12">
              <Image
                src={buyImage?.img}
                width={143}
                height={186}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-8/12 pl-4">
              <div className="flex justify-between pt-0 xl:pt-5">
                <h4 className="text-2xl lg:text-4xl font-semibold text-white">
                  {buyImage?.title}
                </h4>
                <div className="pr-2">
                  {count && (
                    <span className="text-white text-xl xl:text-4xl font-bold">
                      {count}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-1 pt-2">
                <div className="text-base xl:text-2xl font-bold text-orange-alft ">
                  Links:
                </div>
                <div className="text-base xl:text-2xl font-normal text-orange-alft">
                  {buyImage?.link}
                </div>
              </div>

              <div className="flex space-x-1 pt-2">
                <div className="text-base xl:text-2xl font-bold text-orange-alft ">
                  Nft Id:
                </div>
                <div className="text-base xl:text-2xl font-normal text-orange-alft">
                  {buyImage?.nftId}
                </div>
              </div>
              <div className="pt-6 xl:pt-8" />
              <button
                type="button"
                onClick={() => showUseModal(buyImage)}
                className="py-2 px-10  w-full bg-green-alfa text-xl xl:text-2xl rounded-lg text-white font-normal"
              >
                Burn NFT
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="pt-10 xl:pt-20" />
      <GetMegaNFT userToken={userToken}  receiverAddress={receiverAddress} buyImage={buyImage}/>
      <div className="pt-10 xl:pt-20" />
      <TransferNft userToken={userToken} receiverAddress={receiverAddress} buyImage={buyImage} />
      <div className="pt-10 xl:pt-20" />
      <UseToken userToken={userToken} receiverAddress={receiverAddress} />
  
      <div className="pt-20 xl:pt-20" />
      <MinNFT  userToken={userToken} receiverAddress={receiverAddress} />
      <div className="pt-20 xl:pt-64" />

      <h2 className="text-4xl xl:text-8xl font-normal text-white">Collected</h2>
      <div className="">
        <p className="text-base xl:text-4xl text-white">
          Pick your favorite SayNine NFT and rank better with the backlink
          package behind it
        </p>
      </div>
      <div className="pt-10" />
      <div className="flex justify-between">
        <div className="">
          <Image
            src="/nfts/Fight_1.png"
            width={70}
            height={100}
            className={`w-17.5 h-25 object-cover grayscale `}
          />
        </div>
        <div className="w-17.5 h-25">
          <Image
            src="/images/NFT-1.png"
            width={70}
            height={100}
            className={`w-17.5 h-25 object-cover`}
          />
        </div>
      </div>
      <div className=" pt-10" />
      <ProfressLine />
      <div className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {NFTread.map((item) => (
            <div className="flex justify-center" key={item.key}>
              <Image
                src={item.img}
                width={300}
                height={390}
                className={`w-full h-full object-cover ${item.active} `}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pb-52" />
      {showModal && <UseNFT setShowModal={setShowModal} usedNft={usedNft} userToken={userToken} />}
    </Container>
  );
}

export default Account;
