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
import UsePostByIdAll from "@/hook/posthook/UsePostByIdAll";
import { ChartAreaIcon } from "lucide-react";
import { Link, useParams } from "react-router";
const PostView = () => {
  const { id } = useParams();

  const { isPending, getAllpostbyid } = UsePostByIdAll({
    reviewid: id as string,
  }) as {
    isPending: boolean;
    getAllpostbyid: Array<{
      language: string;
      userId: { fullName: string; username: string };
      _id: string;
      createdAt: string;
    }>;
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Analysis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAllpostbyid?.map(
            (
              post: {
                language: string;
                userId: { fullName: string; username: string };
                _id: string;
                createdAt: string;
              },
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.language}</TableCell>
                <TableCell>{post.userId.fullName}</TableCell>
                <TableCell>{post.userId.username}</TableCell>
                <TableCell>{post.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Link to={`/plagcheck/${post._id}`}>
                    <Button className="cursor-pointer">
                      <ChartAreaIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostView;
