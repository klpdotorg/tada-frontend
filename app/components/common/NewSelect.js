import React from 'react';
import Select from 'react-select';

class NewSelect extends React.Component {
  state = {
    selectedOption: 'one',
    selectedOption1: 'two',
    selectedOption2: 'one',
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };
  render() {
    const { selectedOption, selectedOption1, selectedOption2 } = this.state;

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Select
          name="form-field-name"
          style={{ width: 150, marginRight: 10 }}
          value={selectedOption}
          onChange={this.handleChange}
          options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
        />
        <Select
          name="form-field-name"
          style={{ width: 150, marginRight: 10 }}
          value={selectedOption1}
          onChange={(val) => {
            this.setState({
              selectedOption1: val.value,
            });
          }}
          options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
        />
        <Select
          name="form-field-name"
          value={selectedOption2}
          style={{ width: 150, marginRight: 10 }}
          onChange={(val) => {
            this.setState({
              selectedOption2: val.value,
            });
          }}
          options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]}
        />
      </div>
    );
  }
}

export { NewSelect };
