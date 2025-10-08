import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

interface UseGetSingleProps {
  id: string;
}

const UseGetSingle = ({ id }: UseGetSingleProps) => {
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
    data: getsingledata,
  } = useQuery({
    queryKey: ["getsingledatas", id],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/submission/id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((res) => res.json());
    },
    enabled: isAuthenticated,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, getsingledata };
};

export default UseGetSingle;
