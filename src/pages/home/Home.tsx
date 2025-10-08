import { useSelector } from "react-redux";
import Login from "../auth/Login";
import DashBoard from "./DashBoard";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
      };
    }) => state.auth
  );
  return <div>{isAuthenticated ? <DashBoard /> : <Login />}</div>;
};

export default Home;
