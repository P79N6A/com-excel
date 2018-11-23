import React, { PureComponent } from 'react';
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
    const {
      className, columns, onColumnDrop, children 
    } = this.props;
    return (
      <table className={className}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <Header
                key={col.label}
                col={col}
                columnIndex={index}
                onColumnDrop={onColumnDrop}
              />
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
  }
}

const RowRenderer = (props) => {
  const {
    isOver, children, length, readonly, rowIndex, spanIndex
  } = props;

  const className = isOver ? 'drop-target' : '';
  return (
    <tr className={className}>
      {children}
      {length > 1 ? (
        <td className="delete-td">
          {readonly ? null : rowIndex === 0 ? null : (
            <span
              onClick={(event) => {
                event.stopPropagation();
                props.delete(props.rowIndex);
                props.testdelete();
              }}
              className={`span${rowIndex} icon-delete`}
              style={{
                display: spanIndex === rowIndex ? 'block' : 'none',
                cursor: 'pointer',
                transform: 'translate(5px, 6px)'
              }}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAG1BMVEVHcEwzMzMyMjIyMjIxMTEwMDAyMjIxMTEzMzM6ZpKMAAAACHRSTlMArIDjOEBxcosCR0UAAACvSURBVGje7dhLCoMwFEBRRWmmpuACqnQursAtWHDuEroMl+0rtagYP6mCH+4dBRMOQh4IOg5dMlVNVAKcBLjJubAwlFu8QWDacAEAAGYAFXV7yLk0MhTLxr335Md51Z8lANsBauyajHWuuRwOynvFoC0dVQALQL6G2Xfly9Ie8NtB+QxaBgAAAAAAAAAAAAAAAAAAcD1Aa92cc2VpD/ATZj/gWcz2mgQWBnBcgM5bDat8G9WomUJ0AAAAAElFTkSuQmCC"
                alt=""
              />
            </span>
          )}
        </td>
      ) : null}
    </tr>
  );
};
const defaultData = [
  [
    {
      name: 'attribute',
      value: ''
    },
    {
      name: 'unit',
      value: ''
    },
    {
      name: 'filterRule',
      value: ''
    },
    {
      name: 'fieldType',
      value: ''
    },
    {
      name: 'fieldType',
      value: ''
    }
  ]
];
class CustomRenderSheet extends PureComponent {
  constructor(props) {
    super(props);

    const { columns, data } = this.props;

    this.state = {
      columns,
      grid: data || defaultData
    };

    this.handleColumnDrop = this.handleColumnDrop.bind(this);
    this.handleRowDrop = this.handleRowDrop.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.renderSheet = this.renderSheet.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }


  componentDidMount() {
    const { grid } = this.state;

    grid.map(a => a.map((cell) => {
      if (Object.keys(cell).indexOf('dataEditor') > -1) {
        delete cell.dataEditor;
        Object.assign(cell, { select: '' });
      }
    }));
  }

  handleColumnDrop(from, to) {
    const { columns, grid } = this.state;

    columns.splice(to, 0, ...columns.splice(from, 1));
    const newGrid = grid.map((r) => {
      const row = [...r];
      row.splice(to, 0, ...row.splice(from, 1));
      return row;
    });
    this.setState({ columns, grid: newGrid });
  }

  handleRowDrop(from, to) {
    const { grid } = this.state;
    grid.splice(to, 0, ...grid.splice(from, 1));
    this.setState({ grid });
  }

  handleChanges(changes) {
    let { grid } = this.state;
    grid = grid.map(row => [...row]);
    changes.forEach(({
      row, col, value 
    }) => {
      if (grid[row] && grid[row][col]) {
        grid[row][col] = { ...grid[row][col], value };
      }
    });
    console.log('changes', changes);

    const { saveDdata } = this.props;

    this.setState({ grid }, () => {
      if (changes.length > 0) {
        const { grid: newGrid } = this.state;
        changes[0].row ? saveDdata(newGrid) : null;
      }
    });
  }

  // 增加一行
  addrow = () => {
    const { grid } = this.state;
    const { adddata, saveDdata } = this.props;
    adddata.map((item) => {
      if (Object.keys(item).indexOf('dataEditor') > -1) {
        delete item.dataEditor;
        Object.assign(item, { select: '' });
      }
    });
    this.setState(
      {
        // 使用 ... 解构赋值，避免每一行新增data都指向同一个对象
        grid: [...grid, [...adddata]]
      },
      () => {
        const { grid: newGrid } = this.state;
        saveDdata(newGrid);
      }
    );
  }

  // 校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构
  checkDataType = (i, j) => {
    const { grid } = this.state;
    const select = Object.keys(grid[i][j]).indexOf('dataEditor') > -1;

    if (select) {
      grid[i][j] = { name: '', value: '', select: '' };
    }
  }

  // 校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构
  checkDataTypeSelect = (i, j) => {
    const { grid } = this.state;
    const oldValue = grid[i][j].value;
    if (Object.keys(grid[i][j]).indexOf('select') > -1) {
      grid[i][j] = { name: '2', value: oldValue, dataEditor: 'SelectEditor' };
      // grid[i][j] = { name: '2', value: oldValue, select: '' };
    }
  }

  delete = (i) => {
    const { grid } = this.state;
    const { saveDdata } = this.props;
    grid.splice(i, 1);
    // 通过props的回调函数保存数据数据
    saveDdata(grid);
  }

  renderSheet(props) {
    const { columns } = this.state;

    return (
      <SheetRenderer
        columns={columns}
        onColumnDrop={this.handleColumnDrop}
        {...props}
      />
    ); // 表格头部
  }

  renderRow(props) {
    const { grid } = this.state;
    const { row, cells, ...rest } = props;
    return (
      <RowRenderer
        length={grid.length}
        delete={this.delete}
        onRowDrop={this.handleRowDrop}
        rowIndex={row}
        {...rest}
      />
    );
  }

  render() {
    const { grid, columns } = this.state;
    const { readonly } = this.props;
    return (
      <DataSheet
        // selectData={this.props.selectData}
        data={grid}
        addrow={this.addrow}
        checktype={this.checkDataType}
        checkSelect={this.checkDataTypeSelect}
        valueRenderer={cell => cell.value}
        sheetRenderer={this.renderSheet}
        rowRenderer={this.renderRow}
        onCellsChanged={this.handleChanges}
        columnslenth={columns.length}
        readonly={readonly}
      />
    );
  }
}

export default CustomRenderSheet;
