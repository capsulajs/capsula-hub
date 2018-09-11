import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { name, greeting, updateName, getGreeting } = this.props;
    return (
      <div>
        <h1>Home page</h1>
        <Link to="/todo">Go to todo</Link>

        <div>
          {greeting && <h2 data-testid="greeting">{greeting}</h2>}
          <label htmlFor="user-name">User Name</label>
          <input
            id="user-name"
            value={name}
            onChange={({ target: { value } }) => updateName(value)}
            type="text"
          />
          <button type="button" onClick={getGreeting}>
            Greet with the name
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    greeting: state.user.greeting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => dispatch.user.updateName(name),
    getGreeting: () => dispatch.user.getGreetingAsync(1000)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
