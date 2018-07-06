import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

const RenderOptions = (props) => {
  const { options, id, value, dropdownClassName } = props;

  if (!isEmpty(options)) {
    return (
      <ul className="dropdown-menu multi-select" id={`multiselect-dropdown${id}`}>
        {options.map((option, i) => {
          if (value.includes(option.value)) {
            return (
              <li className={`selected-multiselect-item ${dropdownClassName}`} key={i}>
                <a
                  className={dropdownClassName}
                  onClick={() => {
                    props.handleChange(option.value);
                  }}
                >
                  <input className={dropdownClassName} type="checkbox" aria-label="..." checked />
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
                  props.handleChange(option.value);
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
    );
  }

  return (
    <ul className="dropdown-menu multi-select" id={`multiselect-dropdown${id}`}>
      <li className="disabled">
        <a>
          <input type="checkbox" aria-label="..." checked={false} />
          <span>Empty</span>
        </a>
      </li>
    </ul>
  );
};

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || [],
      id: Math.floor(Math.random() * (200 - 0 + 1)) + 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick, false);
  }

  handleDocumentClick() {
    if (!event.target.matches(`.show-multiSelect-dropdown${this.state.id}`)) {
      const el = document.getElementById(`multiselect-dropdown${this.state.id}`);
      if (el && el.classList.contains('show')) {
        el.classList.remove('show');
      }
    }
  }

  toggleDropdown() {
    const el = document.getElementById(`multiselect-dropdown${this.state.id}`);
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
    const { value, id } = this.state;
    const { options } = this.props;
    const dropdownClassName = `show-multiSelect-dropdown${id}`;

    return (
      <div>
        <div className="dropdown" id={`test${id}`}>
          <button
            className={`btn btn-default dropdown-toggle ${dropdownClassName}`}
            type="button"
            data-toggle="dropdown"
            style={{ width: 110 }}
            onClick={this.toggleDropdown}
          >
            <span className={`multiselect-text ${dropdownClassName}`}>
              {!isEmpty(value) ? value.join(',') : 'Select...'}
            </span>
            <span
              className={`caret ${dropdownClassName}`}
              style={{ float: 'right', marginTop: 9 }}
            />
          </button>
          <RenderOptions
            options={options}
            handleChange={this.handleChange}
            id={id}
            dropdownClassName={dropdownClassName}
            value={value}
          />
        </div>
      </div>
    );
  }
}

MultiSelect.defaultProps = {
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

RenderOptions.propTypes = {
  options: PropTypes.array,
  id: PropTypes.number,
  value: PropTypes.any,
  dropdownClassName: PropTypes.string,
};

MultiSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export { MultiSelect };
