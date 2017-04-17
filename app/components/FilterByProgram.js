const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
// const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';

const counties = [
  { id: 0, title: 'Bedfordshire'},
  { id: 1, title: 'Berkshire'},
  { id: 2, title: 'Buckinghamshire'},
  { id: 3, title: 'Cambridgeshire'},
  { id: 4, title: 'Cheshire'},
  { id: 5, title: 'Cornwall'},
  { id: 6, title: 'Cumbria, (Cumberland)'},
  { id: 7, title: 'Derbyshire'},
  { id: 8, title: 'Devon'},
  { id: 9, title: 'Dorset'},
  { id: 10, title: 'Durham'},
  { id: 11, title: 'Essex'},
  { id: 12, title: 'Gloucestershire'},
  { id: 13, title: 'Hampshire'},
  { id: 14, title: 'Hertfordshire'},
  { id: 15, title: 'Huntingdonshire'},
  { id: 16, title: 'Kent'},
  { id: 17, title: 'Lancashire'},
  { id: 18, title: 'Leicestershire'},
  { id: 19, title: 'Lincolnshire'},
  { id: 20, title: 'Middlesex'},
  { id: 21, title: 'Norfolk'},
  { id: 22, title: 'Northamptonshire'},
  { id: 23, title: 'Northumberland'},
  { id: 24, title: 'Nottinghamshire'},
  { id: 25, title: 'Northamptonshire'},
  { id: 26, title: 'Oxfordshire'},
  { id: 27, title: 'Northamptonshire'},
  { id: 28, title: 'Rutland'},
  { id: 29, title: 'Shropshire'},
  { id: 30, title: 'Somerset'},
  { id: 31, title: 'Staffordshire'},
  { id: 32, title: 'Suffolk'},
  { id: 33, title: 'Surrey'},
  { id: 34, title: 'Sussex'},
  { id: 35, title: 'Warwickshire'},
  { id: 36, title: 'Westmoreland'},
  { id: 37, title: 'Wiltshire'},
  { id: 38, title: 'Worcestershire'},
  { id: 39, title: 'Yorkshire'}
];

