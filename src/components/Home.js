import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.nameInputRef = React.createRef();
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/todo">Go to todo</Link>

        <div>
          {this.props.name && (
            <h2 data-testid="greeting">Greetings to {this.props.name}!</h2>
          )}
          <label htmlFor="user-name">User Name</label>
          <input id="user-name" ref={this.nameInputRef} type="text" />
          <button
            type="button"
            onClick={() =>
              this.props.updateName(this.nameInputRef.current.value)
            }
          >
            Greet with the name
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => dispatch.user.getNameAsync({ name, timeout: 1000 })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
