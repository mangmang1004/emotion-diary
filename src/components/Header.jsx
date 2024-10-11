import './Header.css';
import Button from "./Button";


function Header({ title, leftChild, rightChild }) {
  return (
    <div className="Header">
      <div className="header-left">
        {leftChild}
      </div>
      <div className="header-center">{title}</div>
      <div className="header-right">
        {rightChild}
      </div>
    </div>
  );
}

export default Header;
