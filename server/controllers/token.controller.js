const jwt = require('jsonwebtoken')
const { Token } = require('../db/models');


const generateTokens = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '60d'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '60d'})
    return ({
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

const saveToken = async (userID, refreshToken) => {
  try {
    const tokenData = await Token.findOne({
      where: {
        user_id: userID,
      }
    });
  
    if(tokenData) {
      tokenData.refresh_tokes = refreshToken;
      return tokenData.save();
    }
    
    const token = await Token.create({
      user_id: userID,
      refresh_tokes: refreshToken,
    });
    
    return token;
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

const removeToken = async (refreshToken) => {
  try {
    const tokenData = await Token.destroy({
      where: {
        refresh_tokes: refreshToken,
      },
    });
    return tokenData;
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}


module.exports = { generateTokens, saveToken, removeToken };
