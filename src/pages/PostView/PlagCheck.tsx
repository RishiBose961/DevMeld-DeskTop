import UseGetSingle from "@/hook/posthook/UseGetSingle";
import { useLocation } from "react-router";
import Editor from "@monaco-editor/react";
import PlagAnaly from "./PlagAnaly";
import UsePlagAnaly from "@/hook/plagAnalysis/UsePlagAnaly";
import { Badge } from "@/components/ui/badge";

const PlagCheck = () => {
  const location = useLocation();

  const loc = location.pathname.split("/")[2];

  const { isPending, getsingledata } = UseGetSingle({ id: loc }) as {
    isPending: boolean;
    getsingledata: {
      _id: string;

      code: string;
      language: string;
      userId: { fullName: string; username: string };
    };
  };
  const { isPending: plagPending, plagdata } = UsePlagAnaly(
    getsingledata?.code,
    getsingledata?.language
  ) as {
    isPending: boolean;
    plagdata: {
      topMatches: {
        id: string;
        userId: { fullName: string; username: string };
        percent: number;
        fullName: string;
        score: number;
        status: string;
      }[];
    } | null;
  };


  if (isPending) return <div>Loading...</div>;

  if (plagPending) return <div>Analyzing...</div>;

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <div className="col-span-2">
        <Badge className="mb-2 text-sm">{getsingledata._id}</Badge>
        <Editor
          height="70vh"
          defaultLanguage={getsingledata?.language}
          theme="vs-dark"
          defaultValue={getsingledata?.code}
        />
        <p>
          
          Language :{" "}
          <span className=" font-black uppercase">
            {getsingledata?.language}
          </span>
        </p>
        <p>{getsingledata?.userId?.fullName}</p>
        <p>{getsingledata?.userId?.username}</p>
      </div>
      <div>
        <h1 className=" text-2xl font-bold">Plagiarism Check</h1>
        <PlagAnaly plagdata={plagdata} />
      </div>
    </div>
  );
};

export default PlagCheck;
