import React, {Component} from 'react';

export default class MainContentArea extends React.Component{
	render(){
		return (
			<div id="main-content-wrapper" className="main__content">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12">
      <ol className="breadcrumb">
        <li><a href="#">Bangalore</a></li>
        <li><a href="#">Bangalore North</a></li>
        <li><a href="#">Yelahanka</a></li>
        <li className="active">GKLPS Yelahanka</li>
      </ol>
      <div className="row form-container">
        <div className="col-md-1"></div>
        <div className="col-md-9">
          <div className="form-heading heading-border"> Modify Details </div>

          <form className="form-horizontal" role="form">

            <div className="form-group">
              <label className="control-label col-sm-2" for="name">Name:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name"></input>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="address">Address:</label>
              <div className="col-sm-10">
                <textarea type="password" className="form-control" id="address" rows="3">                </textarea>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="pincode">Pincode:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="pincode"></input>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="category">Category:</label>
              <div className="col-sm-10">
                <select className="form-control" id="category">
                  <option>Lower Primary School</option>
                  <option>Model Primary School</option>
                  <option>Higher Primary School</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="medium">Medium:</label>
              <div className="col-sm-10">
                <select className="form-control" id="medium">
                  <option>Kannada</option>
                  <option>Urdu</option>
                  <option>Tamil</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="mgmt">Mangament:</label>
              <div className="col-sm-10">
                <select className="form-control" id="mgmt">
                  <option>Government - State</option>
                  <option>Government - Central</option>
                  <option>Aided</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="disecode">DISE Code:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="disecode"></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-2"><button type="submit" className="btn btn-primary">Add className</button></div>
      </div>
  </div>
					</div>
				</div>
			</div>
		);
	}
}