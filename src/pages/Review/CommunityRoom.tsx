/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import UseRoomHook from "@/hook/RoomHook/UseRoomHook"
import { useMutation } from "@tanstack/react-query"
import { MessagesSquare } from "lucide-react"
import { useSelector } from "react-redux"

const CommunityRoom = ({ title, id }: { title: string; id: string }) => {
  const { user } = useSelector((state: any) => state.auth)

  const { isPending, roomdata } = UseRoomHook() as {
    isPending: boolean
    roomdata: any
  }


  // Check if user has already joined/created this room
  const alreadyJoined = Array.isArray(roomdata)
    ? roomdata.some((room: any) => room.topicBy === id)
    : roomdata?.topicBy === id

  const mutation = useMutation({
    mutationFn: async (postData: { roomname: string; topicBy: string }) => {
      const res = await fetch("http://localhost:5000/api/create/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(postData),
      })
      if (!res.ok) {
        throw new Error("Failed to create room.")
      }
      return res.json()
    },
    onSuccess: () => {
      alert("Room created successfully!")
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        alert((error as any).message || "Failed to create room.")
      } else {
        alert("Failed to create room.")
      }
    },
  })

  const handleSubmit = () => {
    mutation.mutate({
      roomname: title,
      topicBy: id,
    })
  }

  
  if (isPending) return <div>Loading...</div>

  return (
    <Button
      onClick={handleSubmit}
      disabled={mutation.isPending || alreadyJoined}
    >
      <MessagesSquare className="mr-2" />
      {mutation.isPending
        ? "Creating..."
        : alreadyJoined
        ? "Joined"
        : "Join Room"}
    </Button>
  )
}

export default CommunityRoom
