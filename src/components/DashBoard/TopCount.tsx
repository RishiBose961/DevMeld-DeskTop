/* eslint-disable @typescript-eslint/no-unused-vars */
import UsePostCount from "@/hook/posthook/UsePostCount";
import { ChartToInfo } from "./ChartToInfo";

const TopCount = () => {
  const { isPending, getCount } = UsePostCount() as {
    isPending: boolean;
    getCount: {
      count: number;
      submissionCount: number;
    };
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        <div className="bg-muted rounded-2xl h-64"></div>
        <div className="bg-muted rounded-2xl h-28"></div>
        <div className="bg-muted rounded-2xl h-28"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Chart Section */}
      <div className="col-span-2">
        <ChartToInfo getCount={getCount} />
      </div>
<div className="space-y-2">
 {/* Total Problems */}
      <div className="bg-primary/70 rounded-2xl shadow-md p-6 flex flex-col justify-center 
      text-center">
        <p className="text-base font-medium tracking-wide">Total Problems</p>
        <p className="text-4xl font-bold mt-2">{getCount?.count ?? 0}</p>
        <p className="text-xs opacity-70 mt-1">Overall problems created</p>
      </div>

      {/* Total Submissions */}
      <div className="bg-primary/70 rounded-2xl shadow-md p-6 flex flex-col 
      justify-center text-center">
        <p className="text-base font-medium tracking-wide">Total Submissions</p>
        <p className="text-4xl font-bold mt-2">
          {getCount?.submissionCount ?? 0}
        </p>
        <p className="text-xs opacity-70 mt-1">Across all users</p>
      </div>
</div>
     
    </div>
  );
};

export default TopCount;
