import React from 'react';
import TreeView from 'react-treeview';
import {Link} from 'react-router';

// This example data format is totally arbitrary. No data massaging is
// required and you use regular js in `render` to iterate through and
// construct your nodes.
const dataSource = [
  {
    type: 'Employees',
    collapsed: false,
    people: [
      {name: 'Paul Gordon', age: 25, sex: 'male', role: 'coder', collapsed: false},
      {name: 'Sarah Lee', age: 23, sex: 'female', role: 'jqueryer', collapsed: false},
    ],
  },
  {
    type: 'CEO',
    collapsed: false,
    people: [
      {name: 'Drew Anderson', age: 35, sex: 'male', role: 'boss', collapsed: false},
    ],
  },
];

// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.
const CompanyPeople = React.createClass({
  getInitialState() {
      return {results: []};
    },

  componentDidMount() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "http://tadadev.klp.org.in/api/v1/boundaries/",//TODO: Make a call that fetches only schools and districts
      success: function(data) {
            console.log(data.results);
            this.setState( {
              results: data.results
            });
          }.bind(this)
    });
  },
  render() {
    return (
      <div>
        {this.state.results.map((boundary, i) => {
          const name = boundary.name;
          const label = <span className="node">{name}</span>;
          return (
            <Link key={boundary.id} to="/login"><TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={false}>
              {/*node.people.map(person => {
                const label2 = <span className="node">{person.name}</span>;
                return (
                  <TreeView nodeLabel={label2} key={person.name} defaultCollapsed={false}>
                    <div className="info">age: {person.age}</div>
                    <div className="info">sex: {person.sex}</div>
                    <div className="info">role: {person.role}</div>
                  </TreeView>
                );
              })*/}
            </TreeView></Link>
          );
        })}
      </div>
    );
  },
});

export default CompanyPeople;
