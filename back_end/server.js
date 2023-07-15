import express from "express";
import mongoose from "mongoose"
import user from "../mongodb/Users.js"
import path from "path"
import jwt from "jsonwebtoken"


export const secret_key = "secret_key"
function generateAccessToken(id,name){
	const payload = {
		id,
		name
	}
	
	return jwt.sign(payload,secret_key,{
		expiresIn:'24h'
	})
}


  

  





const app = express()

app.use(express.json())
app.use(express.static(path.resolve('front_end')))

app.get('/',  (req, res) => {
	res.sendFile(path.resolve("front_end/index.html"))	
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
		 const token = generateAccessToken(user._id,user._name)
		 res.json(token)
		 
	 }else{
		res.json('fail name or password is invalid')
	 }
	 
})

const checkTokenMiddleware = (req, res, next) => {

	const token = req.headers.authorization;

	if (!token || !token.startsWith('Bearer ')) {
	  return res.status(401).json({ error: 'Unauthsorized' });
	}

	const formattedToken = token.split(' ')[1];
  
	try {

	  const decoded = jwt.verify(formattedToken,secret_key);
	 
	  req.users = decoded;
	  next();
	} catch (error) {
	  return res.status(401).json({ error: 'Unauthorized' });
	}
  };


app.get('/users', checkTokenMiddleware, async (req, res) => {
	const users = await user.find();
	res.json(users)
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