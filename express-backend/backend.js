import express from "express";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users;
    if (name != undefined){
        result = findUserByName(name);
        result = {users_list: result};
    }
    if (job != undefined){
        result = findUserByJob(job);
        result = {users_list: result};
    }
    res.send(result);
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; 
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = {...generateID(), ...req.body};
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user) {
    users['users_list'].push(user);
}

function generateID() {
    return {id: uuidv4().slice(0, 5)};
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(result);
        res.status(204).end();
    }
});

function deleteUser(user) {
    const index = users['users_list'].indexOf(user)
    users['users_list'].splice(index, 1);
}
