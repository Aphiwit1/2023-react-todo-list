import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 0,
      todoText: "Do your jobs",
      isComplete: false,
    },
    {
      id: 1,
      todoText: "Drinks 8 cups of water/day",
      isComplete: false,
    },
  ]);

  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0)

  const handleText = (e: any) => {
    setText(e.target.value);
  };

  const todoToggle = (todoId: number) => {
    const updateToggle = todo.map((item) => {
      if (todoId == item.id) {
        return { ...item, isComplete: !item.isComplete };
      } else {
        return { ...item };
      }
    });

    setTodo(updateToggle);
  };

  const editTodo = (todoId: number) => {
    setEditMode(true)
    setEditId(todoId)
    const editText = todo.find((item) => item.id === todoId) 
    if(editText) {
      setText(editText.todoText);
    }

  }

  const removeTodo = (id: number) => {
    const updateTodo = todo.filter((item) => item.id !== id);
    setTodo(updateTodo);
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    if (editMode) {
      // const updateTodo = todo.map((item) => {})
      const updateTodo = todo.map(item => {
         if(item.id === editId) {
          return {...item, todoText: text}
         } else {
          return {...item}
         }
      })

      setTodo(updateTodo)
    } else {
      const updateTodo = {
        id: +Math.floor(Math.random() * 100),
        todoText: text,
        isComplete: false,
      };
      setTodo([...todo, updateTodo]);
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="todoListInput"
          value={text}
          onChange={handleText}
        />
        <button type="submit" name="submit-button">
          Add Todo
        </button>
      </form>

      <div>
        {todo.map((todo) => (
          <li>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => todoToggle(todo.id)}
            />
            <span key={todo.id}>{todo.todoText}</span>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
