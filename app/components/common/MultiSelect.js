import React from 'react';
import PropTypes from 'prop-types';
import isEmtpy from 'lodash.isempty';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    window.onclick = (event) => {
      if (!event.target.matches(`.show-multiSelect-dropdown${this.props.id}`)) {
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
    const { value } = this.state;
    let updatedValue = [];
    if (value.includes(newVal)) {
      updatedValue = value.filter((item) => {
        return item !== newVal;
      });
    } else {
      updatedValue = [...value, ...[newVal]];
    }
    this.setState({
      value: updatedValue,
    });

    if (this.props.onChange) {
      this.props.onChange(updatedValue);
    }
  }

  render() {
    const { value } = this.state;
    const { options, id } = this.props;
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
            {!isEmtpy(value) ? value.join(',') : 'Select...'}
            <span className={`caret ${dropdownClassName}`} style={{ marginLeft: 5 }} />
          </button>
          <ul className="dropdown-menu multi-select" id={`multiselect-dropdown${id}`}>
            {options.map((option, i) => {
              if (this.state.value.includes(option.value)) {
                return (
                  <li className={`selected-multiselect-item ${dropdownClassName}`} key={i}>
                    <a
                      className={dropdownClassName}
                      onClick={() => {
                        this.handleChange(option.value);
                      }}
                    >
                      <input
                        className={dropdownClassName}
                        type="checkbox"
                        aria-label="..."
                        checked
                      />
                      <span className={dropdownClassName}>{option.label}</span>
                    </a>
                  </li>
                );
              }
              return (
                <li key={i} className={dropdownClassName}>
                  <a
                    className={dropdownClassName}
                    onClick={() => {
                      this.handleChange(option.value);
                    }}
                  >
                    <input
                      className={dropdownClassName}
                      type="checkbox"
                      aria-label="..."
                      checked={false}
                    />
                    <span className={dropdownClassName}>{option.label}</span>
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

MultiSelect.defaultProps = {
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

MultiSelect.propTypes = {
  options: PropTypes.array,
  id: PropTypes.any,
  onChange: PropTypes.func,
};

export { MultiSelect };
