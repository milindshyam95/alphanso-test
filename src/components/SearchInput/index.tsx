import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface SearchParams{
    value: string, 
    onChange: (val: string) => void,    
}

const SearchInput:React.FC<SearchParams> = ({ value, onChange }) => {
    return(
        <div className="relative w-full md:max-w-2xl md:mx-8">
            <FontAwesomeIcon 
            icon={faSearch} 
            color="gray"
            size="sm"
            className="absolute top-6 md:top-3 left-3"
            />
            <input
            className="border-2 rounded-full my-3 md:my-0 pl-7 pr-3 py-2 focus:border-gray-500 focus:outline-none text-sm w-full"
            value={value} 
            onChange={(e) => onChange(e.target.value)}   
            placeholder="Search"         
            />
        </div>
    )
}

export default SearchInput;