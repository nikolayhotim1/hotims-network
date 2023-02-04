import { ComponentType } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hocs/withAuthRedirect'
import { actions } from '../../redux/dialogsReducer'
import { AppStateType } from '../../redux/reduxStore'
import Dialogs from './Dialogs'
const mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage
	}
}
export default compose<ComponentType>(connect(mapStateToProps, { sendMessage: actions.sendMessage }), withAuthRedirect)(Dialogs)
