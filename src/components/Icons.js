import React from 'react';


const Icon = ({ ColorMode,isActive, children, onClick }) => {
  return (
    <div className={`p-1 rounded cursor-pointer ${ColorMode && isActive ? 'bg-[#2F3030]' : ''} ${!ColorMode && isActive ? "bg-gray-200" : ''}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
