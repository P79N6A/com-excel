import React from 'react';
import Select from 'react-select';

export default class SelectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (opt) => {
    if (this.props.row === 0) {
      console.log('我此时请求数据', opt);
      this.props.selectType(opt.value);
    }
    const { onCommit, onRevert } = this.props;

    if (!opt) {
      return onRevert();
    }
    const { e } = this.state;
    onCommit(opt.value, e, opt);
    console.log('COMMITTED', opt);
  }
  
  // handleKeyDown(e) {
  //   // record last key pressed so we can handle enter
  //   if (e.which === ENTER_KEY || e.which === TAB_KEY) {
  //     e.persist();
  //     this.setState({ e });
  //   } else {
  //     this.setState({ e: null });
  //   }
  // }
  
  render() {
    const { options, value } = this.props;

    return (
      <Select
        // autoFocus
        // openOnFocus
        // closeOnSelect
        value={value}
        onChange={this.handleChange}
        // onInputKeyDown={this.handleKeyDown}
        options={options}
      />
    );
  }
}
