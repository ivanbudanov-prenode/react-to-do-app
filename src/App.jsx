import React, {Component} from 'react';
import { useState } from 'react';
import './App.css';
/*import Button from '@material-ui/core/Button'; */
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const CreateButton = ({ label }) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
    console.log(isClicked);
  }
  return <div><Button variant="contained" onClick={handleClick}>{label}</Button></div>
}

const DeleteButton = ({ label }) => {
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

const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
    <>
    <div className="App"> 
        <br />
        <CreateButton label={'Create'}/>
        <br />
        <DeleteButton label={'Delete'}/>
        <br />
        <CustomList />
        <List list={list} onClick={handleRemove} />;

    </div>

    </>
  );
};


const List2 = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>{item.firstname}</span>
    <span>{item.lastname}</span>
    <span>{item.year}</span>
    <button type="button" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </li>
);

export default App;

/*        <Box
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    margin: "auto",
                    bgcolor: "background.paper",
                }}
            >
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
                <Divider />
            </Box>*/


/*const App = () => {
  return (
    <>
    <div className="App"> 
        <br />
        <Button variant="contained">Create</Button> 
    </div>
    <div className="App"> 
        <br />
        <Button variant="contained">Delete</Button> 
        <UserProfile />
    </div>
    </>
  );
};*/

/*class App extends Component {
  

  render(){
    return (
      <>
      <div className="App"> 
        <br />
        <Button variant="text">Text</Button> 
    </div>
      
      </>
    ); 
  }
 
}

export default App;*/

/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
