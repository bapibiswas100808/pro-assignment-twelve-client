import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";

const FeaturedTest = () => {
  const axiosPublic = UseAxiosPublic();
  const { data: featuredTest = [] } = useQuery({
    queryKey: ["featuredTest"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookedTest");
      return res.data;
    },
  });

  return (
    <div className="max-w-[1170px] mx-auto my-10 px-3 lg:px-0">
      <h2 className="text-3xl font-bold text-center py-10">Featured test</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredTest.slice(0, 6).map((test, idx) => (
          <div className="" key={idx}>
            <div className="card bg-base-100 shadow-xl min-h-[475px]">
              <figure>
                <img className="h-[250px]" src={test?.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{test?.title}</h2>
                <p>{test?.short_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTest;
