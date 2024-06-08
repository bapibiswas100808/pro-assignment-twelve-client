import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
const Reservation = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const axiosSecure = UseAxiosSecure();
  const { data: reservation = [], refetch } = useQuery({
    queryKey: ["reserve"],
    queryFn: async () => {
      if (searchEmail) {
        const res = await axiosSecure.get(
          `/special/bookedTest?email=${searchEmail}`
        );
        return res.data;
      } else {
        const res = await axiosSecure.get("/bookedTest");
        return res.data;
      }
    },
  });
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookedTest/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Appointment Cancelled",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const handleSearch = () => {
    refetch();
  };
  return (
    <div>
      <h3 className="text-3xl fnt-bold text-center py-5">Reservation</h3>
      <div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border-gray-300 border rounded-md px-3 py-1 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Booked By</th>
                <th>Report Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservation?.map((item, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{item?.title}</th>
                  <td>{item?.email}</td>
                  <td>
                    <button className="project-btn">
                      {item?.report_status}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(item?._id)}
                      className="btn text-white bg-red-500"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
