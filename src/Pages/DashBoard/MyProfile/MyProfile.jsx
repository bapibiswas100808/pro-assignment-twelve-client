import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const { data: districts = [] } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const res = await axios.get("/district.json");
      return res.data;
    },
  });
  const { data: thanas = [] } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const res = await axios.get("/thana.json");
      return res.data;
    },
  });

  const { data: profileData, refetch } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });
  const handleUpdate = async (e) => {
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

    const updateInfo = { name, email, image, blood, district, upazilla };
    axiosPublic
      .put(`/users/${user.email}`, updateInfo)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Profile is Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className=" text-center flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold py-5">Hi! {profileData?.name}</h2>
        <img
          className="h-20 w-20 rounded-full"
          src={profileData?.image}
          alt=""
        />
      </div>
      <div>
        <form onSubmit={handleUpdate}>
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
                defaultValue={profileData?.name}
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
                readOnly
                name="email"
                defaultValue={profileData?.email}
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
                <span className="label-text">Your Blood Group</span>
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
                {districts?.map((dis, idx) => (
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
                {thanas?.map((thana, idx) => (
                  <option key={idx} value={thana.name}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {loading ? (
            <div className="text-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <button type="submit" className="project-btn w-full mt-5">
              Update Info
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
