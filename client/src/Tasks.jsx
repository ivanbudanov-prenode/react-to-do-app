import React from "react";

import {Component} from 'react';
import { useEffect, useState } from 'react';
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
import axios from "axios";

const API_NODE = "http://localhost:3000/tasks";
const API_PYTHON = "http://localhost:8000/task";
const API_TEST = "https://jsonplaceholder.typicode.com/posts";

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

  const [state, setState] = useState(label);
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

/*type Task = {
  name: string;
  id: string;
  isEditing: string;
  isChecked: string;
};*/

const Tasks = () => {
  const [list, setList] = React.useState(initialList);
  /*const [tasks1, setTasks1] = useState(Array(0).fill(null));*/
  const [editingTaskId, setEditingTaskId] = useState(0);
  /*const [data, setData] = useState<Task[]>([]);*/
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        // Make GET request to fetch data
        axios
            .get(API_NODE)
            .then((response) => {
                setData(response.data.data);
                console.log("H: ", response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    

    /*return (
      <div>
            <h1>Posts</h1>
            <ul>
                {data.tasks.map((post) => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
        </div>
    );*/

  /*useEffect(() => {
  const fetchData = async () => {
    const result = await axios(`${API}`);

    setData(result.data.hits);
  };

  fetchData();
}, []);*/
/* */

  function handleCreateButtonClick() {
    const nextTasks = data.slice();
    console.log("juice");
    console.log("juice" + nextTasks);
    const nextId = findNewId();

    const newTask = {name: 'Empty', id: 0, isEditing: true, isChecked: false};

    

        // Make POST request to send data
        axios
            .post(API_NODE, newTask)
            .then((response) => {
                console.log("response data id: ", response.data.id);
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

    console.log(nextTasks);
    console.log("hi");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  function handleDeleteButtonClick() {
    let nextTasks = data.slice();
    nextTasks = nextTasks.filter(task => task.isChecked === false);
    console.log(nextTasks);
    setData(nextTasks);
  }

  function handleTaskClick(id) {
    let result = data.find(obj => obj.id === id);
    console.log(result);
    setEditingTaskId(result.id);
    console.log(result.id);
    console.log("cheese");
  }

  function handleCheckboxClick(id) {
    let result = data.tasks.find(obj => obj.id === id);
    const taskIndex = data.tasks.findIndex(x => x.id === id);

    let nextTasks = data.slice();
    nextTasks[taskIndex] = {name: result.name, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked}
    setData(nextTasks);
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
    
    let result = data.find(obj => obj.id === id);
    const taskIndex = data.findIndex(x => x.id === id);

    let nextTasks = data.slice();
    const newTask = {name: newName, id: result.id, isEditing: result.isEditing, isChecked: !result.isChecked};
    
    console.log("one");
    axios
            .put(API_NODE, newTask)
            .then((response) => {
                console.log("two");
                nextTasks[taskIndex] = newTask;
                setEditingTaskId(nextTasks.length + 1);
                setData(nextTasks);
                setLoading(false);

            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

    console.log("three");
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    setData(nextTasks);
    console.log("four");
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
        {data && data?.map((task) => (
                    <TaskWithCheckbox label={task.name} taskId={task.id} editingTaskId={editingTaskId} onListItemClick={() => handleTaskClick(task.id)} onCheckboxClick={() => handleCheckboxClick(task.id)} onEnterDown={(newName) => handleEnterDown(task.id, newName)} />
                ))}

    </div>
  );
};

export default Tasks;