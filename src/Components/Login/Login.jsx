import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.email.value;
    const email = form.password.value;
    console.log(name, email);
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
                </label>
                <input
                  type="password"
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
                Please{" "}
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
