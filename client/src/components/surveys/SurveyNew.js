import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyReviewForm from './SurveyReviewForm';

class SurveyNew extends Component {
    state = { showReviewForm: false };

    renderContent() {
        if (this.state.showReviewForm) {
            return <SurveyReviewForm onBackClick={() => this.setState({ showReviewForm: false })} />;
        }

        return <SurveyForm onSurveyFormSubmit={() => this.setState({ showReviewForm: true })} />;
    }

    render() {
        return (
            <div style={{ marginTop: '10px' }}>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);