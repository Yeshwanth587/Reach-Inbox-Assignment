import { BarChart2, Home, Inbox, InboxIcon, List, Mail, Send, UserRoundSearch, UserRoundSearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import Icon from './Icons';

const icons = [
  Home,
  UserRoundSearchIcon,
  Mail,
  Send,
  List,
  InboxIcon,
  BarChart2,
];

const NavBar = ({ ColorMode, username, handleChange }) => {
  console.log(username)
  const [activeIcon, setActiveIcon] = useState(0);

  const handleIconClick = (index) => {
    setActiveIcon(index);
    handleChange(index);
  };

  return (
    <div className={`w-full h-full flex flex-col justify-between ${ColorMode ? "bg-[#101113]" : "bg-white"} px-1 `}>
      <div>
        <div className='w-12 h-[70px] flex justify-center items-center'>
          <img src="https://media.licdn.com/dms/image/D560BAQEmo1aZIhVtlQ/company-logo_200_200/0/1700158687336/reachinbox_ai_logo?e=2147483647&v=beta&t=2eGcwWsFtdBcUVJGGHkBxWHYFN86D-c5zfyr4s3DsNw" alt="logo" className='w-6 h-6 rounded' />
        </div>
        <div className='pt-12 px-2 flex flex-col gap-8 '>
          {icons.map((IconComponent, index) => (
            <Icon
              key={index} 
              ColorMode={ColorMode}
              color={ColorMode ? 'white' : 'black'}
              isActive={activeIcon === index}
              onClick={() => handleIconClick(index)}
            >
              <IconComponent color={ColorMode ? 'white' : "black"} />
            </Icon>
          ))}
        </div>
      </div>

      <div className='w-12 h-[70px] flex justify-center items-center'>
        <p className={`w-8 bg-green-900 h-8 rounded-3xl  text-white pl-1`} >{username}</p>
      </div>
    </div>
  );
};

export default NavBar;