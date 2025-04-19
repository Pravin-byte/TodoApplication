import React, { useEffect, useState } from 'react';
import Create from "./create";
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

function Home() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        console.log("Fetched todos:", result.data);
        setTodos(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = (type, id) => {
    if (type === 'icon') {
      axios.put(`http://localhost:3001/update/${id}`)
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    } else if (type === 'trash-icon') {
      axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    }
  };
  

  const handleEdit = (id, task) => {
    setIsEditing(true);
    setEditTask(task);
    setEditId(id);
  };

  return (
    <div className="Home">
      <h1>Todo List</h1>

      {/* Pass props correctly */}
      <Create
        isEditing={isEditing}
        editTask={editTask}
        editId={editId}
        setIsEditing={setIsEditing}
        setEditId={setEditId}
        setEditTask={setEditTask}
      />

      {
        todos.length === 0
          ? <h3>No records found</h3>
          : todos.map((todo) => (
            <div key={todo._id} className="tasks">
              <div className="task-left">
                {
                  todo.done
                    ? <BsFillCheckCircleFill className="icon" />
                    : <BsCircleFill className="icon cursor-pointer" onClick={() => handleClick("icon", todo._id)} />
                }
                <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
                <small>{todo.description}</small>
              </div>
              <div className="task-right">
                <FaEdit className='edit-icon cursor-pointer' onClick={() => handleEdit(todo._id, {task:todo.task , description:todo.description})} />
                <BsFillTrashFill
                  className="trash-icon text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleClick("trash-icon", todo._id)}
                />
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default Home;
