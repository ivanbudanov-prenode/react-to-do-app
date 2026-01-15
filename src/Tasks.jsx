import React from "react";

import {Component} from 'react';
import { useState } from 'react';
/*import Button from '@material-ui/core/Button'; */
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const TaskWithCheckbox = ( { label, taskId, editingTaskId, onListItemClick, onCheckboxClick, onEnterDown} ) => {
  return <div>
    <CustomCheckbox onCheckboxClick={onCheckboxClick} />
    <CustomListItem label={label} taskId={taskId} editingTaskId={editingTaskId} onListItemClick={onListItemClick} onEnterDown={onEnterDown} />
  </div>
}

const CustomCheckbox = ( { onCheckboxClick}) => {
  return <div>
    <Checkbox onClick={onCheckboxClick} />
  </div>
}

const CustomListItem = ( { label, taskId, editingTaskId, onListItemClick, onEnterDown }) => {
  /*const [isEditing, setIsEditing] = useState(false);*/
  const [currentLabel, setCurrentLabel] = useState(label);

  const [state, setState] = useState("");
  const [name, setName] = useState("");
  
  const handleChange = (event) => {
    setState(event.target.value);
  };


  /*function handleEnterDown2() {
    newLabel = 
    setCurrentLabel
  }*/

  if(taskId == editingTaskId) {
  return <div>
    <ListItem disablePadding>
      <ListItemButton onClick={onListItemClick}>
        <TextField onChange={(e) => handleChange(e)} onKeyDown={(e) => (e.key == "Enter" ? onEnterDown({ state }): null)} 
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

const tasks = [ {name: 'Joe', id: '0',}, {name: 'Janet', id: '1',}];

const CreateButton = ({ label, onCreateButtonClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
    console.log(isClicked);
  }
  return <div><Button variant="contained" onClick={onCreateButtonClick}>{label}</Button></div>
}

const DeleteButton = ({ label, onDeleteButtonClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return <div><Button variant="contained" onClick={onDeleteButtonClick}>{label}</Button></div>
}

const MarkCompletedButton = ({ label }) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return <div><Button variant="contained" onClick={handleClick}>{label}</Button></div>
}

const CustomList = () => {
  return <div>
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary="Task 1" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary="Task 2" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary="Task 3" />
        </ListItemButton>
      </ListItem>
    </List>
  </div>
}

const initialList = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

const Tasks = () => {
  const [list, setList] = React.useState(initialList);
  const [tasks1, setTasks1] = useState(Array(0).fill(null));
  const [editingTaskId, setEditingTaskId] = useState(0);

  function handleCreateButtonClick() {
    const nextTasks = tasks1.slice();
    const nextId = findNewId();
    nextTasks.push({name: 'Empty', id: nextTasks.length + 1, isEditing: true, isChecked: false})
    setEditingTaskId(nextTasks.length + 1);
    setTasks1(nextTasks);
    console.log(nextTasks);
    console.log("hi");
  }

  function handleDeleteButtonClick() {
    let nextTasks = tasks1.slice();
    nextTasks = nextTasks.filter(task => task.isChecked === false);
    console.log(nextTasks);
    setTasks1(nextTasks);
  }

  function handleTaskClick(id) {
    let result = tasks1.find(obj => obj.id === id);
    setEditingTaskId(result.id);
    console.log(result.id);
    console.log("cheese");
  }

  function handleCheckboxClick(id) {
    let result = tasks1.find(obj => obj.id === id);
    const taskIndex = tasks1.findIndex(x => x.id === id);

    let nextTasks = tasks1.slice();
    nextTasks[taskIndex] = {name: result.name, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked}
    setTasks1(nextTasks);
    console.log(nextTasks);
  }

  function findNewId() {
    const ids = tasks.map(({id}) => id);
    const nextId = Math.max(...ids) + 1;
    return nextId;
  }

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  const handleEnterDown = (id, newName) => {
    setEditingTaskId(0);
    
    let result = tasks1.find(obj => obj.id === id);
    const taskIndex = tasks1.findIndex(x => x.id === id);

    let nextTasks = tasks1.slice();
    nextTasks[taskIndex] = {name: newName, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked}
    setTasks1(nextTasks);
    console.log(nextTasks);
  }
  /*function handleEnterDown(id, newName) {
    setEditingTaskId(0);
    
    let result = tasks1.find(obj => obj.id === id);
    const taskIndex = tasks1.findIndex(x => x.id === id);

    let nextTasks = tasks1.slice();
    nextTasks[taskIndex] = {name: newName, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked}
    setTasks1(nextTasks);
    console.log(nextTasks);
  }*/

  return (
    <div> 
        <br />
        <CreateButton label={'Create'} onCreateButtonClick={() => handleCreateButtonClick()} />
        <br />
        <DeleteButton label={'Delete'} onDeleteButtonClick={() => handleDeleteButtonClick()} />
        <br />
        <MarkCompletedButton label={'Mark Completed'}/>
        <br />
        <List list={list} onClick={handleRemove} />
        {tasks1.map(function(task) {
          return (
            <div>
            <TaskWithCheckbox label={task.name} taskId={task.id} editingTaskId={editingTaskId} onListItemClick={() => handleTaskClick(task.id)} onCheckboxClick={() => handleCheckboxClick(task.id)} onEnterDown={(newName) => handleEnterDown(task.id, newName)} />
            </div>
          )
        })}
        

    </div>
  );
};

export default Tasks;