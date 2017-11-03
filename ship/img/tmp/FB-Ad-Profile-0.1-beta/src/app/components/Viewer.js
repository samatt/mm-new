import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ItemsTable from './ItemsTable';

export default class Viewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filter: 'all'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    console.log(value)
    this.setState({filter: value});
  }

  render (){
    return (
      <div>
      <div className="btn-group" role="group" aria-label="...">
      <button key='cluster' type="button" onClick={this.handleClick.bind(this,'cluster')} className="btn btn-default">Cluster</button>
      <button key='interests' type="button"  onClick={this.handleClick.bind(this,'interest')} className="btn btn-default">Interest</button>
      <button key='demographics' type="button" onClick={this.handleClick.bind(this,'demographics')} className="btn btn-default">Demographics</button>
      </div>
      <ItemsTable items={this.props.items} filter={this.state.filter}/>
      </div>

    /*
      {this.props.categories.map( function(category) { return <button key={category} type="button" onClick={handleClick} className="btn btn-default">{category}</button> } )) }
    */
    )
  }
}