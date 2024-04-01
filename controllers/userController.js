const berypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../modules/userModels')
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All field required");
    };
    const alreadyUser = await User.findOne({email});
    if(alreadyUser){
        res.status(400);
        throw new Error("User already Registered with this email")
    }
    const hasedPassword = await berypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password : hasedPassword
    });
    console.log(newUser);
    if(newUser){
        res.status(201).json({
            _id : newUser.id,
            email : newUser.email
        });
    } else {
        res.status(400);
        throw new Error("User data us not vaild")
    }   
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(401);
        throw new Error("All field required");
    };

    const user = await User.findOne({email});
    if(user && (await berypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id
            }
        },
            process.env.ACCESS_TOKEN,
            {expiresIn: "30m"}
    );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const currentUser = (req, res) => {
    const user = req.user
    res.json({
        user
    })
}

module.exports = { registerUser, loginUser, currentUser }