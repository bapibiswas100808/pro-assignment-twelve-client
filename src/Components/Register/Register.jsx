import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashBoard";
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  useEffect(() => {
    axios.get("district.json").then((res) => {
      setDistricts(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("thana.json").then((res) => {
      setThanas(res.data);
    });
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const imageFile = form.image.files[0];
    const uploadImage = { image: imageFile };
    const res = await axios.post(image_hosting_api, uploadImage, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const name = form.name.value;
    const email = form.email.value;
    const image = res.data.data.display_url;
    const blood = form.blood.value;
    const district = form.district.value;
    const upazilla = form.upazilla.value;
    const password = form.password.value;
    const cfPassword = form.cfPassword.value;
    const status = "active";
    if (password.length < 6) {
      toast.error("Password Should be at least 6 character");
      setLoading(false);
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password Must Have an UpperCase letter");
      setLoading(false);
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password Must Have an LowerCase letter");
      setLoading(false);
      return;
    }
    if (password !== cfPassword) {
      setError("Passwords did not match! Please try again.");
      setLoading(false);
      return;
    }
    setError("");
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUserProfile(name, image)
          .then((res) => {
            console.log(res);
            const userInfo = {
              name,
              email,
              image,
              blood,
              district,
              upazilla,
              status,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                navigate(from, { replace: true });
                setLoading(false);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Registered Successfully!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-[1170px] mx-auto">
      <h2 className="text-3xl font-bold text-center py-10">Register Here!</h2>
      <div className="pb-10">
        <form onSubmit={handleRegister}>
          {/* name and email */}
          <div className="flex flex-col lg:flex-row w-full gap-10">
            {/* name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Your Name</span>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </label>
            {/* email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Your Email</span>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          {/* Choose Image and blood group */}
          <div className="flex flex-col lg:flex-row w-full gap-10">
            {/* choose image */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Your Image</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                name="image"
              />
            </label>
            {/* blood group */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Choose Your Blood Group</span>
              </div>
              <select
                defaultValue="default"
                name="blood"
                className="select select-bordered"
              >
                <option disabled value="default">
                  Choose One
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>
          </div>
          {/* select district and thana */}
          <div className="flex flex-col lg:flex-row w-full gap-10">
            {/* select district */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Choose Your District</span>
              </div>
              <select
                defaultValue="default"
                name="district"
                className="select select-bordered"
              >
                <option disabled value="default">
                  Choose One
                </option>
                {districts.map((dis, idx) => (
                  <option key={idx} value={dis.name}>
                    {dis.name}
                  </option>
                ))}
              </select>
            </label>
            {/* select thana */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Choose Your Upazilla</span>
              </div>
              <select
                defaultValue="default"
                name="upazilla"
                className="select select-bordered"
              >
                <option disabled value="default">
                  Choose One
                </option>
                {thanas.map((thana, idx) => (
                  <option key={idx} value={thana.name}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* password and confirm password */}
          <div className="flex flex-col lg:flex-row w-full gap-10">
            {/* password */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Your Password</span>
                <span
                  className="cursor-pointer relative top-10 right-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
            </label>
            {/* confirm password */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirm Password</span>
                <span
                  className="cursor-pointer relative top-10 right-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="cfPassword"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          {error && (
            <div className="text-red-500 text-center my-4">{error}</div>
          )}
          {loading ? (
            <div className="text-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <button type="submit" className="project-btn w-full mt-5">
              Register
            </button>
          )}
        </form>
        <div className="pl-5 py-10">
          <p>Already Registered?</p>
          <p>
            Please
            <Link to="/login" className="underline text-blue-500">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
