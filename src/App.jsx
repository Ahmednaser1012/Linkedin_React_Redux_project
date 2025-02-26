import { Route, Routes } from "react-router-dom";
import Login from "./component/loginPage/login";
import Home from "./component/HomePge/Home";
import Header from "./component/headerPage/Header";
import RequirAuth from "./component/RequirAuth";
import { useEffect } from "react";
import { getUserAuth } from "./component/indexFunction";

const App = () => {
  useEffect(() => {
    getUserAuth();
  }, []);
  return (
    <>
      <div className="app">
        <Routes>
          {/* <Route path="/" element={<div>hello</div>} /> */}
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequirAuth>
                <Header />
                <Home />
              </RequirAuth>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
