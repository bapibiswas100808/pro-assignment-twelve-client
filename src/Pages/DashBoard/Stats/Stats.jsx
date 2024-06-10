import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { FaBook, FaUser } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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
  const { data: bookedStats } = useQuery({
    queryKey: ["booked-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked-stats");
      return res.data;
    },
  });
  // bar chart
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  // pie chart
  const data = [
    { name: "Booked Test", value: adminStats?.bookedTests },
    { name: "Delivered Test", value: adminStats?.deliveredTests },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const chartWidth = isMobile ? 300 : 500;
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
      <div className="flex flex-col lg:flex-row mt-10">
        <div>
          <BarChart
            width={chartWidth}
            height={300}
            data={bookedStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis dataKey="price" />
            <Bar
              dataKey="price"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {bookedStats?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-full">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Stats;
