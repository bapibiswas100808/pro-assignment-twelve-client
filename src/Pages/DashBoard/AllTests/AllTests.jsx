import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllTests = () => {
  const axiosSecure = UseAxiosSecure();
  // get data
  const { data: allTests = [], refetch } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allTest`);
      return res.data;
    },
  });

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
      </div>
    </div>
  );
};

export default AllTests;
