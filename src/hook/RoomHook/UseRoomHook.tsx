import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UseRoomHook = () => {

    
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
    data: roomdata,
  } = useQuery({
    queryKey: ["roomdata"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/rooms`, {
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
    enabled: isAuthenticated
  });

   if (isError) {
    return <span>Error: {error.message}</span>;
  }


  return { isPending, roomdata };
};

export default UseRoomHook;
