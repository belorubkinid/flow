import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actionCreate/userActionCreate';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './Login.css';
import { useState } from 'react';


export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone: '',
      email: '',
      password: '',

    }
  });
  const dispatch = useDispatch();
	const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = (data) => {
		const payload = {
			email: data.email,
			password: data.password,
		};

    axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, payload, {
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data?.errorMessage) {
        setLoginError(data.errorMessage);
        setTimeout(() => {
          setLoginError(null);
        }, 3000);
      }
      if (data?.user) {
        dispatch(login(data));
        if (data?.user?.admin) {
          navigate('/adminboard');
        } else {
          navigate('/');
        }
      }
		})
    .catch(console.error());
	};

  return (
    <div className="container divider">
      <div className="form-wrapper">
      <h2>Войти</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-input">
          <label htmlFor="email" className="card-input__label">Email</label>
          <input className="card-input__input" {...register("email", {
                required: true,
                pattern: /@/g,
              })} name="email" id="email" />
        </div>
        <div className="card-input">
          <label htmlFor="password" className="card-input__label">Пароль</label>
          <input {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "🌼 Пароль должен содержать не менее 5 символов",
                },
              })} name="password" type="password" id="password" className="card-input__input" />
        </div>
        <button type="submit" className="btn">Войти</button>
        {loginError && (<p className="error">{loginError}</p>)}
      </form>

      {errors?.email && (
        <p className="error">{errors?.email.message || "🌼 Введите действительную почту"}</p>
      )}

      {errors?.password && (
        <p className="error">{errors?.password?.message}</p>
      )}

      <p>Забыли пароль?</p>
      <Link className="nav-item-link" to="/remind">Восстановить пароль</Link>
    </div>
    </div>
  );
}
