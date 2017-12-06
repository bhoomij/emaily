import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return <div>Loading..</div>;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payment /></li>,
                    <li key="3"
                        style={{ margin: '0 10px' }}
                    >
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/auth/logout">Logout</a></li>
                ];
        }
    }

    render() {
        console.log(this.props.auth)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo left">Emaily</Link>
                    <ul className="right hide-on-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);