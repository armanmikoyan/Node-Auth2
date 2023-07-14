import express from "express";
import mongoose from "mongoose"
import user from "../mongodb/Users.js"
import path from "path"



const app = express()

app.use(express.json())
app.use(express.static(path.resolve('front_end')))

app.get('/',  (req, res) => {
	res.sendFile(path.resolve("front_end/index.html"))	
})

app.get('/users', async (req, res) => {
	const users = await user.find({});
	res.sendFile(path.resolve("front_end/users.html"))

})

app.get('/usersarray', async (req, res) => {
	const users = await user.find({});
	res.send(users)

})

app.get('/registration', async (req, res) => {
	res.sendFile(path.resolve("front_end/registration.html"))	
})
app.get('/login', async (req, res) => {
	res.sendFile(path.resolve("front_end/login.html"))	
})

app.post('/registration', async (req, res) => {
	const {name,password} = req.body
     const newuser =new user({
		 name,
		 password
	 })
	await newuser.save();	 
})


app.post('/login', async (req, res) => {
	const {name,password} = req.body
    
	 const valid_user = await user.findOne({name});
	 if(valid_user && valid_user.password == password){
		 res.json('success')
	 }else{
		res.json('fail name or password is invalid')
	 }
	 
})






const start = async () => {
	try {
		app.listen(process.env.PORT || 3000)
		await mongoose.connect("mongodb+srv://armanmikoyan:123@cluster0.5hr3o9a.mongodb.net/")
		console.log(`connected in db and listening ${process.env.PORT || 3000} port `,)

	} catch (error) {
		console.log(error)
	}

}

start()