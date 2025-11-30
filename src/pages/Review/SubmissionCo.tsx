import UseGetCountSub from "@/hook/posthook/UseGetCountSub"

const SubmissionCo = ({postid}:{postid:string}) => {
    const {isPending, getCountSub} = UseGetCountSub({postid}) as {
    isPending: boolean;
    getCountSub: {
      submissionCount: number;
    };
  };

  if (isPending) {
      return <div>Loading...</div>;
    }

    
  return (
    <div>{getCountSub?.submissionCount}</div>
  )
}

export default SubmissionCo