import "./App.css";
import Home from "./components/homepage/Home";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Form from "./components/form/Form";
import { useSelector } from "react-redux";
import CustomRouter from "./helpers/CustomRouter";
import { history } from "./helpers/history";

function App() {
  const isSubmittedForm = useSelector((state) => state.isSubmittedForm);
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route
          path="/"
          index
          element={isSubmittedForm ? <Home /> : <Navigate to="/form" />}
        />
        <Route path="/form" index element={<Form />}></Route>
      </Routes>
    </CustomRouter>
  );
}

export default App;
