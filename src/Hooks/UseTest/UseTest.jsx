import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const UseTest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: test = [], refetch } = useQuery({
    queryKey: ["test", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/special/bookedTest?email=${user?.email}`
      );
      return res.data;
    },
  });
  return [test, refetch];
};

export default UseTest;
