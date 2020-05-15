import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import './App.scss';

import Menu from '../Menu/Menu';
import Cockpit from '../Cockpit/Cockpit';
import Header from '../../components/Header/Header';

import { getUser } from '../../api/Api';

import IStore from '../../store/IStore';
import { IAppProps } from '../../models/App';

class App extends React.Component<IAppProps, {}> {
    
    componentDidMount() {
        this._loadCurrentUser();
    }

    private _loadCurrentUser = () => {
        getUser('fr', 'current').then(data => {
            const action_liste = { type: "SET_CURRENT_USER", value: data };
            this.props.dispatch(action_liste);
        });
    }

    render() {
        let hasGradient = this.props.location.pathname === '/Jouer' ? false : true;
        return (
            <Container fluid className={`${hasGradient ? 'gradient' : ''} main-container h-100 d-flex p-0`}>
                <Menu currentRouterLink={this.props.location.pathname} />
                <div className={"main-content w-100 py-4 px-5"}>
                    <div className={"mb-3"}>
                        <Header hasGradient={hasGradient}  />
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
    }
};

const AppRouter = withRouter(App);
const mapStateToProps = (state: IStore) => {
    return {
    }
}
export default connect(mapStateToProps)(AppRouter)
