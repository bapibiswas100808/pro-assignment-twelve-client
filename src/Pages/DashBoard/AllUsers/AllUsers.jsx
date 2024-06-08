import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [details, setDetails] = useState({});
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
  const handleStatus = (user) => {
    if (user.role !== "admin") {
      axiosSecure.patch(`/users/status/${user._id}`).then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status changed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot change the status of an admin!",
      });
    }
  };

  const handleSeeDetails = (user) => {
    setDetails(user);
    document.getElementById("my_modal_1").showModal();
  };

  const handleDownloadPdf = async (user) => {
    const tests = await axiosSecure.get(`/bookedTest/${user?.email}`);
    console.log(tests);
    const doc = new jsPDF();
    doc.text("User Details", 10, 10);
    doc.text(`Name: ${user.name}`, 10, 20);
    doc.text(`Email: ${user.email}`, 10, 30);
    doc.text(`Blood Group: ${user.blood}`, 10, 40);
    doc.text(`Role: ${user.role}`, 10, 50);
    doc.text(`Status: ${user.status}`, 10, 60);

    let y = 70;
    tests.data.forEach((test, index) => {
      doc.text(`Test ${index + 1}:`, 10, y);
      doc.text(`- Test Name: ${test.title}`, 20, y + 10);
      doc.text(`- Test Date: ${test.date}`, 20, y + 20);
      doc.text(`- Delivery Status: ${test.report_status}`, 20, y + 30);
      y += 40;
    });

    doc.save(`${user.name}_details.pdf`);
  };
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
                      className="h-20 rounded-full"
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
                  <td className="cursor-pointer">
                    <button
                      className="btn border-1"
                      onClick={() => handleStatus(user)}
                    >
                      {user?.status}
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleSeeDetails(user)}
                      className="btn bg-blue text-white"
                    >
                      See Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDownloadPdf(user)}
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <img
            className="h-20 w-20 rounded-full mb-4"
            src={details?.image}
            alt=""
          />
          <h3 className="font-bold text-lg">{details?.name}</h3>
          <p className="py-4">
            <span className="font-bold">Email:</span>
            {details?.email}
          </p>
          <p className="py-4">
            <span className="font-bold">Blood Group:</span>
            {details?.blood}
          </p>
          <p className="py-4">
            <span className="font-bold">Role:</span>
            {details?.role}
          </p>
          <p className="py-4">
            <span className="font-bold">Status:</span>
            {details?.status}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllUsers;
