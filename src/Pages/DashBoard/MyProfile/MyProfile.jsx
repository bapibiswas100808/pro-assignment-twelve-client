import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import axios from "axios";

const MyProfile = () => {
  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/thana.json").then((res) => {
      setThanas(res.data);
      console.log(res.data);
    });
  }, []);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);

  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(profileData);

  return (
    <div>
      <div className=" text-center flex flex-col justify-center items-center ">
        <h2 className="text-3xl font-bold py-5">My profile</h2>
        <img
          className="h-20 w-20 rounded-full"
          src={profileData?.image}
          alt=""
        />
      </div>
      <div>
        <form>
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
          <button className="project-btn mt-4 w-full">Update Info</button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
