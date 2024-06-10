import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllTests = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // get data
  const { data: allTests = [], refetch } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allTest`);
      return res.data;
    },
  });
  const { data: reservation = [], refetch: resRefetch } = useQuery({
    queryKey: ["reservation", selectedTestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/res/bookedTest/${selectedTestId}`);
      return res.data;
    },
    enabled: !!selectedTestId,
  });

  // reservation
  const handleReservation = (id) => {
    setSelectedTestId(id);
    resRefetch();
    setShowModal(true);
  };

  // delete
  const handleDelete = (test) => {
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
          .delete(`/allTest/${test?._id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Test has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-10">All Test List</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Reservation</th>
                <th>Details</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allTests.map((test, idx) => (
                <tr key={idx}>
                  <th>{test?.title}</th>
                  <th>
                    <button
                      onClick={() => handleReservation(test?._id)}
                      className="project-btn"
                    >
                      See all Reservation
                    </button>
                  </th>
                  <td>{test?.short_description}</td>
                  <td>{test?.price}</td>
                  <td>
                    <Link
                      to={`/dashBoard/update/${test?._id}`}
                      className="project-btn"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(test)}
                      className="btn bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute"></div>
            <div className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-lg font-bold mb-4">Reservations</h3>
              <ol className="px-5" style={{ listStyleType: "decimal" }}>
                {reservation.length === 0 ? (
                  <p>No reservations</p>
                ) : (
                  <ol style={{ listStyleType: "decimal" }}>
                    {reservation.map((res, idx) => (
                      <li key={idx}>
                        <p>Email: {res?.email}</p>
                        <p>Status: {res?.report_status}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </ol>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTests;
