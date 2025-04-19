import axios from 'axios';
import { useState, useEffect } from 'react';

function Create({ isEditing, editId, editTask, setIsEditing, setEditId, setEditTask }) {
  const [task, setTask] = useState('');
  const [description,setDescription]=useState('');

  useEffect(() => {
    if (isEditing) {
      setTask(editTask.task);
      setDescription(editTask.description)
    } else {
      setTask('');
      setDescription('');
    }
  }, [isEditing, editTask]);

  const handleSubmit = () => {
    if (!task.trim()) return;
    axios.post('http://localhost:3001/add', { task,description })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  const handleSave = () => {
    if (!task.trim()) return;
    axios.put(`http://localhost:3001/edit/${editId}`, { task,description })
      .then(() => {
        setIsEditing(false);
        setEditId('');
        setEditTask('');
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditId('');
    setEditTask('');
    setTask('');
    setDescription('');
  };

  return (
    <div className="create">
      <input
        type="text"
        name="add-task"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input type="text" name="add-description" placeholder='Enter tasks description' value={description} onChange={(e) => setDescription(e.target.value)} />
      {
        isEditing ?
          <>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </>
          :
          <button type="button" onClick={handleSubmit}>Add</button>
      }
    </div>
  );
}

export default Create;
