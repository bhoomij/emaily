import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import surveyFields from './surveyFields';
import * as actions from '../../actions';

const SurveyReviewForm = ({ formValues, onBackClick, submitSurvey, history }) => {

    const reviewFields = surveyFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return (
        <div>
            <h5>Please review your input again!</h5>
            {reviewFields}
            <button className="left yellow white-text darken-3 btn-flat"
                onClick={onBackClick}
            >Back</button>
            <button className="right green white-text btn-flat"
                onClick={() => submitSurvey(formValues, history)}
            >
                Send Survey<i className="material-icons right">email</i>
            </button>
        </div>
    );

}

function mapStateToProps({ form }) {
    return { formValues: form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReviewForm));