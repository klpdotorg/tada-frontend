import React from 'react';

const Button = (props) => 
  <button onClick={props.onClick} className={props.color} disabled={props.disabled}>{props.title}</button>

export default Button