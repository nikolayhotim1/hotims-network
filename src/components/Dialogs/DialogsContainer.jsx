import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirectComponent } from '../../hocs/withAuthRedirect'
import { actions } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'

const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (newMessageText) => {
			dispatch(actions.sendMessageActionCreator(newMessageText))
		}
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirectComponent)(Dialogs)
