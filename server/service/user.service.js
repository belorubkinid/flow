const { User } = require('../db/models');
const { userObj } = require('./../controllers/userObj.controller');
const { generateTokens, saveToken, removeToken, validateAccessToken, validateRefreshToken, findToken } = require('../service/token.service');
const bcrypt = require('bcrypt');

async function signup(first_name, last_name, email, phone, password) {
  try {
    const isUserExist = await User.findOne({
      where: { email },
    });
    if (isUserExist) {
      return ({ success: false, errors: `Пользователь с почтой ${email} уже зарегистрирован!` });
    }
  
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({ first_name, last_name, email, phone, password: hashPassword });
    const userToken = userObj(user);
    const tokens = generateTokens({...userToken});
    await saveToken(userToken.id, tokens.refreshToken);
    return ({
      ...tokens,
      user: userToken,
    });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

async function login(email, password) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return ({ success: false, errors: `Пользователь с почтой ${email} не зарегистрирован!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return ({ success: false, errors: 'Пароль неверный' });
    }
    const userToken = userObj(user);
    const tokens = generateTokens({ ...userToken });
    await saveToken(userToken.id, tokens.refreshToken);
  
    return ({
      ...tokens,
      user: userToken,
    });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

async function logout(refreshToken) {
  try {
    const token = await removeToken(refreshToken);
    return token;
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}


async function refresh(refreshToken) {
  try {
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw Error;
    }
    const currentUser = await User.findOne({
      where: {
        id: userData.id,
      },
    });
    const userToken = userObj(currentUser);
    const tokens = generateTokens({ ...userToken });
    await saveToken(userToken.id, tokens.refreshToken);
    return ({
      ...tokens,
      user: userToken,
    });
  } catch (error) {
    return console.error(error);
  }
}

async function access(accessToken) {
  try {
    if (!accessToken) {
      return null;
    }
    const userData = validateAccessToken(accessToken);
    const currentUser = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    const userToken = userObj(currentUser);
    return ({
      user: userToken,
    });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

module.exports = { login, logout, refresh, signup, access };
