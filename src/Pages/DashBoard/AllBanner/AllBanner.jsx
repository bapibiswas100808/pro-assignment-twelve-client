import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AllBanner = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanner");
      return res.data;
    },
  });
  console.log(banners);
  const handleDeleteBanner = (id) => {
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
          .delete(`/allBanner/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Banner has been deleted.",
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
  const handleIsActive = (id) => {
    axiosSecure
      .patch(`/allBanner/status/${id}`)
      .then((res) => {
        refetch();
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Status has been Changed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h3 className="text-3xl fnt-bold text-center py-5">All Banner</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Banner</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, idx) => (
                <tr key={idx}>
                  <th>
                    <img className="h-20" src={banner?.image} alt="" />
                  </th>
                  <td>{banner?.bannerName}</td>
                  <td>{banner?.title}</td>
                  <td>{banner?.description}</td>
                  <td>
                    <button
                      onClick={() => handleIsActive(banner?._id)}
                      className="project-btn"
                    >
                      {banner?.isActive}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteBanner(banner._id)}
                      className="btn bg-red-500 text-white"
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

export default AllBanner;
