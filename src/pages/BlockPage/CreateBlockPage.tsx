/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlertIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

interface AuthUser {
  _id: string;
  token?: string;
  companyName?: string;
}

export function CreateBlockPage({ joinid }: { joinid?: string }) {
  const { user } = useSelector(
    (state: { auth: { isAuthenticated: boolean; user: AuthUser | null } }) =>
      state.auth
  );

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");


  const blockMutation = useMutation({
    mutationFn: async (payload: any) =>
      await axios.post("http://localhost:5000/api/create/block", payload, {
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : "",
        },
      }),
    onSuccess: () => {
      setReason(""); // reset input
      setOpen(false);
    },
    onError: (error: any) => {
      console.error("Block error:", error?.response?.data || error.message);
    },
  });

  const handleSubmit = () => {
    if (!user?._id) return console.error("User ID missing");
    if (!joinid) return console.error("Blocked user ID missing");

    const data = {
      blocker: user._id,
      blocked: joinid,
      reason,
      blockcompany: user.companyName || "",
    };

    blockMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <TriangleAlertIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Block Developer</DialogTitle>
          <DialogDescription>
            Add a reason before blocking this developer.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={blockMutation.isPending}>
            {blockMutation.isPending ? "Saving..." : "Block"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
