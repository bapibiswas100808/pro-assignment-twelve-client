import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const MyResults = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: verifiedTest = [] } = useQuery({
    queryKey: ["verifyTest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/special/verified?email=${user?.email}`
      );
      return res.data;
    },
  });
  console.log(verifiedTest);
  return (
    <div>
      <h3 className="text-3xl font-bold text-center py-10">My results</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {verifiedTest?.map((test, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{test?.title}</th>
                  <td>{test?.price}</td>
                  <td>{test?.short_description}</td>
                  <td>
                    <button className="project-btn"> Download Result</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
