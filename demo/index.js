import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ComExcel from '../src/index';
import '../src/react-datasheet.css';
import SelectEditor from './Select';
import fileData from './mock';
import { dictionarySaveData } from './analysisdictionary';
// 添加行的数据结构第几行是下拉框则添加 dataEditor: SelectEditor的属性
const adddata = [
  { name: '', value: '', fieldId: '' },
  { name: '', value: '', fieldId: '' },
  { name: '', value: '', fieldId: '' },
  { name: '', value: '', fieldId: '' },
  {
    name: '',
    value: '',
    fieldId: '',
    render: config => (
      <SelectEditor
        options={[
          { id: 1, value: 1, label: '1' },
          { id: 2, value: 2, label: '2' },
          { id: 3, value: 3, label: '3' },
        ]}
        {...config}
        onChange={(data) => { console.log('select change', data); }}
      />
    ),
  },
];
// 当前columns的属性
const columns = [
  // { label: "属性", width: "20%", colSpan: 4 },
  // { label: "单位", width: "20%" },
  // { label: "属性", width: "20%", colSpan: 4 },
  // { label: "单位", width: "20%" },
  // { label: "属性", width: "20%", colSpan: 4 },
];
const colourOptions = [
  {
    value: '4859edb0b886420f9fb84a6ce85e617b',
    label: '4859edb0b886420f9fb84a6ce85e617b',
    dataSourceId: '4859edb0b886420f9fb84a6ce85e617b',
    type: 'MAXCOMPUTE',
  },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];
const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
];
const groupedOptions = [
  {
    label: 'Maxcompute',
    options: colourOptions,
  },
  {
    label: 'Datahub',
    options: flavourOptions,
  },
];
export default class App extends Component {
  // 当增删改查时候与后台进行的数据交互
  saveDdata = (data) => {
    // console.log(data.shift())
    // dictionarySaveData(data);
    console.log('与后台对接的数据', dictionarySaveData(data));
  }

  render() {
    const thData = [
      { value: '属性', readOnly: false },
      { value: '单位', readOnly: false },
      { value: '数据过滤规则', readOnly: false },
      { value: '数据类型', readOnly: false },
      {
        value: '',
        render: config => (
          <SelectEditor
            options={[
              { id: 1, value: 1, label: '1' },
              { id: 2, value: 2, label: '2' },
              { id: 3, value: 3, label: '3' },
            ]}
            {...config}
            onChange={(data) => { console.log('select change', data); }}
          />
        ),
      },
    ];
    const tables = fileData.dictList.map((dict) => {
      // 给每项添加readonly属性 不需要可以删除
      const tabledata = dict.fieldList.map(item => item.fieldData.map(cell => ({ ...cell, fieldId: item.fieldId, readOnly: false })));
      // 第几列需要下拉框Object.assign(a[4], { dataEditor: SelectEditor })同时删除当前列的readonly属性
      tabledata.map((item) => {
        delete item[4].readOnly;
        item[4] = { 
          ...item[4],
          render: config => (
            <SelectEditor
              options={[
                { id: 1, value: 1, label: '11' },
                { id: 2, value: 2, label: '22' },
                { id: 3, value: 3, label: '33' },
              ]}
              {...config}
              onChange={(data) => { console.log('select change', data); }}
            />
          ),  
        };
      });

      tabledata.unshift(thData);
      // 给数据添加表头
      // tabledata.splice(0,0,thData)
      // console.log(tabledata.splice(0,0,thData))

      console.log('tabledata', tabledata);

      return (
        <div style={{ margin: 50, width: 0 }} key={dict.dictId}>
          <ComExcel
            saveDdata={this.saveDdata}
            readonly={false}
            adddata={adddata}
            columns={columns}
            data={tabledata}
            selectData={groupedOptions}
          />
        </div>
      );
    });

    return <div>{tables}</div>;
  }
}

// export default App;

ReactDOM.render(<App />, document.getElementById('app'));
