const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {PrismaClient} = require("@prisma/client");
const {user} = new PrismaClient


async function getUserByUsername(req, res) {
    try {
        const { username } = req.params;

        const dataUser = await user.findUnique({
            where: {userName : username},
            select: {posts : { select : {description: true}}},
        });

        if(!user) {
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).send(dataUser)
    } catch (error) {
        return res.status(500).send(error.message) 
    }
};


async function getAllUsers(req, res) {
    try {
        const users = await user.findMany();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error.message)
    }
};


async function updateUser(req, res) {
    
    try {
        const userId = req.id;
        const userData = req.body;
        const {username} = req.body;

        //Username Validation
        const usernameExist = await user.findUnique({
            where: {userName: username, id: userId },
        });
        if(usernameExist) {
            return res.status(400).json({msg: "Username is Already taken"});
        }
        const updateUser = await user.update({
            where: {id: userId},
            data: userData
        });

        if (!updateUser) {
            return res.status(404).json({msg:"User not found"})
        }
        return res.status(200).json("User update success")
        
    } catch (error) {
        console.error("error updating user:", error)
        return res.status(500).json({msg:"Unable to update user"})
    }
}

async function register(req, res) {
    try {
        const { name, email, username, password } = req.body;

        //Email Validation 
        const emailExist = await user.findUnique({ where : {email: email} });
        if (emailExist) {
            return res
                .status(400)
                .json({msg:"Email is Already in Use"});
        }
        
        //Username validation 
        const usernameExist = await user.findUnique({
            where: {userName: username},
        })
        if (usernameExist) {
            return res
                .status(400)
                .json({msg:"Username is Already taken"})
        }
        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            data: {
                name,
                email,
                username,
                password : hashedPassword,
                profileImageURL: ""
            }
        });

        if (!newUser) {
            return res
                .status(500)
                .send("Failed to create user")

        }

        //Generate access and refresh tokens 
        const token = jwt.sign({email: newUser.email}, process.env.SECRET_KEY, {expiresIn: "24h"});
        const refreshToken = jwt.sign({email: newUser.email},  process.env.SECRET_KEY, {expiresIn: "1y"});

        return res.status(201).json({msg:"Registered succes", token, refreshToken})
 

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send("Failed to register")
    }
}


async function login(req, res) {
    try {
        const {email, password} = req.body;

        const users = await user.findUnique({where: {email: email}});
        if(!users) return res.status(404).json({msg:"User not found"})

        const passwordMatched = await bcrypt.compare(password, users.password);
        if (!passwordMatched) return res.status(401).json({msg:"Invalid Password"})

        const token = jwt.sign({email: newUser.email}, process.env.SECRET_KEY, {expiresIn: "24h"});
        const refreshToken = jwt.sign({email: newUser.email},  process.env.SECRET_KEY, {expiresIn: "1y"});

        return res.status(200).json({msg:"Login Successfull", token, refreshToken})
    } catch (error) {
        
    }
}

export async function refreshToken(req, res) {
    try {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(401).send("Refresh token not provided")
        }

        //Verify refresh token 
        //if valid, generate a new acess token and potentially a new refresh token
        jwt.verify(refreshToken, process.env.SECRET_KEY, (err) => {
            if(err) {
                return res.status(401).send("Invalid refresh token")
            }

            const token = jwt.sign({email: newUser.email}, process.env.SECRET_KEY, {expiresIn: "24h"});
            const refreshToken = jwt.sign({email: newUser.email},  process.env.SECRET_KEY, {expiresIn: "1y"});

            //json the new acess token to the client
            res.json({token, refreshToken})
        })
    } catch (error) {
        res.status(500).json({msg: "Server error", error: error.message})
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    register,
    login,
    refreshToken,
    updateUser
}

