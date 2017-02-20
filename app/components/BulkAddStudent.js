import React, { Component } from 'react';
import {getLanguages} from './utils'
import {Select} from 'react-select'


export default class BulkAddStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      rows: 10,
      values: {},
      languages: {
        isLoading: true
      }
    }
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    getLanguages().then((languages) => {
      const langs = languages.results.map((language) => ({
          value: language.id,
          label: language.name
        }))
      this.setState({
        languages: {
          isLoading: false,
          list: langs
        }
      })
    })

  }

  updateValue(data, i) {
    this.state.values[i] = data;
    this.setState({ values: this.state.values });
  }

  render () {
    if (this.state.languages.isLoading) {
      return (<div>Loading...</div>)  
    } else {
        let rowsObj = [];
        for(let i=0; i< this.state.rows; i++) {
          rowsObj.push(<InputRow languages={this.state.languages.list} updateValue={this.updateValue} index={i} key={i} />)
        }
      return (
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2"><span>First Name</span></div>
              <div className="col-md-1"><span>Middle Name</span></div>
              <div className="col-md-1"><span>Last Name</span></div>
              <div className="col-md-1"><span>UID</span></div>
              <div className="col-md-1"><span>Gender</span></div>
              <div className="col-md-1"><span>Mother Tongue</span></div>
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
}

class InputRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      fatherName: '',
      motherName: '',
      uid: '',
      mt: '',
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
          <div className="col-md-2"><input value={this.state.first_name} onChange={(e) => {this.changeVal(e, 'first_name')}} type='text' className='form-control'/></div>
          <div className="col-md-1"><input value={this.state.middle_name} onChange={(e) => {this.changeVal(e, 'middle_name')}} type='text' className='form-control'/></div>
          <div className="col-md-1"><input value={this.state.last_name} onChange={(e) => {this.changeVal(e, 'last_name')}} type='text' className='form-control'/></div>
          <div className="col-md-1"><input value={this.state.uid} onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></div>
          <div className='col-md-1'>
            <select className="col-sm-2" onChange={(e) => {this.changeVal(e, 'gender')}} value={this.state.gender} className="form-control" id="gender">
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className="col-md-1">
            <select className="col-sm-2" onChange={(e) => {this.changeVal(e, 'mt')}} value={this.state.mt} className="form-control" id="gender">
              {this.props.languages.map((lang, i) => {
                return <option key={i} value={lang.value}>{lang.label}</option>
              })}
            </select>
          </div>
          <div className="col-md-2"><input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='date' className='form-control'/></div>
          <div className="col-md-1"><input value={this.state.fatherName} onChange={(e) => {this.changeVal(e, 'fatherName')}} type='text' className='form-control'/></div>
          <div className="col-md-2"><input value={this.state.motherName} onChange={(e) => {this.changeVal(e, 'motherName')}} type='text' className='form-control'/></div>
        </div>
      </div>
    )
  }
}