export const URL_API = `${process.env.REACT_APP_SERVER_URL}`;

export const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
};
