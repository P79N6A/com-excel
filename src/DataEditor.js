import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DataEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._input.focus();
    this._input.onblur = () => {
      // console.log(e,"blur")
    };
  }

  handleChange(e) {
    const { onChange } = this.props;

    onChange(e.target.value);
  }

  render() {
    const { value, onKeyDown } = this.props;
    return (
      <input
        ref={(input) => { this._input = input; }}
        className="data-editor"
        value={value}
        onChange={this.handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
}

DataEditor.propTypes = {
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
};
