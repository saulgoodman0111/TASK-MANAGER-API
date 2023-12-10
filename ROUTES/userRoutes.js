const express=require('express');
const User=require('../MODELS/User');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send("user routes working fine !!!");
});

// <--- REGISTER A USER --->

router.post('/register', async(req, res) => {
try{
  const {name, email, password}=req.body;

  const user=new User({name, email, password});

  await user.save();

  res.status(201).json({
    user,
    message: "congratulations! user successfully created"
  })
} catch(err){
  res.status(400).json({
    error: err
  });
}
});

// <--- LOGIN A USER --> //
router.post('/login', async (req, res) => {
  try {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if(!user){
      //  throw new Error('Unable to login , invalid credentials');
      res.send({error: "Unable to login , invalid credentials"});
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if(!isMatch){
      //  throw new Error('Unable to login , invalid credentials');
      res.send({error: "Unable to login , invalid credentials"});
   }

   const token = jwt.sign({
       _id: user._id.toString()
   }, process.env.JWT_SECRET_KEY );
   // user, token 
   res.send({user, token, message: "User logged in successfully !!!"}, );
  }
   catch (err) {
       res.status(400).send({ error: err });
   }
});

module.exports=router;