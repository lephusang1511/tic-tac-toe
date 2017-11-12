import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        fields: {
          playerOne: this.props.playerOne,
          playerTwo: this.props.playerTwo,
          aSign: !this.props.aSign ? "X" : this.props.aSign
        },
        errors: {}
    }
 }
  playerFormSubmit(e) {
    ReactDOM.render(<Game
        playerOne={this.state.fields.playerOne}
        playerTwo={this.state.fields.playerTwo}
        aSign={this.state.fields.aSign}/>, 
      document.getElementById('root'));
  }

 handleChange(field, e) {         
     let fields = this.state.fields;
     fields[field] = e.target.value;        
     this.setState({fields});
 }

 render() {
     return (
      <div className="App">
        <h1 className="App-title">Welcome to Tic Toc Toe</h1>
        <div className="App-intro">
          <form name="playerForm" className="playerForm" onSubmit={this.playerFormSubmit.bind(this)}>
            <fieldset>
              <p className="note">Please enter Player's Name</p>
              <div className="row">
                <label htmlFor="playerOne">Player One<span className="req">*</span></label>
                <input ref="playerOne" type="text" className="txt" placeholder="Tom" onChange={this.handleChange.bind(this, "playerOne")} value={this.state.fields["playerOne"]} required/>
              </div>
              <div className="row">
                <label htmlFor="playerTwo">Player Two<span className="req">*</span></label>
                <input refs="playerTwo" type="text" className="txt" placeholder="Jerry" onChange={this.handleChange.bind(this, "playerTwo")} value={this.state.fields["playerTwo"]} required/>
              </div>
              <div className="row">
                <label htmlFor="aSign">
                  Choose A Sign<br/>
                  For Player One
                </label>
                <div className="divForChoose">
                  <input type="radio" name="aSign" value="X" onChange={this.handleChange.bind(this, "aSign")} checked={this.state.fields["aSign"] === "X"}/><span className="squareInput" style={{color:"#000080"}}>X</span><br/>
                  <input type="radio" name="aSign" value="O" onChange={this.handleChange.bind(this, "aSign")} checked={this.state.fields["aSign"] === "O"}/><span className="squareInput" style={{color:"#b22222"}}>O</span>
                </div>
              </div>
              <div className="center">
                <input type="submit" id="submitbtn" className="btn" value="Start"/>
              </div>
            </fieldset>
           </form>
        </div>
      </div>
   )
 }
}
export default App;