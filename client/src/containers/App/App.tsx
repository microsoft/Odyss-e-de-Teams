import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import './App.scss';

import Menu from '../Menu/Menu';
import Cockpit from '../Cockpit/Cockpit';
import Header from '../../components/Header/Header';

import IStore from '../../store/IStore';

const App: React.FunctionComponent<any> = () => {
    return (
        <Container fluid className={"h-100 d-flex p-0"}>
            <Menu />
            {/* <div className={`${isNav ? 'withNav' : 'noNav'} ${!(isHome || isChoixStart) ? 'header-step' : ''}`}> */}
            <div className={"main-content w-100 py-4 px-5"}>
                <div className={"mb-3"}>
                    <Header  />
                </div>
                <Switch>
                    <Route exact path="/Cockpit">
                        <Cockpit />
                    </Route>
                    <Route exact path="/Jouer">
                        <p>Jouer container</p>
                    </Route>
                    <Route exact path="/Classement">
                        <p>Classement container</p>
                    </Route>
                    <Route exact path="/Profil">
                        <p>Profil container</p>
                    </Route>
                    <Route exact path="/Regles">
                        <p>Regles container</p>
                    </Route>
                    <Route exact path="/Planning">
                        <p>Planning container</p>
                    </Route>
                    <Route exact path="/Outillage">
                        <p>Outillage container</p>
                    </Route>
                </Switch>
            </div>
        </Container>
    );
};

const AppRouter = withRouter(App);
const mapStateToProps = (state: IStore) => {
    return {
    }
}
export default connect(mapStateToProps)(AppRouter)
