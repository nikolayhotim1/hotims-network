import React from 'react';
import { Field } from 'redux-form';
import style from './FormsControls.module.css';

const FormsControl = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;

    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export const Textarea = ({ input, ...props }) => {
    return (
        <FormsControl {...props}>
            <textarea {...input} {...props} />
        </FormsControl>
    );
};

export const Input = ({ input, ...props }) => {
    return (
        <FormsControl {...props}>
            <input {...input} {...props} />
        </FormsControl>
    );
};

export const createField = (component, name, placeholder, validators, props = {}, text = '') => {
    return (
        <div>
            <Field
                component={component}
                name={name}
                placeholder={placeholder}
                validate={validators}
                {...props}
            />{text}
        </div>
    );
};