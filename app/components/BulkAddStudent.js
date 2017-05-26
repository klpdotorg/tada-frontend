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
      return (<div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div>)
    } else {
        let rowsObj = [];
        for(let i=0; i< this.state.rows; i++) {
          rowsObj.push(<InputRow languages={this.state.languages.list} updateValue={this.updateValue} index={i} key={i} />)
        }
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="text-primary text-uppercase">
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>UID</th>
                <th>Gender</th>
                <th>Mother Tongue</th>
                <th>Date of Birth</th>
                <th>Father First Name</th>
                <th>Father Middle Name</th>
                <th>Father Last Name</th>
                <th>Mother First Name</th>
                <th>Mother Middle Name</th>
                <th>Mother Last Name</th>
              </tr>
            </thead>
            <tbody>
             { rowsObj }
            </tbody
          </table>
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary" onClick={() => {this.props.addStudents(this.state.values)}}>Save</button>
              <button onClick={this.props.hide} className="btn btn-primary padded-btn">Discard</button>
            </td>
            <div className="col-md-6"></td>
          </td>
        </td>
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
      fatherFirstName: '',
      fatherMiddleName: '',
      fatherLastName:'',
      motherFirstName: '',
      motherMiddleName: '',
      motherLastName: '',
      uid: '',
      mt: 1,
      gender: 'male'
    }
  }

  changeVal(e, key) {
    var obj = {}
    obj[key] = e.target.value
    this.setState(obj, () => {
      this.props.updateValue(this.state, this.props.index)
    });
  }

  render() {

    return (
        <tr>
          <td><input value={this.state.first_name} onChange={(e) => {this.changeVal(e, 'first_name')}} type='text' className='form-control'/></td>
          <td><input value={this.state.middle_name} onChange={(e) => {this.changeVal(e, 'middle_name')}} type='text' className='form-control'/></td>
          <td><input value={this.state.last_name} onChange={(e) => {this.changeVal(e, 'last_name')}} type='text' className='form-control'/></td>
          <td><input value={this.state.uid} onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></td>
          <td>
            <select className="col-sm-1" onChange={(e) => {this.changeVal(e, 'gender')}} value={this.state.gender} className="form-control" id="gender">
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </td>
          <td>
            <select onChange={(e) => {this.changeVal(e, 'mt')}} value={this.state.mt} className="form-control" id="gender">
              {this.props.languages.map((lang, i) => {
                return <option key={i} value={lang.value}>{lang.label}</option>
              })}
            </select>
          </td>
          <td><input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='date' className='form-control'/></td>
          <td><input value={this.state.fatherFirstName} onChange={(e) => {this.changeVal(e, 'fatherFirstName')}} type='text' className='form-control'/></td>
          <td><input value={this.state.fatherMiddleName} onChange={(e) => {this.changeVal(e, 'fatherMiddleName')}} type='text' className='form-control'/></td>
          <td><input value={this.state.fatherLastName} onChange={(e) => {this.changeVal(e, 'fatherLastName')}} type='text' className='form-control'/></td>
          <td><input value={this.state.motherFirstName} onChange={(e) => {this.changeVal(e, 'motherFirstName')}} type='text' className='form-control'/></td>
          <td><input value={this.state.motherMiddleName} onChange={(e) => {this.changeVal(e, 'motherMiddleName')}} type='text' className='form-control'/></td>
          <td><input value={this.state.motherLastName} onChange={(e) => {this.changeVal(e, 'motherLastName')}} type='text' className='form-control'/></td>
        </tr>
    )
  }
}
