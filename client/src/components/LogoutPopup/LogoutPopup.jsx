import { ExclamationIcon, XIcon } from "@heroicons/react/solid";
import { setLoggedOut } from "../../redux/loggedIn";
import { useDispatch } from 'react-redux'


const LogoutPopup = (props) => {
    const dispatch = useDispatch();

    const logout = e => {
        e.preventDefault();
        setTimeout(() => {
            fetch(`/api/auth/logout`);
            dispatch(setLoggedOut());
            props.setIsOpen(false);
        }, 200);
    }

    return (
        <div className="popup-box">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[1050]" />
            <div className="fixed inset-0 z-[1100] md:max-w-sm md:mr-auto md:ml-auto md:min-h-[400px] md:max-h-[400px] md:inset-14 md:shadow-lg">
                <div className="h-full z-50 overflow-auto md:rounded-lg bg-[#f5f5f5]">
                    <div className="font-bold pt-8 pb-8 border-b text-2xl text-center">Logga ut</div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="py-6 flex justify-center items-center">
                            <ExclamationIcon className="h-7 w-7" />
                        </div>
                        <div className="flex justify-center items-center md:space-x-2 md:mt-0 text-[22px] font-medium py-3">
                            Vill du logga ut?</div>
                        <ul className="flex md:space-x-2 md:mt-0 md:text-sm md:font-medium py-10">
                            <li>
                                <button className='flex justify-content bg-zinc-300 text-zinc-800 px-8 py-4 ml-2 md:ml-1.5 rounded-xl text-[22px] 
                                    transition duration-200 ease-in-out hover:bg-zinc-400'
                                    onClick={props.handleClose}>
                                    <span className='ml-1'>Avbryt</span>
                                </button>
                            </li>
                            <li>
                                <button className='flex justify-content bg-btnBG text-[#0A1F44] px-8 py-4 ml-2 md:ml-1.5 rounded-xl text-[22px]
                                    transition duration-200 ease-in-out hover:bg-btnBGHover'
                                    onClick={e => logout(e)}>
                                    <span className='ml-1'>Logga ut</span>
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div className='fixed cursor-pointer hover:bg-[#ddd] transition ease-in-out duration-200 md:absolute top-5 md:to-20 bg-[#f5f5f5] md:bg-transparent rounded-full p-2 shadow-md md:shadow-none right-5 z-[100]' onClick={props.handleClose}>
                        <XIcon className="h-7 w-7" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopup;