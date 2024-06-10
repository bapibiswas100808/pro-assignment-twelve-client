import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = UseAxiosPublic();
  const { data: banners = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanner");
      return res.data;
    },
  });
  const activeBanner = banners.find((banner) => banner.isActive === "true");

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${activeBanner?.image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content bg-[#003479] opacity-50 rounded-xl px-5 py-10">
          <div className="max-w-lg">
            <h1 className="mb-5 text-3xl font-bold">{activeBanner?.title}</h1>
            <p className="mb-5">{activeBanner?.description}</p>
            <p className="mb-5">
              <span className="text-lg font-bold mr-2">Use Coupon Code:</span>
              <span className="text-red-400 text-2xl">
                {activeBanner?.couponCode}
              </span>
            </p>
            <p className="mb-5">
              <span className="text-lg font-bold mr-2">Get Discount:</span>
              {activeBanner?.couponRate}%
            </p>
            <Link to="/allTest" className="btn project-btn">
              All Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
