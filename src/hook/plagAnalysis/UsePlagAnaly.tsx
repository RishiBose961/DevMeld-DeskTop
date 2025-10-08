import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const UsePlagAnaly = (code: string, language: string) => {

    
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
    data: plagdata,
  } = useQuery({
    queryKey: ["plagdatae", code, language],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ code, language }),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plagiarism data");
        return res.json();
      });
    },
    enabled: isAuthenticated && !!code,
  });

   if (isError) {
    return <span>Error: {error.message}</span>;
  }


  return { isPending, plagdata };
};

export default UsePlagAnaly;
