import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const API_NODE = "http://localhost:3000/tasks";
const API_PYTHON = "http://localhost:8000/tasks";

function TaskWithCheckbox( { label, taskId, editingTaskId, onListItemClick, onCheckboxClick, onEnterDown} ) {
  return <div>
    <CustomCheckbox onCheckboxClick={onCheckboxClick} />
    <CustomListItem label={label} taskId={taskId} editingTaskId={editingTaskId} onListItemClick={onListItemClick} onEnterDown={onEnterDown} />
  </div>
}

function CustomCheckbox( { onCheckboxClick}) {
  return <div>
    <Checkbox onClick={onCheckboxClick} />
  </div>
}

function CustomListItem( { label, taskId, editingTaskId, onListItemClick, onEnterDown }) {
  const [state, setState] = useState(label);
  
  function handleChange(event) {
    setState(event.target.value);
  };

  if(taskId == editingTaskId) {
  return <div>
    <ListItem disablePadding>
      <ListItemButton onClick={onListItemClick}>
        <TextField onChange={(e) => handleChange(e)} onKeyDown={(e) => (e.key == "Enter" ? onEnterDown(state): null)} 
          value={ state } />
      </ListItemButton>
    </ListItem>
  </div>
  }
  else {
    return <div>
    <ListItem disablePadding>
      <ListItemButton onClick={onListItemClick}>
        <ListItemText
          primary={ state } />
      </ListItemButton>
    </ListItem>
  </div>
  }
}

function CreateButton ({ label, onCreateButtonClick }) {
  return <div><Button variant="contained" onClick={onCreateButtonClick}>{label}</Button></div>
}

function DeleteButton ({ label, onDeleteButtonClick }) {
  return <div><Button variant="contained" onClick={onDeleteButtonClick}>{label}</Button></div>
}

function MarkCompletedButton({ label }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return <div><Button variant="contained" onClick={handleClick}>{label}</Button></div>
}


export default function Tasks() {
  const [editingTaskId, setEditingTaskId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_NODE)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  function handleCreateButtonClick() {
    const nextTasks = data.slice();
    const newTask = {name: 'Empty', id: 0, isEditing: true, isChecked: false};

    axios
      .post(API_NODE, newTask)
      .then((response) => {
        newTask.id = response.data.id;
        nextTasks.push(newTask)
        setEditingTaskId(nextTasks.length + 1);
        setData(nextTasks);
        setLoading(false);
    })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  function handleDeleteButtonClick() {
    let nextTasks = data.slice();
    nextTasks = nextTasks.filter(task => task.isChecked === false);
    setData(nextTasks);
  }

  function handleTaskClick(id) {
    let result = data.find(obj => obj.id === id);
    setEditingTaskId(result.id);
  }

  function handleCheckboxClick(id) {
    let result = data.tasks.find(obj => obj.id === id);
    const taskIndex = data.tasks.findIndex(x => x.id === id);
    let nextTasks = data.slice();
    nextTasks[taskIndex] = {name: result.name, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked}
    setData(nextTasks);
  }

  function handleEnterDown(id, newName) {
    setEditingTaskId(0);
    
    let result = data.find(obj => obj.id === id);
    const taskIndex = data.findIndex(x => x.id === id);

    let nextTasks = data.slice();
    const newTask = {name: newName, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked};
    axios
      .put(API_NODE, newTask)
      .then((response) => {
        nextTasks[taskIndex] = newTask;
        setEditingTaskId(0);
        setData(nextTasks);
        setLoading(false);

      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  }

  return (
    <div> 
        <br />
        <CreateButton label={'Create'} onCreateButtonClick={() => handleCreateButtonClick()} />
        <br />
        <DeleteButton label={'Delete'} onDeleteButtonClick={() => handleDeleteButtonClick()} />
        <br />
        <MarkCompletedButton label={'Mark Completed'}/>
        <br />
        {data && data?.map((task) => (
                    <TaskWithCheckbox label={task.name} taskId={task.id} editingTaskId={editingTaskId} onListItemClick={() => handleTaskClick(task.id)} onCheckboxClick={() => handleCheckboxClick(task.id)} onEnterDown={(newName) => handleEnterDown(task.id, newName)} />
                ))}

    </div>
  );
};