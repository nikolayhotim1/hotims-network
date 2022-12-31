import { ChangeEvent, Component } from 'react';

type PropsType = {
    status: string,
    getUpdateStatus: (status: string) => void
};
type StateType = {
    editMode: boolean,
    status: string
};
class ProfileStatus extends Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    };
    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.getUpdateStatus(this.state.status);
    };
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    };
    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || 'My status will be here'}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;