import React from 'react'
import SectionImage from './SectionImage'

const LoadingPage = () => {
  return (
    <div className='flex mt-[142px] w-[832px] h-[392px] justify-center items-center flex-col m-auto'>
        <SectionImage/>
        <div className='mt-12'>
           <p className='text-xl'>It’s the beginning of a legendary sales pipeline </p>
           <p className='text-[#9E9E9E] text-[18px] mt-6'>When you have inbound E-mails <br /> you’ll see them here</p>
         </div>
    </div>
  )
}

export default LoadingPage