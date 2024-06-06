import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Recommendation = () => {
  const axiosPublic = UseAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0">
      <h2 className="text-3xl font-bold text-center pt-10">
        People Recommend Us!
      </h2>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center border p-10 m-10 lg:m-24">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.rating}
                  readOnly
                />
                <p className="max-w-[500px] py-10">{review?.recommendation}</p>
                <h2>{review?.name}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommendation;
