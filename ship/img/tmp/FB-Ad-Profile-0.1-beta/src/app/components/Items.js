"use strict";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Items extends Component {
  constructor(props) {
    super(props)
  }

  render() {
   var items = this.props.items;
   //console.log(thisprops.items)
    return (
      <table>
      <tbody>
        {items.map(function(item) {
          return (
            <tr key={item.fbid}>
            <td>{item.name}</td>
            <td>{item.fbid}</td>
            </tr>);
        })}
        </tbody>
      </table>
   )
 }
}

 Items.prototype.displayName = 'Items';

 module.exports = Items;
