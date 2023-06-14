const { login, logout, refresh, signup, access } = require('./../service/user.service')

const userRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;
    const userData = await signup(first_name, last_name, email, phone, password);
    if(userData?.success === false) return res.json({ errorMessage: userData.errors });

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", userData.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.json(userData);
    
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await login(email, password);
    if(userData?.success === false) return res.json({ errorMessage: userData.errors });
    
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", userData.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.json(userData);
    
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};


const userLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logout(refreshToken);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.json(token);

  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};


async function userRefresh(req, res) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}

async function userAccess(req, res) {
  try {
    const { accessToken} = req.cookies;
    const userData = await access(accessToken);
    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
}


module.exports = { userAccess, userRegister, userLogin, userLogout, userRefresh };
