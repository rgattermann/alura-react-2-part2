import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (<nav>
    <div className="nav-wrapper indigo lighten-2">
      <Link to="/" className="brand-logo">Casa do código</Link>
      <ul className="right">
        <li><Link to="/authors">Autores</Link></li>
        <li><Link to="/books">Livros</Link></li>
        <li><Link to="/about">Sobre</Link></li>
      </ul>
    </div>
  </nav>);
}

export default Header;
