import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { UserProfile } from '.';
import { useStateContext } from "../contexts/ContextProvider";

import avatar from '../data/avatar.jpg';
import { useSelector } from "react-redux";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button type="button" onClick={customFunc} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
            <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
            {icon}
        </button>
    </TooltipComponent>
)

const Navbar = () => {
    const { activeMenu, setActiveMenu, handleClick, isClicked, setIsClicked, screenSize, setScreenSize, currentColor } = useStateContext();
    const user = useSelector(state => state.userReducer.data);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);   }, []);

        useEffect(() => {
            if(screenSize <= 900) {
                setActiveMenu(false);
            } else {
                setActiveMenu(true);
            }
        }, [screenSize]);

    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            <NavButton title="Menu" 
            customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
            color={currentColor}
            icon={<AiOutlineMenu />} />
            <div className="flex">
                <TooltipComponent content="Profile" position="BottomCenter">
                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
                        <img className="rounded-full w-8 h-8" src={avatar} />
                        <p>
                            <span className="text-gray-400 text-14">Salut, </span> {' '}
                            <span className="text-gray-400 font-bold ml-1 text-14">{user.profile}</span>
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                </TooltipComponent>
                {isClicked.userProfile && <UserProfile />}
            </div>
        </div>
    )
}

export default Navbar;