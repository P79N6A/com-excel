import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataSheet from '../src/index';
import '../src/react-datasheet.css';
import SelectEditor from '../src/DataSelect'
import {fileData} from './mock'
let testdata = fileData.dictList.map(dictList => dictList.fieldList.map(item => {return item.fileData}))
  console.log(testdata)
const data = [
  [{ name: '',value:"a"}, { name: '',value:"b"},  { name: '', value:"c"},{ name: '', value:"c" }, { name: '',value:"d", dataEditor: SelectEditor }], 
];
const adddata = 
  [{ name: '',value:""}, { name: '',value:""},   { name: '', value:"" }, { name: '', value:""},{ name: '', value:"",dataEditor: SelectEditor }];

const columns = [
     { label: 'col1', width: '25%' },
   { label: 'col2', width: '25%' },
   { label: 'col3 (SRM)', width: '25%' },
    { label: 'col4', width: '25%' },
    { label: 'col5', width: '25%' }
 ];
const App = () => {
  return (
    <div>
      <DataSheet adddata = {adddata} columns = {columns}  data = {data} />
    </div>
  );
};

// export default App;

ReactDOM.render(<App />, document.getElementById("app"));
