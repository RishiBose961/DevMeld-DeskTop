import TopCount from "@/components/DashBoard/TopCount";
import NotificationDash from "@/components/Notification/NotificationDash";
import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DashBoard = () => {
  const { isAuthenticated, user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean,
        user: { fullName: string } | null,
      };
    }) => state.auth
  );

  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logoutUserAction());
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xl font-bold text-gray-900">Dashboard</p>
          <p>{user?.fullName}</p>

        </div>
        {
          isAuthenticated ? <Button variant="destructive" className="mt-2" onClick={handleLogout}>Logout</Button> : <div className="mt-2 text-gray-600">Please login to access more features.</div>
        }

      </div>

      <TopCount />
      <p className="text-xl font-bold text-gray-900 mt-4">Recent Activity</p>
      <NotificationDash />
    </div>
  );
};

export default DashBoard;
