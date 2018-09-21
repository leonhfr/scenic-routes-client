import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';
import { connect } from 'react-redux';
import  { getChuck }  from '../../actions/mocks.actions';

class App extends Component {

  componentDidMount() {
    this.props.getQuote();
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.props.quote}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quote: state.mock.quote
});

const mapDispatchToProps = (dispatch) => ({
  getQuote: () => dispatch(getChuck())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
