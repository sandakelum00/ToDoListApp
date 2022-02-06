import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyTasks from "./screens/MyTasks/MyTasks";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateTask from "./screens/CreateTask/CreateTask";
import SingleTask from "./SingleTask/SingleTask";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/mytasks" element={<MyTasks />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/createtask" element={<CreateTask />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/task/:id" element={<SingleTask />}></Route>
        <Route exact path="/" element={<LandingPage />}></Route>
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
