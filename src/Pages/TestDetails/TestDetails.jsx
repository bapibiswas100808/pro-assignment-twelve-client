import { useLoaderData } from "react-router-dom";

const TestDetails = () => {
  const testDetails = useLoaderData();
  console.log(testDetails);
  return (
    <div className="max-w-[1170px] mx-auto">
      <h2 className="text-3xl font-bold text-center py-10">Test Details</h2>
      <div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row gap-10 mb-10">
            <img
              src={testDetails?.image}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div className="">
              <h1 className="text-2xl font-bold mb-8">{testDetails?.title}</h1>
              <div className="flex gap-5">
                <p>
                  <span className="text-lg font-semibold">
                    Available Slots:
                  </span>
                  {testDetails.slots}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> $
                  {testDetails?.price}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>
                  {testDetails?.date}
                </p>
              </div>
              <p className="py-6">{testDetails?.short_description}</p>
              {testDetails.slots > 0 ? (
                <button className="project-btn">Book Now</button>
              ) : (
                "No slots Available"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
