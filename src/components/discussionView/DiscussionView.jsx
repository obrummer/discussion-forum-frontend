import React from "react";
import DiscussionContainer from "./DiscussionContainer";
import MessageLoadingError from "./MessageLoadingError";
import { getMessagesWithThreadId, postNewMessage } from "../../API/serviceClient";

class DiscussionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], error: false, errorMessage: '' };
  }

  handleSubmit = text => {
    postNewMessage({ content: text, thread_id: this.props.match.params.id }).then(
      res => {
        this.setState({ data: res.message });
      },
      err => {
        this.setState({ error: true, errorMessage: err.message });
      }
    );
  };

  componentDidMount() {
    getMessagesWithThreadId(this.props.match.params.id).then(
      res => {
        this.setState({ data: res.message });
      },
      err => {
        this.setState({ error: true, errorMessage: err.message });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <MessageLoadingError message={this.state.errorMessage}/>
        ) : (
          <DiscussionContainer messages={this.state.data} onSubmission={this.handleSubmit} />
        )}
      </div>
    );
  }
}

export default DiscussionView;
