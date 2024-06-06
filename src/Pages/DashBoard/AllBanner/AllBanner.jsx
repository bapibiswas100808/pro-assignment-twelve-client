import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AllBanner = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: banners = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanner");
      return res.data;
    },
  });
  console.log(banners);
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
                  <td>{banner?.isActive}</td>
                  <td>
                    <button className="btn bg-red-500 text-white">
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
