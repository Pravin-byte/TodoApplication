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

  const target = 'https://todoapplication-3-fcot.onrender.com';

  useEffect(() => {
    axios.get(`${target}/get`)
      .then(result => {
        console.log("Fetched todos:", result.data);
        setTodos(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = (type, id) => {
    if (type === 'icon') {
      axios.put(`${target}/update/${id}`)
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    } else if (type === 'trash-icon') {
      axios.delete(`${target}/delete/${id}`)
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
        target={target}
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
