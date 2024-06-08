import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { FaBook, FaUser } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";

const Stats = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: adminStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return (
    <div>
      <h3 className="text-3xl fnt-bold text-center py-5">Statistics</h3>
      <h2>Hi {user.displayName}!</h2>
      <div>
        <div className="stats shadow flex flex-col lg:flex-row gap-10">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUser className="text-3xl" />
            </div>

            <div className="stat-title">Total Users</div>
            <div className="stat-value">{adminStats?.users}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaBook className="text-3xl" />
            </div>
            <div className="stat-title">Total Tests</div>
            <div className="stat-value">{adminStats?.tests}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaBookAtlas className="text-3xl" />
            </div>
            <div className="stat-title">Booked Tests</div>
            <div className="stat-value">{adminStats?.bookedTests}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Delivered Tests</div>
            <div className="stat-value">{adminStats?.deliveredTests}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
