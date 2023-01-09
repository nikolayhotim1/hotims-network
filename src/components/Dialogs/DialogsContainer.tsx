import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hocs/withAuthRedirect'
import { actions } from '../../redux/dialogsReducer'
import { AppSateType } from '../../redux/reduxStore'
import Dialogs from './Dialogs'

const mapStateToProps = (state: AppSateType) => {
	return {
		dialogsPage: state.dialogsPage
	}
}
export default compose(connect(mapStateToProps, { sendMessage: actions.sendMessage }), withAuthRedirect)(Dialogs)
