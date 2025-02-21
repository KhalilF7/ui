import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector(state => state.userReducer.data);
  const { currentColor } = useStateContext();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispath(logout());
    navigate("/auth");
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Profil de l'utilisateur</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user.userID} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {user.profile}  </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.branche} </p>
        </div>
      </div>
      <div className="mt-5">
        <button type='button' style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }} className={`text-10 p-3 hover:drop-shadow-xl`} onClick={handelLogout}>Logout</button>
      </div>
    </div>

  );
};

export default UserProfile;
