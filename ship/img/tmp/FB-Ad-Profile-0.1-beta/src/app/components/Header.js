import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

/*
return(
  <div onClick={props.handleImagePreviewOnClick}>
  {category}
  </div>
  )
*/
const Categories = (props) => {

  return (
    <div className="btn-group" role="group" aria-label="...">
      {props.categories.map( function(category) { return <button type="button" className="btn btn-default">{category}</button> } ) }
    </div>
    );
}

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      backgroundColor: '#3b5998',
      color: 'white'
    };
    this.head = {
      color:'white'
    }
  }

  render() {
    var header = ""
    if(this.props.loaded){
      header = "FB Ad Profile loaded"
    }
    else{
      header = " FB Ad Profile Not Loaded. go to https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen"
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid" style={this.divStyle}>
          <div className="navbar-header">
            <button type="button"  className="navbar-toggle collapsed" data-toggle="collapse" data-target="#categories" aria-expanded="false">
              Check Status
            </button>
            <a className="navbar-brand" style={this.head} href="#">FB Profile</a>
          </div>

          <div className="collapse navbar-collapse" id="categories">
              {header}
          </div>
        </div>
      </nav>
      );
  }
}
