import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Current from "./components/Current";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <BrowserRouter>
        <div
          className="container"
          style={{
            margin: "0 auto",
            display: "flex",
            maxWidth: "800px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Current} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
