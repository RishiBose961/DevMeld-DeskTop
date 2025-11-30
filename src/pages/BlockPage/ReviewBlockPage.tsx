import UseReviewBan from "@/hook/Blockhook/UseReviewBan";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const ReviewBlockPage = () => {
     const { user } = useSelector(
    (state: { auth: { isAuthenticated: boolean; user: { _id: string; token: string } } }) =>
      state.auth
  );
    const { isPending, reviewban } = UseReviewBan() as {
        isPending: boolean;
        reviewban: Array<{
            _id: string;
            blocker: string; // required for API
            blocked: { _id: string; fullName: string; emailAddress: string };
            reason: string;
        }>;
    };

    const queryClient = useQueryClient();

    const { mutate: unblockUser, isPending: isUnblockLoading } = useMutation({
        mutationFn: async ({ blocker, blocked }: { blocker: string; blocked: string }) => {
            return await axios.post("http://localhost:5000/api/unblock/user", {
                blocker,
                blocked,
            },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviewbans"] });
            alert("User unblocked successfully");
        },
    });

    if (isPending) return <div>Loading...</div>;

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent unblock requests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {reviewban?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.blocked.fullName}</TableCell>
                            <TableCell>{item.blocked.emailAddress}</TableCell>
                            <TableCell>{item.reason}</TableCell>

                            <TableCell>
                                <Button
                                    disabled={isUnblockLoading}
                                    onClick={() =>
                                        unblockUser({
                                            blocker: user._id,
                                            blocked: item.blocked._id,
                                        })
                                    }
                                >
                                    {isUnblockLoading ? "Unblocking..." : "Unblock"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ReviewBlockPage;
