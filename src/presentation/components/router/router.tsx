import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "@/presentation/pages";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search" strict component={() => <Home />} />
        <Route path="" strict component={() => <Redirect to="/search" />} />
      </Switch>
    </BrowserRouter>
  );
};
