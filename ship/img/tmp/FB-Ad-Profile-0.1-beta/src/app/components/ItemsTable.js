import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function Test () {
    return 'col-test'
}


export default class DefaultSortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc:'Click on a row to get more information',
      topic:'Topic'
    }
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'type'  // default sort order
    }
    this.selectRowProp = {
        mode:'radio',
        clickToSelect: true,
        bgColor: "#d8dfea",
        onSelect: this.onRowSelect.bind(this)
    }
  }

  onRowSelect(row) {
        this.setState({desc:row.description, topic: row.topic});
        console.log(`You click row id: ${row.description}`)
  }

  render() {
    const filter = this.props.filter;
    if(filter === 'all'){
      var items = this.props.items
    }
    else{
      var items = this.props.items.filter(function (item) { return (item.type === filter) })
    }

    const desc = this.state.desc
    const topic = this.state.topic
    return (
      <div>
      <p>{desc}</p>

      <BootstrapTable data={ items } options={ this.options } selectRow={ this.selectRowProp } height='300'>
      <TableHeaderColumn dataField='name' isKey={ true } dataSort={ true }  columnClassName={Test}>Name</TableHeaderColumn>
      <TableHeaderColumn dataField='topic' dataSort={ true }  columnClassName={Test}>Topic</TableHeaderColumn>
      </BootstrapTable>
      </div>
      );
  }
}
