import React from 'react';
import PropTypes from 'prop-types';
import isEmtpy from 'lodash.isempty';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    window.onclick = (event) => {
      if (!event.target.matches('.show-multiSelect-dropdown')) {
        const el = document.getElementById(`multiselect-dropdown${this.props.id}`);
        if (el && el.classList.contains('show')) {
          el.classList.remove('show');
        }
      }
    };
  }

  toggleDropdown() {
    const el = document.getElementById(`multiselect-dropdown${this.props.id}`);
    if (!el.classList.contains('show')) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  }

  handleChange(newVal) {
    this.setState({
      value: newVal,
    });
    if (this.props.onChange) {
      this.props.onChange(newVal);
    }
  }

  render() {
    const { value } = this.state;
    const { options } = this.props;
    const dropdownClassName = `show-multiSelect-dropdown${this.props.id}`;

    return (
      <div>
        <div className="dropdown">
          <button
            className={`btn btn-default dropdown-toggle ${dropdownClassName}`}
            type="button"
            data-toggle="dropdown"
            onClick={this.toggleDropdown}
          >
            <span className={dropdownClassName}>{!isEmtpy(value) ? value : 'Select...'}</span>
            <span
              className={`caret ${dropdownClassName}`}
              style={{ float: 'right', marginTop: 9 }}
            />
          </button>
          <ul className="dropdown-menu multi-select" id={`multiselect-dropdown${this.props.id}`}>
            {options.map((option, i) => {
              if (value === option.value) {
                return (
                  <li className="selected-multiselect-item" key={i}>
                    <a
                      onClick={() => {
                        this.handleChange(option.value);
                      }}
                    >
                      <input type="radio" aria-label="..." checked />
                      <span>{option.label}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={i}>
                  <a
                    onClick={() => {
                      this.handleChange(option.value);
                    }}
                  >
                    <input type="radio" aria-label="..." checked={false} />
                    <span>{option.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Select.defaultProps = {
  id: 1,
  options: [
    {
      value: 'html',
      label: 'HTML',
    },
    {
      value: 'javascript',
      label: 'Javascript',
    },
    {
      value: 'css',
      label: 'CSS',
    },
  ],
};

Select.propTypes = {
  options: PropTypes.array,
  id: PropTypes.any,
  onChange: PropTypes.func,
};

export { Select };
