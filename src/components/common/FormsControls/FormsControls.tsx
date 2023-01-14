import { FieldValidatorType } from '../../../utils/validators/validators'
import { FC, ReactNode } from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import style from './FormsControls.module.css'

type FormsControlPropsType = {
	meta: WrappedFieldMetaProps
	children: ReactNode
}
const FormsControl: FC<FormsControlPropsType> = ({ meta: { touched, error }, children }) => {
	const hasError = touched && error
	return (
		<div className={`${style.formControl} ${hasError ? style.error : ''}`}>
			<div>{children}</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}
export const Textarea: FC<WrappedFieldProps> = ({ input, ...props }) => {
	return (
		<FormsControl {...props}>
			<textarea {...input} {...props} />
		</FormsControl>
	)
}
export const Input: FC<WrappedFieldProps> = ({ input, ...props }) => {
	return (
		<FormsControl {...props}>
			<input {...input} {...props} />
		</FormsControl>
	)
}
export function createField<FormKeysType extends string>(
	component: FC<WrappedFieldProps>,
	name: FormKeysType,
	placeholder: string | null,
	validators: Array<FieldValidatorType>,
	props = {},
	text = ''
) {
	return (
		<div>
			<Field component={component} name={name} placeholder={placeholder} validate={validators} {...props} />
			{text}
		</div>
	)
}
export type GetStringKeys<T> = Extract<keyof T, string>
