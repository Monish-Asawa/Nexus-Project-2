const cors = require("cors"); 
const bodyParser = require('body-parser');
const mongoose = require("mongoose"); 
const PORT = 8000; 

// add link to your database here
mongoose.connect("mongodb://127.0.0.1:27017/trial_database").then(() => {console.log("Connected to Database!")}).catch(err => {console.log("Error occured: ", err)}); 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true 
    }, 
    lastName: {
        type: String
    },
    email: {
        type: String, 
        required: true,
        unique: true 
    }, 
    password:{
        type: String,
        required: true    
    }
});

const User = mongoose.model('user', userSchema); 
    
const express = require("express"); 
const app = express(); 

app.use(cors()); 
app.use(express.json());


app.get('/users' , async (req, res) => {
    const allusers = await User.find({});  
    console.log(allusers); 
    const code = `
        <html> 
            <body>
                <ul>
                    ${allusers.map( (user) => `<li>${user.firstName} - ${user.email}</li>` ).join("")}
                </ul>
            </body>
        </html>
    `; 
    return res.send(code); 
}); 





app.post('/signUp/user', async (req, res) => {
    const body = req.body;
    console.log(body); 
    if( !body || !body.firstName || !body.email || !body.password )
    {
        console.log('Please fill all the required fields...'); 
        return res.status(400).json({msg: 'Please fill all the required fields...'}); 
    }
    
    const result = await User.create({
        firstName: body.firstName, 
        lastName: body.lastName, 
        email: body.email,
        password: body.password
    }); 

    console.log('msg: user registered successfully!'); 
    return res.status(201).json({msg: "Success"});     
}); 



app.post('/login/user', async (req, res) => {
    const body = req.body; 

    if( !body || !body.email || !body.password )
    {
        console.log("Enter all the asked details!"); 
        return res.status(400).json({msg: 'fill all the required details'});
    }

    const findRes = await User.findOne({email: body.email}); 
    if( !findRes )
    {
        console.log('msg: No such user exists'); 
        return res.status(404).json({msg: 'No such user exist'}); 
    }
    else if( findRes.password !== body.password )
    {
        console.log('msg: Wrong password entered'); 
        return res.status(401).json({msg: "Wrong password entered"}); 
    } 
    
    console.log('msg: Logged in successfully');
    return res.status(200).json({username: findRes.firstName}); 
}); 



app.listen(PORT, () => {console.log("Server started at Port: ", PORT)}); 
