import { Link } from "react-router-dom";
import errImage from "../../assets/err.jpg";

const ErrorElement = () => {
  return (
    <div className="max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-center items-center min-h-screen gap-10">
      <div>
        <img src={errImage} alt="" />
      </div>
      <div>
        <h2 className="text-4xl font-bold mb-5 text-center">Oopps!</h2>
        <h2 className="text-3xl font-bold mb-5">Something Went Wrong!</h2>
        <p className="text-center">
          Please Go Back to
          <Link className="text-blue-500 underline pl-2 " to="/">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorElement;
