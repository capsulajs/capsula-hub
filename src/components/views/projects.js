import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';

class Projects extends Component {
  render() {
    return 'Canvas..';
  }
}

const mapStateToProps = store.select(models => ({}));
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
