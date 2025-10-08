import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UseGetAllPostbyid from "@/hook/posthook/UseGetAllPostbyid";
import { Eye } from "lucide-react";
import { Link } from "react-router";
import CommunityRoom from "./CommunityRoom";
const ReviewPage = () => {
  const { isPending, getAllpostbyid } = UseGetAllPostbyid() as {
    isPending: boolean;
    getAllpostbyid: Array<{
      title: string;
      duaration: string;
      credits: number;
      noofparticipants: number;
      postedBy: string;
      createdAt: string;
      updatedAt: string;
      _id: string;
    }>;
  };

  if (isPending) return <div>Loading...</div>;


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Duaration</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>No of participants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(getAllpostbyid) && getAllpostbyid?.map(
            (
              post: {
                title: string;
                duaration: string;
                credits: number;
                noofparticipants: number;
                postedBy: string;
                createdAt: string;
                updatedAt: string;
                _id: string;
              },
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  {" "}
                  {new Date(post.duaration).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{post.credits}</TableCell>
                <TableCell>0/{post.noofparticipants}</TableCell>
                <TableCell className=" space-x-3">
                  <Link to={`/post/${post._id}`}>
                    <Button className="cursor-pointer">
                      <Eye />
                    </Button>
                  </Link>
                  <CommunityRoom title={post.title} id={post._id}/>
                 
                </TableCell>
              
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewPage;
