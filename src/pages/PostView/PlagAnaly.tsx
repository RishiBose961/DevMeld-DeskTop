import AcceptReject from "@/components/AcceptReject/AcceptReject";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

interface PlagAnalyProps {
  plagdata: {
    
    topMatches: {
      
      userId: {
        fullName: string; username: string
      };
      id: string;
      percent: number;
      fullName: string;
      score: number;
      status: string;
    }[];
  } | null;
}

interface CircleProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

const CircleProgress = ({ value, size = 40, strokeWidth = 6 }: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={value === 100 ? "#f97316" : "#22c55e"}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />

    </svg>
  );
};

const PlagAnaly = ({ plagdata }: PlagAnalyProps) => {
  if (!plagdata || plagdata.topMatches.length === 0) {
    return <p>No matches found.</p>;
  }

  console.log(plagdata);
  

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-3">Top Matches</h2>
      <div className="grid gap-4">
        {plagdata.topMatches.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-start items-center bg-white shadow-md rounded-xl p-4"
          >
            <CircleProgress value={item.percent} />
            <div className="ml-4">
               <Badge variant="secondary" className="">{item.id}</Badge>
              <p className="mt-2 font-medium">{item.userId.username}</p>
              <p className="text-sm ">{item.userId.fullName}</p>
              <p className="text-sm font-bold">Similarity: {item.percent}%</p>
              <p className="text-sm font-bold">score :{item.score}</p>
              <p className="text-sm font-bold">status :{item.status}</p>
               
                <div>
                     <Link
                to={`/plagcheck/${item.id}`}
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 0);
                }}
              >
                Visit
              </Link>
                </div>
           
            </div>
            <AcceptReject id={item.id} status={item.status}/>
        
          </div>
        ))}

      </div>
    </div>
  );
};

export default PlagAnaly;
