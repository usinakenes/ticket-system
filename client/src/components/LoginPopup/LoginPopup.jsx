import { XIcon } from "@heroicons/react/solid";

const googleLogin = (ticketPopupOnCallback) => {
  let url = window.location.origin.split("://")[1];
  let fullUrl = window.location.href;
  fullUrl = fullUrl.replace("/popup", "");
  let urlExtension = "";
  if (ticketPopupOnCallback) {
    urlExtension = "/popup";
  }

  if (process.env.NODE_ENV !== "production") {
    url = "localhost:7050";
  }

  window.open(
    `http://${url}/api/auth/google?return=${fullUrl + urlExtension}`,
    "_self"
  );
};

const LoginPopup = ({ ticketPopupOnCallback, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[1050]" />
      <div className="fixed inset-0 z-[1100] md:max-w-sm md:mr-auto md:ml-auto md:min-h-[400px] md:max-h-[400px] md:inset-14 md:shadow-lg">
        <div className="h-full z-50 overflow-auto md:rounded-lg bg-[#f5f5f5]">
          <div className="font-bold pt-8 pb-8 border-b text-2xl text-center">
            Logga in
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              className="hover:bg-zinc-400 bg-zinc-200 shadow-sm w-72 h-16 rounded-xl 
                            flex justify-center items-center transition duration-200 ease-in-out mt-32 md:mt-16"
              onClick={() => googleLogin(ticketPopupOnCallback)}
            >
              <div
                className={`bg-[url('/public/assets/images/google.png')] bg-cover h-[25px] w-[25px] ml-[20px] flex-none`}
              />
              <div className="flex-auto text-xl">Logga in med google</div>
            </button>
          </div>
          <div
            className="fixed cursor-pointer hover:bg-[#ddd] transition ease-in-out duration-200 md:absolute top-5 bg-[#f5f5f5] md:bg-transparent rounded-full p-2 shadow-md md:shadow-none right-5 z-[100]"
            onClick={handleClose}
          >
            <XIcon className="h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
