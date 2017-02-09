import React, { Component } from 'react';


export default class BulkAddStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      rows: 10,
      values: {}
    }
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(data, i) {
    this.state.values[i] = data;
    this.setState({ values: this.state.values });
  }

  render () {
    let rowsObj = [];
    for(let i=0; i< this.state.rows; i++) {
      rowsObj.push(<InputRow updateValue={this.updateValue} index={i} key={i} />)
    }

    return (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2"><span>First Name</span></div>
          <div className="col-md-1"><span>Middle Name</span></div>
          <div className="col-md-1"><span>Last Name</span></div>
          <div className="col-md-1"><span>UID</span></div>
          <div className="col-md-1"><span>Gender</span></div>
          <div className="col-md-1"><span>Language</span></div>
          <div className="col-md-1"><span>DoB</span></div>
          <div className="col-md-2"><span>Father Name</span></div>
          <div className="col-md-2"><span>Mother Name</span></div>
        </div>
        { rowsObj }

        <div className="col-md-12">
          <div className="col-md-offset-8 col-md-4">
            <button className="btn" onClick={() => {this.props.addStudents(this.state.values)}}>Save</button>
            <button onClick={this.props.hide} className="btn">Discard</button>
          </div>
        </div>
      </div>
    )
  }
}

class InputRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      fatherName: '',
      motherName: '',
      uid: '',
      language: '',
      gender: ''
    }
  }

  changeVal(e, key) {

    var obj = {}
    obj[key] = e.target.value
    this.setState(obj);
    this.props.updateValue(this.state, this.props.index);
  }

  render() {
    return (
      <div className="col-md-12">
          <div className="row">
            <div className="col-md-2"><input value={this.state.firstName} onChange={(e) => {this.changeVal(e, 'firstName')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.middleName} onChange={(e) => {this.changeVal(e, 'middleName')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.lastName} onChange={(e) => {this.changeVal(e, 'lastName')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.uid} onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.gender} onChange={(e) => {this.changeVal(e, 'gender')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.language} onChange={(e) => {this.changeVal(e, 'language')}} type='text' className='form-control'/></div>
            <div className="col-md-2"><input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='text' className='form-control'/></div>
            <div className="col-md-1"><input value={this.state.fatherName} onChange={(e) => {this.changeVal(e, 'fatherName')}} type='text' className='form-control'/></div>
            <div className="col-md-2"><input value={this.state.motherName} onChange={(e) => {this.changeVal(e, 'motherName')}} type='text' className='form-control'/></div>
          </div>
        </div>
    )
  }
}