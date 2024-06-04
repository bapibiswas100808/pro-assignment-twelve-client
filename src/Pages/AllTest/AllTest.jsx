import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const AllTest = () => {
  const axiosPublic = UseAxiosPublic();
  const [selectedDate, setSelectedDate] = useState();
  const { data: allTests = [] } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allTest");
      return res.data;
    },
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const filteredTest = allTests.filter((test) => {
    const testDate = new Date(test.date);
    testDate.setHours(0, 0, 0, 0);
    return (
      testDate >= today &&
      (!selectedDate || testDate.toDateString() === selectedDate.toDateString())
    );
  });
  return (
    <div className="max-w-[1170px] mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center py-10">See All Test</h2>
      <div className="mb-5 text-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="input input-bordered"
          placeholderText="Select a date"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {filteredTest?.map((test, idx) => (
          <div key={idx}>
            <div className="card min-h-[550px] bg-base-100 shadow-xl">
              <figure>
                <img src={test?.image} className="min-h-[250px]" alt="Shoes" />
              </figure>
              <div className="ml-8 py-2 ">
                <span className="font-semibold">Date:</span> {test?.date}
              </div>
              <div className="card-body">
                <h2 className="card-title">{test.title}</h2>
                <p>{test?.short_description}</p>
                <div className="card-actions justify-end">
                  <p>
                    <span className="font-semibold">Price:</span> ${test?.price}
                  </p>
                  <Link
                    to={`/testDetails/${test?._id}`}
                    className="project-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTest;
