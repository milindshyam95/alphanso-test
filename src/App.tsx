import React, { createContext, useEffect, useState } from 'react';
import TodoList from './pages/TodoList';

interface TodoItemProps{
  id: number,
  isChecked: boolean,
  value: string
}

interface LastDeletedItemProps{
  deletedItem: TodoItemProps,
  index: number
}

export interface TodoProps{
  todos: TodoItemProps[],
  setTodos: (todo: TodoItemProps[]) => void,
  addTaskInputVal: string,
  setAddTaskInputVal: (val: string) => void,
  searchVal: string,
  searchTodoHandler: (val: string) => void,
  filter: string,
  setFilter: (val: string) => void,
  addNewTaskHandler: () => void,
  toggleCheckStatus: (id:number) => void,
  deleteTodoHandler: (id: number) => void,
  lastDeletedItem: LastDeletedItemProps | null,
  undoHandler: () => void
}  

export const TodoContext = createContext<TodoProps>(
  {
    todos: [],
    setTodos: () => {},
    addTaskInputVal: '',
    setAddTaskInputVal: () => {},
    searchVal: '',
    searchTodoHandler: () => {},
    filter: '',
    setFilter: () => {},
    addNewTaskHandler: () => {},
    toggleCheckStatus: () => {},
    deleteTodoHandler: () => {},
    lastDeletedItem: null,
    undoHandler: () => {}
  }
)

const App:React.FC = () => {
  const [todos, setTodos] = useState<TodoItemProps[]>([])
  const [searchVal, setSearchVal] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [addTaskInputVal, setAddTaskInputVal] = useState<string>('');
  const [idsList, setIdsList] = useState<number[]>([])
  const [lastDeletedItem, setLastDeletedItem] = useState<LastDeletedItemProps | null>(null)
  
  //Add new todo task handler - 
  const addNewTaskHandler = () => {
    if(!addTaskInputVal){
      alert('Please enter a task')
    }
    else{
      let id = 0
      while(idsList.includes(id)){
        id++
      }
      setIdsList([...idsList, id])
      localStorage.setItem('idsList', JSON.stringify([...idsList, id]))

      let newTask:TodoItemProps = {
        id,
        isChecked: false,
        value: addTaskInputVal
      }
      setTodos([...todos, newTask])
      setAddTaskInputVal('')
      localStorage.setItem('todos', JSON.stringify([...todos, newTask]))
      setLastDeletedItem(null)
    }    
  }

  //Toggle checkbox status handler - 
  const toggleCheckStatus = (id:number) => { 
    let updatedTodos = todos.filter((todo: TodoItemProps) => {
      if(todo.id === id){
        todo.isChecked = !todo.isChecked
      }
      return todo
    })      
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  //Delete todo handler - 
  const deleteTodoHandler = (id:number) => {
    let index = -1
    let deletedItem = todos.find((todo:TodoItemProps, ind: number) => {
      if(todo.id === id){
        index = ind
        return todo
      }
      return null
    })
    deletedItem && (index >= 0) && setLastDeletedItem({
      deletedItem,
      index
    })
    
    let updatedTodos = todos.filter((todo:TodoItemProps) => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    let updatedIdsList = idsList.filter((i:number) => i !== id)
    setIdsList(updatedIdsList)
    localStorage.setItem('idsList', JSON.stringify(updatedIdsList))    
  }

  //Search filter utility function - 
  const filterTodos = (val:string) => {    
    let storedTodos = localStorage.getItem('todos')
    if(storedTodos){
      let parsedTodo = JSON.parse(storedTodos)
      let filteredTodos = parsedTodo.filter((todo:TodoItemProps) => {                
        return todo.value.includes(val)
      })
      setTodos(filteredTodos)
    }
  }

  //Search input handler - 
  const searchTodoHandler = (val:string) => setSearchVal(val)

  useEffect(() => {
    let timerId = setTimeout(() => filterTodos(searchVal), 1000);
    return () => clearTimeout(timerId);
  }, [searchVal])

  //Undo handler
  const undoHandler = () => {
    if(lastDeletedItem && lastDeletedItem.deletedItem && lastDeletedItem.index >= 0){
      let todosCopy = [...todos]
      todosCopy.splice(lastDeletedItem.index, 0, lastDeletedItem.deletedItem)      
      setTodos(todosCopy)
      localStorage.setItem('todos', JSON.stringify(todosCopy))
      setLastDeletedItem(null)
    }
  }

  //Restoring todos data on page refresh
  useEffect(() => {
    let todos = localStorage.getItem('todos')
    let idsList = localStorage.getItem('idsList')
    if(idsList){
      setIdsList(JSON.parse(idsList))
    }
    if(todos){
      setTodos(JSON.parse(todos))
    }
  }, [])
        
  return (
    <TodoContext.Provider value={{
      todos, 
      setTodos, 
      searchVal, 
      searchTodoHandler, 
      filter, 
      setFilter, 
      addTaskInputVal, 
      setAddTaskInputVal, 
      addNewTaskHandler,
      toggleCheckStatus,
      deleteTodoHandler,
      lastDeletedItem,
      undoHandler
    }}>
      <TodoList />
    </TodoContext.Provider>    
  );
}

export default App;
