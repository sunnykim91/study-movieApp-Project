import React from "react";
import { Route } from "react-router-dom";
import MovieList from "./components/Movie_List";
import MovieDetail from "./components/Movie_Detail";

const App = () => {
  return (
    <div>
      <Route path="/" component={MovieList} exact={true} />
      <Route path="/detail/:id" component={MovieDetail} />
    </div>
  );
};

export default App;
