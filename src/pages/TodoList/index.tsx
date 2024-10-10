import React, { useContext } from "react";
import SearchInput from "../../components/SearchInput";
import Filters from "../../components/Filters";
import TodoItem from "../../components/TodoItem";
import { TodoContext, TodoProps } from "../../App";

const TodoList:React.FC = () => {
    const {
        todos, 
        searchVal, 
        searchTodoHandler, 
        filter, 
        setFilter, 
        addTaskInputVal, 
        setAddTaskInputVal, 
        addNewTaskHandler, 
        toggleCheckStatus,
        deleteTodoHandler
      } = useContext<TodoProps>(TodoContext)
    
    return(
        <div className="mx-6 md:mx-56 my-16">
            <div className="md:flex md:justify-between mb-4 w-full">
                <h1 className="text-2xl font-bold subpixel-antialiased">Today</h1>
                <SearchInput 
                value={searchVal} 
                onChange={(val) => searchTodoHandler(val)}
                />
                <Filters activeFilter={filter} onChange={(val:string) => setFilter(val)}/>
            </div>
            
            {todos && todos.map((todo) => {
                return (filter === 'completed' ? 
                    todo.isChecked &&
                    (
                        <TodoItem
                        key={todo.id}
                        id={todo.id} 
                        isChecked={todo.isChecked} 
                        onCheckedToggle={() => toggleCheckStatus(todo.id)} 
                        onDelete={(id: number) => deleteTodoHandler(id)} 
                        value={todo.value}
                        />
                    ) : 
                    filter === 'incomplete' ? !todo.isChecked && (
                        <TodoItem
                        key={todo.id}
                        id={todo.id} 
                        isChecked={todo.isChecked} 
                        onCheckedToggle={() => toggleCheckStatus(todo.id)} 
                        onDelete={(id: number) => deleteTodoHandler(id)} 
                        value={todo.value}
                        />
                    ) : 
                    (
                        <TodoItem
                        key={todo.id}
                        id={todo.id} 
                        isChecked={todo.isChecked} 
                        onCheckedToggle={() => toggleCheckStatus(todo.id)} 
                        onDelete={(id: number) => deleteTodoHandler(id)} 
                        value={todo.value}
                        /> 
                    )
                )
            })}

            <input
            className="w-full rounded-lg border-2 focus:border-gray-500 focus:outline-none px-4 py-2"
            value={addTaskInputVal}
            onChange={(e) => setAddTaskInputVal(e.target.value)}
            placeholder="Type Something"
            />

            <button
            className="w-full rounded-lg border px-4 py-2 bg-black text-gray-300 my-3"
            onClick={addNewTaskHandler}
            >
                Add Task
            </button>
        </div>
    )
}

export default TodoList;