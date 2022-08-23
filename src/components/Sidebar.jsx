import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links, linksPdg, linksRes } from "../data/dummy"
import { useStateContext } from "../contexts/ContextProvider";

import logo from "../Assets/logo.png";
import { useSelector } from "react-redux";

const Sidebar = () => {
const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();
const [linkes, setLinkes] = useState([]);
const user = useSelector(state => state.userReducer.data);

const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900) {
        setActiveMenu(false);
    }
}

useEffect(() => {
    switch (user.profile) {
        case "pdg":
            setLinkes(linksPdg);
            break;
        case "res":
            setLinkes(linksRes);
            break;
        default:
            setLinkes(links);
    }
    }, []);
const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex">
                        <img width="200px" src={logo} alt="logo" />{" "}
                    </Link>
                    <TooltipComponent content="Menu" position="BottomCenter">
                        <button type="button" onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light">
                            <MdOutlineCancel />
                        </button>
                    </TooltipComponent>
                </div>
                <div className="mt-10">
                    {linkes.map((item) => (
                        <div key={item.title}>
                            <p className="text-gray-400 m-3 mt-4 uppercase">
                                {item.title}
                            </p>
                            {item.links.map((link) => (
                                <NavLink 
                                to={`/${link.name}`} 
                                key={link.name} 
                                onClick={handleCloseSideBar} 
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? currentColor : ''
                                })}
                                className={({ isActive }) => isActive ? activeLink : normalLink}>
                                    {link.icon}
                                    <span className="capitalize">
                                        {link.name}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default Sidebar;