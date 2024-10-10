import React from "react";

interface FilterParams{
    activeFilter: string,
    onChange: (val: string) => void
}

const Filters:React.FC<FilterParams> = ({activeFilter, onChange}) => {
    return(
        <div className="flex items-center gap-x-2">
            <button 
            className={activeFilter === "all" ? "bg-lime-500 rounded text-sm text-white px-3 h-7" : "bg-gray-400 rounded text-sm text-white px-3 h-7"}
            onClick={() => onChange('all')}
            >
                All
            </button>
            <button
            className={activeFilter === "completed" ? "bg-lime-500 rounded text-sm text-white px-3 h-7" : "bg-gray-400 rounded text-sm text-white px-3 h-7"}
            onClick={() => onChange('completed')}
            >
                Completed
            </button>
            <button
            className={activeFilter === "incomplete" ? "bg-lime-500 rounded text-sm text-white px-3 h-7" : "bg-gray-400 rounded text-sm text-white px-3 h-7"}
            onClick={() => onChange('incomplete')}
            >
                Incomplete
            </button>
        </div>
    )
}

export default Filters;