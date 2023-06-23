import { useState, useReducer } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  // START: REDUCER
  const todoListReducer = (state: any, action: any) => {
    switch (action.type) {
      case "ADD":
        return { ...state, todos: [...state.todos, action.payload] };
      case "REMOVE":
        return {
          ...state,
          todos: state.todos.filter((item: any) => item.id !== action.payload),
        };
      case "TOGGLE":
        return {
          ...state,
          todos: state.todos.map((item: any) => {
            if(item.id === action.payload) {
              return {...item, isComplete: !item.isComplete};
            } else {
              return {...item}
            }
          })
        };
      case 'EDIT':
      return {
        ...state, todos: state.todos.map((item: any) => {
          if(item.id === action.payload) {
            return { ...item, todoText: text}
          } else {
            return { ...item}
          }
        })
      }
    }
  };
  const initialState = {
    todos: [
      {
        id: 0,
        todoText: "Do your jobs",
        isComplete: false,
      },
    ],
  };
  const [state, dispatch] = useReducer(todoListReducer, initialState);
  // END: REDUCER
  const handleText = (e: any) => {
    setText(e.target.value);
  };

  const todoToggle = (todoId: number) => {
    dispatch({type:'TOGGLE', payload:todoId})
  };

  const editTodo = (todoId: number) => {
    setEditMode(true);
    setEditId(todoId);
    const editText = state.todos.find((item: any) => item.id === todoId);
    if (editText) {
      setText(editText.todoText);
    }
  };

  const removeTodo = (id: number) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (editMode) {
      await dispatch({type:'EDIT', payload: editId})
      setEditMode(false)
      setText("")
    } else {
      const updateTodo = {
        id: +Math.floor(Math.random() * 100),
        todoText: text,
        isComplete: false,
      };
      await dispatch({ type: "ADD", payload: updateTodo });
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
          { editMode ? 'Edit Todo' : 'Add Todo' }
        </button>
      </form>

      <div>
        {state.todos.map((item: any) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.isComplete}
              onChange={() => todoToggle(item.id)}
            />
            <span >{item.todoText}</span>
            <button onClick={() => editTodo(item.id)}>Edit</button>
            <button onClick={() => removeTodo(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
