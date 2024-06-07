import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

const Blogs = () => {
  const axiosPublic = UseAxiosPublic();
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });
  console.log(blogs);
  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0">
      <h2 className="text-3xl font-bold text-center py-10">Our Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {blogs?.map((blog, idx) => (
          <div key={idx}>
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={blog?.image}
                  alt="Shoes"
                  className="rounded-xl h-52 lg:h-[300px]"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{blog?.title}</h2>
                <p>{blog?.blog}</p>
                <div className="card-actions">
                  <p className="font-bold text-lg">{blog?.writer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
