import { connect } from 'react-redux';
import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReduser';
import Dialogs from './Dialogs';

const AuthRedirectComponent = withAuthRedirectComponent(Dialogs);

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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer;