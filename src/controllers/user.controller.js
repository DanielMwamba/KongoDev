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
            return res.status(404).send("Utilisateur non trouvé")
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
        
    } catch (error) {
        
    }
}