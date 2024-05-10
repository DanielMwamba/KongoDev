const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const { user } = new PrismaClient


async function getUserByUsername(req, res) {
  try {
    const { username } = req.params;
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
    const token = jwt.sign({ user_id: users.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ user_id: users.id }, process.env.SECRET_KEY, { expiresIn: '1y' });

    return res.status(200).json({ status: 1, msg: 'Login successful.', token, refreshToken });
  } catch (error) {
    return res.status(500).json({ status: 0, msg: error.message });
  }
};


async function User(req, res) {
  try {
    const userId = req.user_id;
    const userData = await user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        posts: true
      }
    });
    if (!userData) {
      return res.status(404).json({ status: 0, msg: "User Not Found." });
    }

    return res.status(200).json({ status: 1, msg: "User Found.", user: userData });
  } catch (error) {
    return res.status(500).json({ status: 0, msg: `Server Error : ${error.message}` });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await user.findMany();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = parseInt(req.user_id);
    const userData = req.body;
    const { username } = req.body;

    //Username Validation
    const usernameExist = await user.findFirst({
      where: {
        userName: username,
        NOT: { id: userId }
      },
    });
    if (usernameExist) {
      return res.status(400).json({ status: 0, msg: `Username is already taken.` });
    }

    const updatedUser = await user.update({
      where: { id: userId },
      data: userData,
    });

    if (!updateUser) {
      return res.status(404).json({error: 'User not found'})
    }

    return res.status(200).json({ status: 1, msg: 'User updated successfully:', updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Unable to update user' });
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
  User,
  getAllUsers,
  updateUser,
  refreshToken,
  getUserByUsername,

}