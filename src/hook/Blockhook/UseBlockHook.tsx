import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseBlockHook = () => {

    
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
    data: blockdata,
  } = useQuery({
    queryKey: ["blockdatae",user?._id],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/check/block/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plagiarism data");
        return res.json();
      });
    },
    enabled: isAuthenticated && !!user?._id,
  });

   if (isError) {
    return <span>Error: {error.message}</span>;
  }


  return { isPending, blockdata };
};

export default UseBlockHook;
