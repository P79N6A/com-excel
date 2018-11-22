import React, { PureComponent, Children } from 'react'
import Select from 'react-select'
import {ENTER_KEY, TAB_KEY} from './keys'
export default  class SelectEditor extends PureComponent {
    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleKeyDown = this.handleKeyDown.bind(this)
      this.state = {}
    }
  
    handleChange (opt) {
      const {onCommit, onRevert} = this.props
      if (!opt) {
        return onRevert()
      }
      const { e } = this.state
      onCommit(opt.value, e)
      // console.log('COMMITTED', opt.value)
    }
  
    handleKeyDown (e) {
      // record last key pressed so we can handle enter
      if (e.which === ENTER_KEY || e.which === TAB_KEY) {
        e.persist()
        this.setState({ e })
      } else {
        this.setState({ e: null })
      }
    }
  
    render () {
      return (
        <Select
          autoFocus
          openOnFocus
          // closeOnSelect
          value={this.props.value}
          onChange={this.handleChange}
          onInputKeyDown={this.handleKeyDown}
          options={[
            {label: '设备1', value: "设备1"},
            {label: '设备2', value: "设备2"},
            {label: '设备3', value: "设备3"},
            {label: '设备4', value: "设备4"},
            {label: '设备5', value: "设备5"}
          ]}
        />
      )
    }
  }