const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

const generateTokens = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '59m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
  
    return ({
      accessToken,
      refreshToken
    });
  } catch (error) {
    return console.error(error);
  }
}

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

 async function saveToken(userId, refreshToken) {
  try {
    const tokenData = await Token.findOne({
      where: {
        user_id: userId,
      },
    });
    
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    } else {
      const token = await Token.create({
        user_id: userId,
        refresh_tokes: refreshToken,
      });
      return token;
    }
  } catch (error) {
    return console.error(error);
  }
}

async function removeToken(refreshToken) {
  try {
    const deletedToken = await Token.destroy({
      where: {
        refresh_tokes: refreshToken,
      },
    });
    return deletedToken;
  } catch (error) {
    return console.error(error);  }
}

async function findToken(refreshToken) {
  try {
    const foundToken = await Token.findOne({
      where: {
        refresh_tokes: refreshToken,
      },
    });
    return foundToken;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { 
  generateTokens, 
  saveToken, 
  removeToken, 
  findToken, 
  validateAccessToken, 
  validateRefreshToken 
};
