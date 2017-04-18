const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
// const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

faker.locale = 'en_GB';


const val = [0, 1];
export default class Students extends React.Component{
// const Example = React.createClass({
  deleteStudent=()=>{
    console.log("deleteStudent called");
  }
  render() {
    // console.log(faker)
    // return (
    //   <ReactDataGrid
    //     ref={ node => this.grid = node }
    //     enableCellSelect={true}
    //     columns={this.getColumns()}
    //     rowGetter={this.getRowAt}
    //     rowsCount={this.getSize()}
    //     onGridRowsUpdated={this.handleGridRowsUpdated}
    //     enableRowSelect={true}
    //     rowHeight={50}
    //     minHeight={600}
    //     rowScrollTimeout={200} />);

    return (
        <div className="students-grid">
          <div className="row grid-header">
            <div className="col-md-1"><span>UID</span></div>
            <div className="col-md-2"><span>Name</span></div>
            <div className="col-md-1"><span>1</span></div>
            <div className="col-md-1"><span>2</span></div>
            <div className="col-md-1"><span>3</span></div>
            <div className="col-md-1"><span>4</span></div>
            <div className="col-md-1"><span>5</span></div>
            <div className="col-md-1"><span>6</span></div>
            <div className="col-md-1"><span>7</span></div>
            <div className="col-md-1"><span>8</span></div>
            <div className="col-md-1"><span>9</span></div>
            <div className="col-md-1"><span>10</span></div>
            <div className="col-md-1"><span>11</span></div>
            <div className="col-md-1"><span>12</span></div>
            <div className="col-md-1"><span>13</span></div>
            <div className="col-md-1"><span>14</span></div>
            <div className="col-md-1"><span>15</span></div>
            <div className="col-md-1"><span>16</span></div>
            <div className="col-md-1"><span>17</span></div>
            <div className="col-md-1"><span>18</span></div>
            <div className="col-md-1"><span>19</span></div>
            <div className="col-md-1"><span>20</span></div>
            <div className="col-md-1"><span>21</span></div>
            <div className="col-md-1"><span>22</span></div>
            <div className="col-md-1"><span>23</span></div>
            <div className="col-md-1"><span>24</span></div>
            <div className="col-md-1"><span>25</span></div>
            <div className="col-md-1"><span>26</span></div>
            <div className="col-md-1"><span>27</span></div>
            <div className="col-md-1"><span>28</span></div>
            <div className="col-md-1"><span>29</span></div>
            <div className="col-md-1"><span>30</span></div>
            <div className="col-md-1"><span>Actions</span></div>
          </div>
          <div className="row">
            <div className="col-md-1"><span>ID_1</span></div>
            <div className="col-md-2"><span>Rohit</span></div>

            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1"><input type="text" value='1' className='form-control' readOnly/></div>
            <div className="col-md-1">
              <span onClick={this.deleteStudent} className="glyphicon glyphicon-trash">Delete</span>
              <span className="glyphicon glyphicon-pencil" onClick={() => {console.log("Edit Button Clicked"); }}>Edit</span>
            </div>
          </div>
      </div>
    )
  }
}
// });

// export default Example;
