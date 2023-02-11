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
import {createTheme, ThemeProvider} from "@mui/material";
import {CreateUrlPage} from "./pages/CreateUrlPage";
import {EditUrlPage} from "./pages/EditUrlCardPage";
import {ActivateOrChange} from "./pages/ActivateOrChange/ActivateOrChange";
import {Designation} from "./components/Designation";
import {PrivacyPage} from "./pages/PrivacyPage";


function App() {
    const dispatch = useDispatch();

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

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
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                  <Route path="/" element={<StartPage/>}/>
                  <Route path="/site" element={<SitesPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="profile" element={<ProfilePage/>}/>
                  <Route path="activate" element={<ActivateOrChange activate={true}/>}/>
                  <Route path="create-url" element={<CreateUrlPage/>}/>
                  <Route path="edit-url/:urlId" element={<EditUrlPage/>}/>
                  <Route path="reset-password/:code" element={<ActivateOrChange/>}/>
                  <Route path="profile/password" element={<Designation title={"Смена пароля"} text={
                      <>Отправьте боту команду <code>/reset-password</code> и перейдите по ссылке, которую он вам отправил</>}/>}/>
                  <Route path="*" element={<Designation title={"404. Не найдено"} text={
                      <>Страница не найдена</>
                  }/>}/>
                  <Route path="/privacy" element={<PrivacyPage/>}/>
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      );
}

export default App;
