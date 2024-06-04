import { useLoaderData } from "react-router-dom";

const TestDetails = () => {
  const testDetails = useLoaderData();
  console.log(testDetails);
  return (
    <div className="max-w-[1170px] mx-auto">
      <h2 className="text-3xl font-bold text-center py-10">Test Details</h2>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={testDetails?.image}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-2xl font-bold">{testDetails?.title}</h1>
              <p className="py-6">{testDetails?.short_description}</p>
              <button className="project-btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
