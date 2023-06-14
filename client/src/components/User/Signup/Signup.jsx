import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signup } from '../../../redux/actionCreate/userActionCreate';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function Signup() {
  const [registrationError, setRegistrationError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: ''
    }
  });

  const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data) => {

		const payload = {
			first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
			email: data.email,
			password: data.password,
		};

		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/signup`, payload, {
        withCredentials: true,
      })
			.then(({ data }) => {
        if (data?.errorMessage) {
          setRegistrationError(data.errorMessage);
          setTimeout(() => {
            setRegistrationError(null);
          }, 3000);
        }
        if (data?.user) {
          dispatch(signup(data));
          navigate('/');
        }
			})
			.catch(console.error());
	};


  return (
    <div className="container divider">
    <div className="form-wrapper">
    <h2>Зарегистрируйте свой аккаунт</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-input">
      <label htmlFor="first_name" className="card-input__label">Имя</label>
          <input {...register("first_name", {
                required: true
              })} type="text" name="first_name" id="first_name" className="card-input__input" />
        </div>
      <div className="card-input">
      <label htmlFor="last_name" className="card-input__label">Фамилия</label>
          <input {...register("last_name", {
                required: true
              })} type="text" name="last_name" id="last_name" className="card-input__input" />
        </div>
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
      <div className="card-input">
        <label htmlFor="phone" className="card-input__label">Телефон</label>
        <input {...register("phone", {
                required: true,
              })} name="phone" type="text" id="phone" className="card-input__input" />
        </div>
      <button className="btn">Зарегистрироваться</button>
      {registrationError && (<p className="error">{registrationError}</p>)}
    </form>
    {errors?.email && (
        <p className="error">{errors?.email.message || "Введите действительную почту"}</p>
      )}

      {errors?.password && (
        <p className="error">{errors?.password?.message || "Введите пароль"}</p>
      )}
    <p>Уже есть аккаунт?</p>
    <Link className="nav-item-link" to="/login">Войти</Link>
  </div>
  </div>
  );
}

export default Signup;
