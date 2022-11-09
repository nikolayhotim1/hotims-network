import React from 'react';
import style from './FormsControls.module.css';

const FormsControl = ({ meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
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