import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
     <div>
         <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        <span class="todoItem">  {todo.name} </span>
         </label>
     </div>
    )
}
