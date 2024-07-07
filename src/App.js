import React, { Fragment } from "react";
import RootRoutes from "./RootRoutes";
import Header from "./common/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <RootRoutes />
    </Fragment>
  );
}

export default App;