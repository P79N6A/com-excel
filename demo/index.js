import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataSheet from '../src/index';
import '../src/react-datasheet.css';
import SelectEditor from '../src/DataSelect'
const data = [
  [{ name: '',value:""}, { name: '',value:""},  { name: '', value:"",dataEditor: SelectEditor }, { name: '',value:"", dataEditor: SelectEditor }], 
];
const adddata = 
  [{ name: '',value:""}, { name: '',value:""},   { name: '', value:"",select: "" }, { name: '', value:"",select: "" }];

const columns = [
     { label: 'Style', width: '25%' },
   { label: 'IBUs', width: '25%' },
   { label: 'Color (SRM)', width: '25%' },
    { label: 'Rating', width: '25%' }
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
