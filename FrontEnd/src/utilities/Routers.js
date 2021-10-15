import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Introduction from '../components/pages/subscription/Introduction';
import Grade from '../components/pages/subscription/Grade';
import SubRegister from '../components/pages/subscription/Register';


function Routers({ location }) {
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <section className="route-section my-0">
          <Switch location={location}>
            <Route exact path="/subscription/introduce" component={Introduction} />
            <Route exact path="/subscription/grade" component={Grade} />
            <Route exact path="/subscription/register" component={SubRegister} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Routers);