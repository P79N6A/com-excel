import React, { PureComponent } from 'react';
import SelectEditor from './DataSelect';
import DataSheet from './DataSheet';

const Header = (props) => {
	const { col, isOver } = props;
	const className = isOver ? 'cell read-only drop-target' : 'cell read-only';
	return (
		<th className={className} style={{ width: col.width }}>
			{col.label}
		</th>
	);
};

class SheetRenderer extends PureComponent {
	render() {
		const { className, columns, onColumnDrop } = this.props;
		return (
			<table className={className}>
				<thead>
					<tr>
						{columns.map((col, index) => (
							<Header key={col.label} col={col} columnIndex={index} onColumnDrop={onColumnDrop} />
						))}
					</tr>
				</thead>
				<tbody>{this.props.children}</tbody>
			</table>
		);
	}
}

const RowRenderer = (props) => {
	const { isOver, children } = props;
	const className = isOver ? 'drop-target' : '';
	return (
		<tr className={className}>
			{children}
			{props.length > 1 ? (
        <td className="delete-td">
				<span
					onClick={(event) => {
						event.stopPropagation();
						props.delete(props.rowIndex);
						props.testdelete();
					}}
					className={`span${props.rowIndex} iconfont icon-shanchu icon-delete`}
					style={{
						display: props.spanIndex === props.rowIndex ? 'block' : 'none',
						fontSize: 14,
						cursor: 'pointer',
						transform: 'translate(5px, 8px)'
					}}
				/>
        </td>
			) : null}
		</tr>
	);
};

const FillViewer = (props) => {
	const { value } = props;
	return (
		<div style={{ width: '100%' }}>
			{[ 1, 2, 3, 4, 5 ].map((v) => {
				const backgroundColor = v > value ? 'transparent' : '#007eff';
				return <div key={v} style={{ float: 'left', width: '20%', height: '17px', backgroundColor }} />;
			})}
		</div>
	);
};

class CustomRenderSheet extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      columns: this.props.columns,
      grid: this.props.data
    }
    
    this.handleColumnDrop = this.handleColumnDrop.bind(this)
    this.handleRowDrop = this.handleRowDrop.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.renderSheet = this.renderSheet.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }
  handleColumnDrop (from, to) {
    const columns = [...this.state.columns]
    columns.splice(to, 0, ...columns.splice(from, 1))
    const grid = this.state.grid.map(r => {
      const row = [...r]
      row.splice(to, 0, ...row.splice(from, 1))
      return row
    })
    this.setState({ columns, grid })
  }
  componentDidMount(){
  this.state.grid.map((a, i) => a.map((cell, j) => {
      if(Object.keys(cell).indexOf("dataEditor")>-1){
        delete cell.dataEditor
        Object.assign(cell, {select: ``})
      }
    }))
    console.log(this.state.grid);
  }
  handleRowDrop (from, to) {
    const grid = [ ...this.state.grid ]
    grid.splice(to, 0, ...grid.splice(from, 1))
    this.setState({ grid })
  }

  handleChanges (changes) {
    console.log('handleChanges', changes);
    const grid = this.state.grid.map(row => [...row])
    changes.forEach(({cell, row, col, value}) => {
      if (grid[row] && grid[row][col]) {
        grid[row][col] = {...grid[row][col], value}
      }
    })
    this.setState({grid})
  }
  //增加一行
  addrow (){
    const { grid } =  this.state;
    // grid.map((a, i) => a.map((cell, j) => {
    //   if(Object.keys(cell).indexOf("dataEditor")>-1){
    //     delete cell.dataEditor
    //     Object.assign(cell, {select: ``})
    //   }
    // }))
    console.log("addrow",grid);
 this.props.adddata.map(item =>{
    if(Object.keys(item).indexOf("dataEditor")>-1){
      delete item.dataEditor
      Object.assign(item, {select: ``})
    }
  })
     this.setState({
      grid:[...grid,this.props.adddata]
     })
  }
  //校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构
  checkDataType (i,j){
    const { grid } = this.state  
    const select = Object.keys(grid[i][j]).indexOf("dataEditor") >-1 ? true : false
    console.log(Object.keys(grid[i][j]));
    if(select){
      grid[i][j] = {name:"",value:"",select:""}
    }
  }
  //校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构
  checkDataTypeSelect (i,j){
    const { grid } = this.state  
    const select = Object.keys(grid[i][j]).indexOf("select") >-1 ? true : false
    if(select){
      grid[i][j] = {name:"",value:"",dataEditor:SelectEditor}
    }
  }
  delete(i){
    const {grid} = this.state
    grid.splice(i,1)
  }
  renderSheet (props) {
    return <SheetRenderer columns={this.state.columns} onColumnDrop={this.handleColumnDrop} {...props} />//表格头部
  }

	renderRow(props) {
		const { row, cells, ...rest } = props;
		return (
			<RowRenderer
				length={this.state.grid.length}
				delete={this.delete.bind(this)}
				onRowDrop={this.handleRowDrop}
				rowIndex={row}
				{...rest}
			/>
		);
	}

	render() {
		const { grid, columns } = this.state;
		return (
			<DataSheet
				data={grid}
				addrow={this.addrow.bind(this)}
				checktype={this.checkDataType.bind(this)}
				checkSelect={this.checkDataTypeSelect.bind(this)}
				valueRenderer={(cell) => cell.value}
				sheetRenderer={this.renderSheet}
				rowRenderer={this.renderRow}
				onCellsChanged={this.handleChanges}
				columnslenth={columns.length}
			/>
		);
	}
}

export default CustomRenderSheet;