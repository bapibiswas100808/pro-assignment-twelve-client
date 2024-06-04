import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/dashBoard";
  const { signInUser } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (password.length < 6) {
      toast.error("Password Should be at least 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password Must Have an UpperCase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password Must Have an LowerCase letter");
      return;
    }
    signInUser(email, password)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <div className="hero min-h-screen max-w-[1170px] mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login now!</h1>
            <p className="py-6">
              Logging in to Med Diagnostic provides access to a comprehensive
              suite of medical diagnostic tools and patient data management.
              With secure credentials, healthcare professionals can view test
              results, track patient histories, and manage appointments,
              enhancing efficiency and accuracy in patient care. Simplified
              access ensures timely, reliable medical support.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <span
                    className="cursor-pointer relative top-10 right-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="project-btn">
                  Login
                </button>
              </div>
            </form>
            <div className="pl-10 pb-10">
              <p>Not Registered Yet?</p>
              <p>
                Please
                <Link
                  className="underline text-blue-500 cursor-pointer"
                  to="/register"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
