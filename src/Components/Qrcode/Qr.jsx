/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { v4 } from "uuid";
import arrow from "../../assets/download.svg";
import toast from "react-hot-toast";

const Qr = ({ qrCodeValue }) => {
  const qrRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (qrRef.current) {
      setIsDownloading(true);
      try {
        const dataUrl = await toPng(qrRef.current);
        const uuid = v4().replace(/-/g, "").substring(0, 7);
        const link = document.createElement("a");
        link.download = `QR-Code-${uuid}.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
        toast.success("QR code image downloaded successfully");
      } catch (err) {
        console.error("Failed to generate QR code image:", err);
        toast.error("Failed to generate QR code image");
        setIsDownloading(false);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mt-12 mb-6 w-fit bg-white rounded-3xl">
        <div
          ref={qrRef}
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "1.5rem",
          }}
        >
          <QRCode value={qrCodeValue} size={256} fgColor="black" />
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className={`flex w-40 mx-auto justify-center items-center gap-2 font-outfit rounded-md bg-teal-500 px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
          isDownloading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <>
            <img src={arrow} alt="" className="h-5 w-5" />
            Download
          </>
        )}
      </button>
    </>
  );
};

export default Qr;
