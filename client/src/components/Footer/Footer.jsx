import './Footer.css'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav className="footer-container">
        <div className="container">
          <div className="nav-wrapper">
            <div className="nav-logo-wrapper">
              <Link to="/" className="nav-logo white">Flow</Link>
            </div>
            <div>
              <p>Контакты:</p>
              <p>Санкт-Петербург,</p>
              <p>ул. Ефимова, 2</p>
              <p>+7 (812) 123-45-67</p>
            </div>
            <ul className="nav-list">
          <li className="nav-item"><Link className="nav-item-link white" to="/about">О магазине</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Footer;
