const express = require("express");
const app = express();

const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({ extended:false}))


let users = [
    {
        id:"1",
        firstname:"John",
        lastname:"Doe"
    },
    {
        id:"2",
        firstname:"Jane",
        lastname:"Smith"
    },
];

// get the list of users
app.get('/user', (req,res) => {
    res.json(users);
})

//add a user to the list
app.post('/user', (req,res) => {
    const newUser = req.body;
    // newUser.id = Math.max(...users.map(user => user.id)) + 1;
    console.log(newUser)
    users.push(newUser);
    // res.json(users);
    res.send("New user aaded to the list");
})

//search for a user in the list
app.get('/user/:id', (req,res) => {
    const id = req.params.id;
    
    for(let eachUser of users){
        if(eachUser.id === id){
            res.json(eachUser);
            return;
        }
    }
    res.status(404).send("User not found");
})

// update a user in the list
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const { firstname, lastname } = req.body;

    let user = users.find(user => user.id === id);
    if (user) {
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

// delete a user from the list
app.delete('/user/:id', (req,res) => {
    const id = req.params.id;
    users = users.filter(user => user.id!== id);
    res.send("User deleted successfully");
})


app.listen(port, () => console.log(`Server listening on ${port}`));