import {Layout} from "./components/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StartPage} from "./pages/StartPage";
import './App.css';
import {SitesPage} from "./pages/SitesPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ProfilePage} from "./pages/ProfilePage";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkAuth} from "./store/auth/actions";
import {authSlice} from "./store/auth";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(authSlice.actions.setLoading)
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
        else {
            dispatch(authSlice.actions.removeLoading())
        }
    })

    return (
          <BrowserRouter>
            <Layout>
              <Routes>
                  <Route path="/" element={<StartPage/>}/>
                  <Route path="/site" element={<SitesPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="profile" element={<ProfilePage/>}/>
              </Routes>
            </Layout>
          </BrowserRouter>
      );
}

export default App;
