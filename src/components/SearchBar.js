import { Search } from 'lucide-react'
import React from 'react'


const SearchBar = ({ ColorMode }) => {
  return (
    <div className={`border border-gray-400 rounded  h-7 ${ColorMode && 'bg-[#23272C]'} flex  items-center gap-2`} >
      <Search color='gray' className='w-5 h-5 ml-1' />
      <input type="text" placeholder='Search' className={`${ColorMode ? 'bg-[#23272C]' : "bg-white"} outline-none`} />
    </div>
  )
}

export default SearchBar
