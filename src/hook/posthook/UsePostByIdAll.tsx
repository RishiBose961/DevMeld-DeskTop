import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

interface UsePostByIdAllProps {
  reviewid: string;
}

const UsePostByIdAll = ({ reviewid }: UsePostByIdAllProps) => {
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
    queryKey: ["getAllpostbyide", reviewid],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/submission/${reviewid}`, {
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

export default UsePostByIdAll;
