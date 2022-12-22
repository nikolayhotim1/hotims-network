import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectComponent } from '../../hoc/withAuthRedirect';
import { sendMessageActionCreator } from '../../redux/dialogsReduser';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => {
            dispatch(sendMessageActionCreator(newMessageText));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent
)(Dialogs);