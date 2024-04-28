const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const {user} = new PrismaClient


async function getUserByUsername(req, res) {
    try {
        const {username} = req.params;
        const users = await user.findUnique({
        where: {
            userName: username,
        }, include: {
            posts: true
        }
    });
    if (!users) {
        return res.status(404).json({ status: 0, msg: 'User Not Found.' });
      }
  
      const { password, ...userData } = users;

      return res.status(200).json({ status: 1, msg: 'User Found.', user: userData });
  
    } catch (error) {
        return res.status(500).json({ status: 0, msg: `Server Error: ${error.message}` });
    }
}

async function register(req, res) {
    try {
      const { name, email, username, password } = req.body;
  
      // Vérification de l'existence de l'email et du nom d'utilisateur
      const existingUser = await user.findFirst({
        where: {
            OR: [{ email: email }, { userName: username }],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ status: 0, msg: 'Email or username is already in use.' });
      }
  
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Création d'un nouvel utilisateur
      const newUser = await user.create({
        data: {
          name: name,
          email: email,
          userName: username,
          password: hashedPassword,
          profileImageURL: "data:image/jpeg"
        },
      });
  
      // Création et envoi du token d'authentification
      const token = jwt.sign({ user_id: newUser.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      const refreshToken = jwt.sign({ user_id: newUser.id }, process.env.SECRET_KEY, { expiresIn: '1y' });
  
      return res.status(201).json({ status: 1, msg: 'Registered successfully.', token, refreshToken });
    } catch (error) {
      return res.status(500).json({ status: 0, msg: 'Failed while registering user', error: error.message });
    }
  }
  
 async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par email
      const users = await user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (!users) {
        return res.status(404).json({ status: 0, msg: 'User not found' });
      }
  
      // Vérification du mot de passe
      const passwordMatched = await bcrypt.compare(password, users.password);
      if (!passwordMatched) {
        return res.status(401).json({ status: 0, msg: 'Invalid password' });
      }
  
      // Création et envoi du token d'authentification
      const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      const refreshToken = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '1y' });
  
      return res.status(200).json({ status: 1, msg: 'Login successful.', token, refreshToken });
    } catch (error) {
      return res.status(500).json({ status: 0, msg: error.message });
    }
  }
  
  async function refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
  
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
      }
  
      jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid refresh token' });
        }
  
        const token = jwt.sign({ user_id: decoded.user_id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        const refreshToken = jwt.sign({ user_id: decoded.user_id }, process.env.SECRET_KEY, { expiresIn: '1y' });
  
        // Envoi du nouveau token d'accès au client
        res.json({ token, refreshToken });
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };

  module.exports = {
    login,
    register,
    refreshToken,
    getUserByUsername,
    
  }