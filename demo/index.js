import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataSheet from '../src/index';
import '../src/react-datasheet.css';
import SelectEditor from '../src/DataSelect'
const data = [
  [{ name: '',value:"a"}, { name: '',value:"b"},  { name: '', value:"c",dataEditor: SelectEditor }, { name: '',value:"d", dataEditor: SelectEditor }], 
];
const adddata = 
  [{ name: '',value:"default1"}, { name: '',value:"default2"},   { name: '', value:"",select: "" }, { name: '', value:"default5",select: "" }];

const columns = [
     { label: 'col1', width: '25%' },
   { label: 'col2', width: '25%' },
   { label: 'col3 (SRM)', width: '25%' },
    { label: 'col4', width: '25%' }
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
