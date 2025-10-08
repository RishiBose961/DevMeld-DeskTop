import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseGetAllPostbyid = () => {
  const { user, isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string };
      };
    }) => state.auth
  );
  const {
    isPending,
    error,
    isError,
    data: getAllpostbyid,
  } = useQuery({
    queryKey: ["getAllpostbyide"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((res) => res.json());
    },
    enabled: isAuthenticated,
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, getAllpostbyid };
};

export default UseGetAllPostbyid;
