import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true,
	  unique: true
	},
	password: {
	  type: String,
	  required: true
	},


  });
  

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

export default User
