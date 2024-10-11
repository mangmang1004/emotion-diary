import "./Button.css";

//Button이 props에 따라서 다르게 설정될 수 있도록 코드 작성

function Button({ text, type, onClick }) {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
