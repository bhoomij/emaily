import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import emailValidator from '../../utils/emailValidator';
import surveyFields from './surveyFields';


class SurveyForm extends Component {

    renderFields() {
        return surveyFields.map(field => {
            return (
                <Field
                    key={field.name}
                    label={field.label}
                    type="text"
                    name={field.name}
                    component={SurveyField}
                />
            );
        });
    }

    onFormSubmit() {
        this.props.onSurveyFormSubmit();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit.bind(this))}>
                    {this.renderFields()}
                    <Link to="/surveys"
                        className="red btn-flat white-text"
                    >
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit"
                        className="teal btn-flat white-text right"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = emailValidator(values.recipients || '');

    surveyFields.forEach(({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });

    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);