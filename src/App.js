import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([{ id: 1, name: 'This is just a ', complete: false}, { id: 2, name: 'small demo of my', complete: false}, { id: 3, name: 'React skills  :-)', complete: false}])
  const todoNameRef = useRef()

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id )
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <br/>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <br/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo} >Add Todo</button><br/><br/>
    <button class="btn btn-danger" onClick={handleClearTodos}>Clear Completed</button>
    <br/><br/>
    <div>{todos.filter(todo => !todo.complete).length} todos left</div>
    </>
  );
}

export default App;