const val = [0, 1];

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      {
        key: 'id',
        name: 'StudetId',
        width: 80,
        resizable: true
      },
      {
        key: 'firstName',
        name: 'Name',
        // editor: <AutoCompleteEditor options={counties}/>,
        width: 200,
        resizable: true
      },
      {
        key: '1',
        name: '1',
        editable: true,
        // editor: <DropDownEditor options={val}/>,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '2',
        name: '2',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '3',
        name: '3',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '4',
        name: '4',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '5',
        name: '5',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '6',
        name: '6',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '7',
        name: '7',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '8',
        name: '8',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '9',
        name: '9',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '10',
        name: '10',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '11',
        name: '11',
        editable: true,
        // editor: <DropDownEditor options={val}/>,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '12',
        name: '12',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '13',
        name: '13',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '14',
        name: '14',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '15',
        name: '15',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '16',
        name: '16',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '17',
        name: '17',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '18',
        name: '18',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '19',
        name: '19',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '20',
        name: '20',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '21',
        name: '21',
        editable: true,
        // editor: <DropDownEditor options={val}/>,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '22',
        name: '22',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '23',
        name: '23',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '24',
        name: '24',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '25',
        name: '25',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '26',
        name: '26',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '27',
        name: '27',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '28',
        name: '28',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '29',
        name: '29',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '30',
        name: '30',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '31',
        name: '31',
        editable: true,
        // editor: <DropDownEditor options={val}/>,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '32',
        name: '32',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '33',
        name: '33',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '34',
        name: '34',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '35',
        name: '35',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '36',
        name: '36',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '37',
        name: '37',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '38',
        name: '38',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '39',
        name: '39',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '40',
        name: '40',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '41',
        name: '41',
        editable: true,
        // editor: <DropDownEditor options={val}/>,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '42',
        name: '42',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '43',
        name: '43',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '44',
        name: '44',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '45',
        name: '45',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '46',
        name: '46',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '47',
        name: '47',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '48',
        name: '48',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '49',
        name: '49',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      {
        key: '50',
        name: '50',
        editable: true,
        width: 40,
        resizable: true,
        events: {
          onDoubleClick: function() {
            console.log('The user double clicked on title column');
          }
        }
      },
      // {
      //   key: '2',
      //   name: '2',
      //   editable: true,
      //   width: 40,
      //   resizable: true,
      //   events: {
      //     onDoubleClick: function() {
      //       console.log('The user double clicked on title column');
      //     }
      //   },
      //   }
      // {
      //   key: 'firstName',
      //   name: 'First Name',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'lastName',
      //   name: 'Last Name',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'email',
      //   name: 'Email',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'street',
      //   name: 'Street',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'zipCode',
      //   name: 'ZipCode',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'date',
      //   name: 'Date',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'bs',
      //   name: 'bs',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'catchPhrase',
      //   name: 'Catch Phrase',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      // {
      //   key: 'companyName',
      //   name: 'Company Name',
      //   editable: true,
      //   width: 200,
      //   resizable: true
      // },
      {
        key: 'sentence',
        editable: true,
        name: 'Sentence',
        width: 200,
        resizable: true
      }
    ];

    return { rows: this.createRows(2000) };
  },

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    return rows;
  },

  createFakeRowObjectData(index) {
    return {
      id: 'id_' + index,
      avartar: faker.image.avatar(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      1:faker.random.number()%2,
      2:faker.random.number()%2,
      3:faker.random.number()%2,
      4:faker.random.number()%2,
      5:faker.random.number()%2,
      6:faker.random.number()%2,
      7:faker.random.number()%2,
      8:faker.random.number()%2,
      9:faker.random.number()%2,
      10:faker.random.number()%2,
      11:faker.random.number()%2,
      12:faker.random.number()%2,
      13:faker.random.number()%2,
      14:faker.random.number()%2,
      15:faker.random.number()%2,
      16:faker.random.number()%2,
      17:faker.random.number()%2,
      18:faker.random.number()%2,
      19:faker.random.number()%2,
      20:faker.random.number()%2,
      21:faker.random.number()%2,
      22:faker.random.number()%2,
      23:faker.random.number()%2,
      24:faker.random.number()%2,
      25:faker.random.number()%2,
      26:faker.random.number()%2,
      27:faker.random.number()%2,
      28:faker.random.number()%2,
      29:faker.random.number()%2,
      30:faker.random.number()%2,
      31:faker.random.number()%2,
      32:faker.random.number()%2,
      33:faker.random.number()%2,
      34:faker.random.number()%2,
      35:faker.random.number()%2,
      36:faker.random.number()%2,
      37:faker.random.number()%2,
      38:faker.random.number()%2,
      39:faker.random.number()%2,
      40:faker.random.number()%2,
      41:faker.random.number()%2,
      42:faker.random.number()%2,
      43:faker.random.number()%2,
      44:faker.random.number()%2,
      45:faker.random.number()%2,
      46:faker.random.number()%2,
      47:faker.random.number()%2,
      48:faker.random.number()%2,
      49:faker.random.number()%2,
      50:faker.random.number()%2,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence()
    };
  },

  getColumns() {
    let clonedColumns = this._columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };

    return clonedColumns;
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  },

  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = React.addons.update(rows, {$push: [newRow]});
    this.setState({ rows });
  },

  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  },

  getSize() {
    return this.state.rows.length;
  },

  render() {
    // console.log(faker)
    return (
      <ReactDataGrid
        ref={ node => this.grid = node }
        enableCellSelect={true}
        columns={this.getColumns()}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        enableRowSelect={true}
        rowHeight={50}
        minHeight={600}
        rowScrollTimeout={200} />);
  }
});

export default Example;
