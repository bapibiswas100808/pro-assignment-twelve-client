import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
// import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
// import html2canvas from "html2canvas";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Approved as Admin",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //   const handleDownloadPdf = async (user) => {
  //     const pdf = new jsPDF();
  //   };

  return (
    <div>
      <h3 className="text-3xl fnt-bold text-center py-5">All Users</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>email</th>
                <th>Blood group</th>
                <th>Role</th>
                <th>Status</th>
                <th>Show Details</th>
                <th>Download User Info</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>
                    <img
                      className="h-20 w-20 rounded-full"
                      src={user?.image}
                      alt=""
                    />
                  </th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.blood}</td>
                  <td className="cursor-pointer">
                    <button
                      className="btn border-1"
                      onClick={() => handleAdmin(user)}
                    >
                      {user?.role}
                    </button>
                  </td>
                  <td>{user?.status}</td>
                  <td>
                    <button className="btn bg-blue text-white">
                      See Details
                    </button>
                  </td>
                  <td>
                    <button
                      //   onClick={() => handleDownloadPdf(user)}
                      className="project-btn"
                    >
                      Download
                    </button>
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

export default AllUsers;
