import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import jsPDF from "jspdf";

const MyResults = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: verifiedTest = [] } = useQuery({
    queryKey: ["verifyTest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/special/verified?email=${user?.email}`
      );
      return res.data;
    },
  });
  const generatePDF = (test, userData, message) => {
    const doc = new jsPDF();

    doc.text(`Title: ${test.title}`, 10, 10);
    doc.text(`Price: ${test.price}`, 10, 20);
    doc.text(`Description: ${test.short_description}`, 10, 30);

    doc.text(`User: ${userData.email}`, 10, 50);
    doc.text(`Message: ${message}`, 10, 60);

    doc.save("test_result.pdf");
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-center py-10">My results</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {verifiedTest?.map((test, idx) => (
                <tr key={idx} className="bg-base-200">
                  <th>{test?.title}</th>
                  <td>{test?.price}</td>
                  <td>{test?.short_description}</td>
                  <td>
                    <button
                      onClick={() =>
                        generatePDF(test, user, "Your test is delivered")
                      }
                      className="project-btn"
                    >
                      Download Result
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

export default MyResults;
