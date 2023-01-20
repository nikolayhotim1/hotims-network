import { Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}
type FormType = {
	term: string
	friend: 'true' | 'false' | ''
}
type SetSubmittingType = {
	setSubmitting: (isSubmitting: boolean) => void
}
export const UsersSearchForm: FC<PropsType> = memo(({ onFilterChanged }) => {
	const submit = (values: FormType, { setSubmitting }: SetSubmittingType) => {
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null
		}
		onFilterChanged(filter)
		setSubmitting(false)
	}
	return (
		<div>
			<Formik initialValues={{ term: '', friend: '' }} onSubmit={submit}>
				{({ isSubmitting }) => (
					<Form>
						<Field type='text' name='term' />
						<Field as='select' name='friend'>
							<option value='null'>All</option>
							<option value='true'>Followed</option>
							<option value='false'>Unfollowed</option>
						</Field>
						<button type='submit' disabled={isSubmitting}>
							Find
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
})
