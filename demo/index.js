import React, { Component } from "react";
import ReactDOM from "react-dom";
import DataSheet from "../src/index";
import "../src/react-datasheet.css";
import SelectEditor from "../src/DataSelect";
import { fileData } from "./mock";
import {dictionarySaveData} from './analysisdictionary'

//添加行的数据结构第几行是下拉框则添加 dataEditor: SelectEditor的属性
const adddata = [
  { name: "", value: "", fieldId: "" },
  { name: "", value: "", fieldId: "" },
  { name: "", value: "", fieldId: "" },
  { name: "", value: "", fieldId: "" },
  { name: "", value: "", fieldId: "", dataEditor: SelectEditor }
];
//当前columns的属性
const columns = [
  { label: "属性", width: "20%" },
  { label: "单位", width: "20%" },
  { label: "数据过滤规则", width: "20%" },
  { label: "数据类型", width: "20%" },
  { label: "项目数据项", width: "20%" }
];
export default class App extends Component {
  //当增删改查时候与后台进行的数据交互
  saveDdata(data) {
    dictionarySaveData(data)
  console.log("与后台对接的数据",dictionarySaveData(data));
  }
  render() {
    const tables = fileData.dictList.map((testdata, i) => {
      const tabledata = testdata.fieldList.map(item =>
        item.fieldData.map(cell =>
          Object.assign(cell, { fieldId: item.fieldId })
        )
      );
      console.log(tabledata);
      //给每项添加readonly属性 不需要可以删除
      tabledata.map((a, i) =>
        a.map((cell, j) => Object.assign(cell, { readOnly: true }))
      );
      //第几列需要下拉框Object.assign(a[4], { dataEditor: SelectEditor })同时删除当前列的readonly属性
      tabledata.map(a => {
        delete a[4].readOnly;
        Object.assign(a[4], { dataEditor: SelectEditor });
      });
      return (
        <div style={{ margin: 50,width:0 }} key={testdata.dictId}>
          <DataSheet
            saveDdata={this.saveDdata.bind(this)}
            readonly={false}
            adddata={adddata}
            columns={columns}
            data={tabledata}
          />
        </div>
      );
    });

    return <div>{tables}</div>;
  }
}

// export default App;

ReactDOM.render(<App />, document.getElementById("app"));
