import AppRoutes from "./components/AppRoutes";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { account } from "./store/userReducer";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(account());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
