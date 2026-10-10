import express from "express";
import mongoose from 'mongoose';


(async () => {
    const connectionIN = await mongoose.connect('mongodb+srv://aviton440_db_user:LbUfX2py6u30RG5c@mycluster1.08i6m7w.mongodb.net/')
    console.log(connectionIN.connection.host);
})()
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const USERS = mongoose.model('Users', userSchema);

const app = express();
app.use(express.json());

//create All Routes
app.post('/created-user', async (req, res) => {
    console.log(req.body);
    const user = await USERS.create(req.body);
    res.send(user);
    console.log(user);
})

// get All users data|| all Routes

app.get('/get-all-users', async (req, res) => {
    const user = await USERS.find();
    res.send(user);
    console.log(user);

})


//get single user
app.get('/get-single-user', async (req, res) => {
    const user = await USERS.findOne({ name: req.body.name });
    res.send(user);
    console.log(user);
})

//update user
app.put('/update-user', async (req, res) => {
    const user = await USERS.findByIdAndUpdate(req.query._id,
        req.body,
        { new: true })
    res.send(user);
})


app.delete('/delete-user', async (req, res) => {
    const user = await USERS.findByIdAndDelete(req.query._id);
    res.send(user);
})

app.listen(3000, () => {
    console.log('server is running');
})