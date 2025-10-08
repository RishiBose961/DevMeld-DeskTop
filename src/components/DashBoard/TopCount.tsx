/* eslint-disable @typescript-eslint/no-unused-vars */

const TopCount = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map((_) => (
        <div className="bg-primary/70 rounded-xl p-6 text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className=" text-sm">Total Problems</p>
              <p className="text-3xl font-bold">dsadsadas</p>
            </div>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default TopCount;
