import { useState, useRef } from "react";
import qr from "../../assets/qr.svg";
import Qr from "../Qrcode/Qr";
import blurBG from "../../assets/blur-bg.svg";
import shapeBG from "../../assets/bg-illustration.svg";
import toast from "react-hot-toast";

const Form = () => {
  const [content, setContent] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const qrRef = useRef();

  const generateQrCode = () => {
    if (content !== null) {
      toast.success("QR Code Generated Successfully");
      setQrCodeValue(content);
      setTimeout(() => {
        if (qrRef.current) {
          qrRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      toast.error("Please enter some Content");
    }
  };

  return (
    <>
      <img
        src={blurBG}
        alt=""
        className="absolute opacity-50 left-1/2 -translate-x-1/2 object-cover min-h-[90vh] min-w-screen z-[-10]"
      />
      <img
        src={shapeBG}
        alt=""
        className="absolute opacity-50 top-20 left-1/2 -translate-x-1/2 object-cover min-h-[90vh] min-w-screen z-[-10]"
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-40 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-28" src={qr} alt="QR" />
          <h2 className="mt-5 font-outfit font-medium text-center text-xl sm:text-2xl leading-9 tracking-tight text-white">
            Get Your QR Code With One Click
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <div>
            <div className="mt-2">
              <input
                id="qrContent"
                name="qrContent"
                type="text"
                autoComplete="qrContent"
                required
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter Your Link Or Text"
                className="block font-mdSemi w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400  focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-1/2 mx-auto justify-center items-center gap-2 font-outfit rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                generateQrCode();
              }}
            >
              <img src={qr} alt="" className="h-5 w-5" />
              Generate
            </button>
          </div>
        </div>
      </div>

      {qrCodeValue !== null && (
        <div ref={qrRef}>
          <Qr qrCodeValue={qrCodeValue} />
        </div>
      )}
    </>
  );
};

export default Form;
