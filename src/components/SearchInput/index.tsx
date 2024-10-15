import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface SearchParams{
    value: string, 
    onChange: (val: string) => void,    
}

const SearchInput:React.FC<SearchParams> = ({ value, onChange }) => {
    return(
        <div className="relative w-full min-[810px]:max-w-2xl min-[810px]:mx-8 md:min-w-[200px]">
            <FontAwesomeIcon 
            icon={faSearch} 
            color="gray"
            size="sm"
            className="absolute top-6 min-[810px]:top-3 left-3"
            />
            <input
            className="border-2 rounded-full my-3 min-[810px]:my-0 pl-7 pr-3 py-2 focus:border-gray-500 focus:outline-none text-sm w-full"
            value={value} 
            onChange={(e) => onChange(e.target.value)}   
            placeholder="Search"         
            />
        </div>
    )
}

export default SearchInput;