import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./AuthPage/Components/Registration";
import Login from "./AuthPage/Components/Login";
import AppPage from "./AppPage/AppPage";
const App = () => {
    return (

        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/app" element={<AppPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

    );
}

export default App;
