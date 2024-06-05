import Swal from "sweetalert2";
import UseTest from "../../../Hooks/UseTest/UseTest";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const MyAppointments = () => {
  const [test, refetch] = UseTest();
  const axiosSecure = useAxiosSecure();
  const handleDelete = (id) => {
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
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
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
      <h2 className="text-3xl font-bold text-center">Upcoming appointments</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Appointment Date</th>
                <th>Test Name</th>
                <th>Test Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {test.map((t, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{t.date}</th>
                  <td>{t.title}</td>
                  <td>{t.short_description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn bg-red-500 text-white"
                    >
                      Cancel Appointment
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

export default MyAppointments;
