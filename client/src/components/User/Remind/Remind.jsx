import { useState, memo } from 'react';
import { Link } from 'react-router-dom';

function Remind() {
  const [error, setError] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    setError('В настоящий момент функионал недоступен');
  }
  return (
    <div className="container divider">
      <div className="form-wrapper">
      <h2>Воcстановить пароль</h2>
      <p>Введите свой email для восстановления пароля</p>
      <form onSubmit={handleSubmit}>
        <div className="card-input">
          <label htmlFor="remindPassword" className="card-input__label">Email</label>
          <input type="email" id="remindPassword" className="card-input__input" autoComplete="off" />
        </div>
        <button className="btn">Войти</button>
        {error && (<p className="error">{error}</p>)}
      </form>
      <div className="flex-wrapper">
      <p><Link className="nav-item-link" to="/signup">Регистрация</Link></p>
      <p><Link className="nav-item-link" to="/login">Войти</Link></p>
      </div>
    </div>
    </div>
  );
}

export default memo(Remind);
