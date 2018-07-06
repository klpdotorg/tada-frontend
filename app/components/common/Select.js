import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

const RenderOptions = (props) => {
  const { options, id, value } = props;

  if (!isEmpty(options)) {
    return (
      <ul className="dropdown-menu multi-select" id={`multiselect-dropdown${id}`}>
        {options.map((option, i) => {
          if (Number(value) === Number(option.value)) {
            return (
              <li className="selected-multiselect-item" key={i}>
                <a
                  onClick={() => {
                    props.handleChange(option.value);
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
                  props.handleChange(option.value);
                }}
              >
                <input type="radio" aria-label="..." checked={false} />
                <span>{option.label}</span>
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
          <input type="radio" aria-label="..." checked={false} />
          <span>Empty</span>
        </a>
      </li>
    </ul>
  );
};

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      id: Math.floor(Math.random() * (200 - 0 + 1)) + 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleDocumentClick);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
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
    this.setState({
      value: newVal,
    });
    if (this.props.onChange) {
      this.props.onChange(newVal);
    }
  }

  render() {
    const { value, id } = this.state;
    const { options } = this.props;
    const dropdownClassName = `show-multiSelect-dropdown${id}`;

    return (
      <div>
        <div className="dropdown">
          <button
            className={`btn btn-default dropdown-toggle ${dropdownClassName}`}
            type="button"
            data-toggle="dropdown"
            style={{ width: 110 }}
            onClick={this.toggleDropdown}
          >
            <span className={`multiselect-text ${dropdownClassName}`}>
              {!isEmpty(value) ? value : 'Select...'}
            </span>
            <span
              className={`caret ${dropdownClassName}`}
              style={{ float: 'right', marginTop: 9 }}
            />
          </button>
          <RenderOptions options={options} handleChange={this.handleChange} id={id} value={value} />
        </div>
      </div>
    );
  }
}

Select.defaultProps = {
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
  onChange: PropTypes.func,
  value: PropTypes.any,
};

RenderOptions.propTypes = {
  options: PropTypes.array,
  id: PropTypes.number,
  value: PropTypes.any,
};

export { Select };
