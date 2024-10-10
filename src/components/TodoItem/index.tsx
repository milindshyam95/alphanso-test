import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck, faCircle } from '@fortawesome/free-regular-svg-icons'

interface TodoItemProps{
    id: number,
    isChecked: boolean,
    onCheckedToggle: (val: boolean) => void
    value: string,
    onDelete: (id: number) => void
}

const TodoItem:React.FC<TodoItemProps> = ({id, isChecked, onCheckedToggle, value, onDelete}) => {
    return(
        <div 
        className={
            isChecked ?
            "w-full px-4 py-2 my-3 rounded-lg border border-lime-300 bg-lime-100 flex justify-between items-center" :
            "w-full px-4 py-2 my-3 rounded-lg border border-gray-300 bg-gray-100 flex justify-between items-center"}
        >
            <div className="flex items-center">
                {isChecked ? 
                    <FontAwesomeIcon 
                    icon={faCircleCheck} 
                    color="#8dbf36"                    
                    onClick={() => onCheckedToggle(false)}
                    /> :
                    <FontAwesomeIcon 
                    icon={faCircle} 
                    color="#b2b5ac"
                    onClick={() => onCheckedToggle(true)}
                    />
                }
                
                <p className="ml-2">{value}</p>
            </div>
            <FontAwesomeIcon
            className="cursor-pointer"
            icon={faClose} 
            color="gray"
            size="sm"    
            onClick={() => onDelete(id)}        
            />
        </div>
    )
}

export default TodoItem;