import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import surveyFields from './surveyFields';
import * as actions from '../../actions';

const SurveyReviewForm = ({ formValues, onBackClick, submitSurvey, history, auth }) => {

    const reviewFields = surveyFields.map(({ name, label }) => {
        return (
            <div key={name} style={{ marginTop: '10px' }}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please review your input again!</h5>
            {reviewFields}
            <div style={{ marginTop: '20px' }}>
                <button className="left yellow white-text darken-3 btn-flat"
                    onClick={onBackClick}
                >Back</button>
                <button className="right green white-text btn-flat"
                    onClick={() => submitSurvey(formValues, history)}
                    disabled={auth.credits < 1} >
                    Send Survey<i className="material-icons right">email</i>
                </button>
            </div>
            <div className="right red-text" style={{ clear: 'both', marginRight: '25px' }}>
                {auth.credits < 1 ? 'Not enough credits!' : ''}
            </div>
        </div>
    );
}

function mapStateToProps({ form, auth }) {
    return { formValues: form.surveyForm.values, auth };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReviewForm));