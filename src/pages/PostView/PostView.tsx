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
import { CreateBlockPage } from "../BlockPage/CreateBlockPage";
import UseBlockHook from "@/hook/Blockhook/UseBlockHook";
const PostView = () => {
  const { id } = useParams();

  const { isPending, getAllpostbyid } = UsePostByIdAll({
    reviewid: id as string,
  }) as {
    isPending: boolean;
    getAllpostbyid: Array<{
      language: string;
      userId: { fullName: string; username: string ,_id: string};
      _id: string;
      createdAt: string;
    }>;
  };

  

  const {isPending: blockPending, blockdata} = UseBlockHook() as {
    isPending: boolean;
    blockdata: Array<{
      blocked: { _id: string; name: string; email: string };
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
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAllpostbyid?.map(
            (
              post: {
                language: string;
                userId: { fullName: string; username: string, _id: string };
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
                <TableCell className="flex justify-center gap-2">
                  <Link to={`/plagcheck/${post._id}`}>
                    <Button className="cursor-pointer">
                      <ChartAreaIcon />
                    </Button>
                  </Link>
                  {
                    blockPending ? <span>Loading...</span> :
                    blockdata?.some((block) => block.blocked._id === post.userId._id)
                    ? <span className="text-red-500 font-bold flex">Blocked</span>
                    :<CreateBlockPage joinid={post.userId._id}/>
                  }
                  
                  
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
