import React from 'react'
import 'react-select/dist/react-select.css'
import  './src/react-datasheet.css'
import {CustomRendererSheet} from './examples/index';

export default class App extends React.Component {
  render () {
    return (
          <div className={'sheet-container'}>
            <CustomRendererSheet />
          </div>
     
    )
  }
}