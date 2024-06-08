import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UseAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const UseAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
