import "../styles/loader.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default Loader;
