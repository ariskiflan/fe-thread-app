import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Base from "./pages/Base";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ProfilPage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import { useAppDispatch } from "./store";
import { getProfile } from "./libs/api/call/profile";
import { SET_LOGIN } from "./store/slice/auth";
import { useEffect } from "react";
import FollowPage from "./pages/FollowPage";

function App() {
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getProfile(token);
      dispatch(SET_LOGIN({ user: res.data.data, token }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const IsNotLogin = () => {
    if (!localStorage.token) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  };

  const IsLogin = () => {
    if (localStorage.token) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IsNotLogin />}>
            <Route path="/" Component={Base} />
            <Route path="/profilepage/:id" Component={ProfilPage} />
            <Route path="/detailPage/:id" Component={DetailPage} />
            <Route path="/search" Component={SearchPage} />
            <Route path="/follow" Component={FollowPage} />
          </Route>

          <Route path="/" element={<IsLogin />}>
            <Route path="/auth/register" Component={Register} />
            <Route path="/auth/login" Component={Login} />
            <Route path="/reset" Component={ResetPassword} />
            <Route path="/forgot" Component={ForgotPassword} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
