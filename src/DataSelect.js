import React, { PureComponent, Children } from 'react';
import Select from 'react-select';
import { ENTER_KEY, TAB_KEY } from './keys';

export default class SelectEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      type: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange(opt) {
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
  
  handleKeyDown(e) {
    // record last key pressed so we can handle enter
    if (e.which === ENTER_KEY || e.which === TAB_KEY) {
      e.persist();
      this.setState({ e });
    } else {
      this.setState({ e: null });
    }
  }
  
  render() {
    return (
       
      <Select
          // autoFocus
          // openOnFocus
          // closeOnSelect
        value={this.props.value}
        onChange={this.handleChange}
         
          // onInputKeyDown={this.handleKeyDown}
        options={this.props.selectData}
      />

    );
  }
}
