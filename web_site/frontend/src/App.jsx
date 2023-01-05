import {Layout} from "./components/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {StartPage} from "./pages/StartPage";
import './App.css';
import {SitesPage} from "./pages/SitesPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ProfilePage} from "./pages/ProfilePage";
import {Provider} from "react-redux";
import {store} from "./store";


function App() {
    return (
        <Provider store={store}>
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
        </Provider>
      );
}

export default App;
