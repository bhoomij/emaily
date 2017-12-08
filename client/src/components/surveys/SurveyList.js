import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderLastResponseDate(survey) {
        if (survey.lastResponded) {
            return (
                <p className="right">
                    <i>
                        Last Response On: {new Date(survey.lastResponded).toLocaleDateString()}
                    </i>
                </p>
            );
        }
    }

    renderContent() {
        if (this.props.surveys.length) {
            return this.props.surveys.reverse().map(survey => {
                return (
                    <div className="card blue-grey darken-1" key={survey._id}>
                        <div className="card-content white-text">
                            <span className="card-title">{survey.title}</span>
                            <p>{survey.content}</p>
                            <div style={{ marginTop: '10px' }}>
                                <p className="left">
                                    <i>
                                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                                    </i>
                                </p>
                                {this.renderLastResponseDate(survey)}
                            </div>
                        </div>
                        <div className="card-action">
                            <a>Yes: {survey.yes}</a>
                            <a>No: {survey.no}</a>
                        </div>
                    </div >
                );
            })
        }

        return (
            <div style={{ marginTop: '50px' }} >
                <h5>Let me help you to create your first survey</h5>

                <ul className="browser-default">
                    <li>Click + button to add survey and collect feedback</li>
                    <li>Add credits from nav-bar to send survey emails</li>
                    <li>You can track survey yes/no reponse count from your emaily dashboard</li>
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);