/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AcceptReject = ({ id, status }: { id: string; status: string }) => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();

  const updateSubmissionStatus = async (newStatus: string) => {
    const res = await fetch(`http://localhost:5000/api/submission/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error("Failed to update submission status");
    }

    return res.json();
  };

  const mutation = useMutation({
    mutationFn: updateSubmissionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plagdatae"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="ml-auto space-x-2">
      <Button
        onClick={() => mutation.mutate("Accepted")}
        disabled={mutation.isPending || status === "Accepted"}
        variant={status === "Accepted" ? "default" : "outline"}
      >
        {mutation.isPending && status !== "Accepted" ? "..." : "A"}
      </Button>
      <Button
        variant="destructive"
        onClick={() => mutation.mutate("Rejected")}
        disabled={mutation.isPending || status === "Rejected"}
      >
        {mutation.isPending && status !== "Rejected" ? "..." : "R"}
      </Button>
    </div>
  );
};

export default AcceptReject;
