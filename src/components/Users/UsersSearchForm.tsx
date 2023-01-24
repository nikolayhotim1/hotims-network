import { Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { FilterType } from '../../redux/usersReducer'
import { getUsersFilter } from '../../redux/usersSelectors'

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | ''
type FormType = {
	term: string
	friend: FriendFormType
}
type SetSubmittingType = {
	setSubmitting: (isSubmitting: boolean) => void
}
export const UsersSearchForm: FC<PropsType> = memo(({ onFilterChanged }) => {
	const filter = useSelector(getUsersFilter)
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
			<Formik
				enableReinitialize
				initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
				onSubmit={submit}
			>
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
