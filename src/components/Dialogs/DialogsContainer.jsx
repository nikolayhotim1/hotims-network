import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReduser';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },

        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent
)(Dialogs);