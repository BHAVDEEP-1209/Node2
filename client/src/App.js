import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  const public1 = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "*",
      element: <Login />,
    },
  ];
  const private1 = [
    {
      path: "/homepage",
      element: <Homepage />,
    },
    
  ];
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} /> */}
        {
          isLoggedIn && private1.map((ele)=>{
            return <Route path={ele.path} element={ele.element}/>
          })  
        }

        {
          public1.map((ele)=>{
            return <Route path={ele.path} element={ele.element}/>
          })
        }

      </Routes>
    </div>
  );
}

export default App;
