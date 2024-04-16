import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "5em",
          height: "5em",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
