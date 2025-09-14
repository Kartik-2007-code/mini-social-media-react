const LoadingSpinner = () => {
  return (
    <center
      className="spinner-border text-secondary Loading-Spinner-size"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </center>
  );
};

export default LoadingSpinner;
