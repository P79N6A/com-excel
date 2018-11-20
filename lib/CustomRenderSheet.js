'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DataSelect = require('./DataSelect');

var _DataSelect2 = _interopRequireDefault(_DataSelect);

var _DataSheet = require('./DataSheet');

var _DataSheet2 = _interopRequireDefault(_DataSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { DragDropContextProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'


// import {
//   colDragSource, colDropTarget,
//   rowDragSource, rowDropTarget
// } from './drag-drop.js'

// const Header = colDropTarget(colDragSource((props) => {
//   const { col, connectDragSource, connectDropTarget, isOver } = props
//   const className = isOver ? 'cell read-only drop-target' : 'cell read-only'
//   return connectDropTarget(
//     connectDragSource(
//       <th className={className} style={{ width: col.width }}>{col.label}</th>
//     ))
// }))

var Header = function Header(props) {
  var col = props.col,
      isOver = props.isOver;

  var className = isOver ? 'cell read-only drop-target' : 'cell read-only';
  return _react2.default.createElement(
    'th',
    { className: className, style: { width: col.width } },
    col.label
  );
};

var SheetRenderer = function (_PureComponent) {
  _inherits(SheetRenderer, _PureComponent);

  function SheetRenderer() {
    _classCallCheck(this, SheetRenderer);

    return _possibleConstructorReturn(this, (SheetRenderer.__proto__ || Object.getPrototypeOf(SheetRenderer)).apply(this, arguments));
  }

  _createClass(SheetRenderer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          columns = _props.columns,
          onColumnDrop = _props.onColumnDrop;

      return _react2.default.createElement(
        'table',
        { className: className },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement('th', { className: 'cell read-only row-handle', key: '$$actionCell' }),
            columns.map(function (col, index) {
              return _react2.default.createElement(Header, { key: col.label, col: col, columnIndex: index, onColumnDrop: onColumnDrop });
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          this.props.children
        )
      );
    }
  }]);

  return SheetRenderer;
}(_react.PureComponent);

// const RowRenderer = rowDropTarget(rowDragSource((props) => {
//   const { isOver, children, connectDropTarget, connectDragPreview, connectDragSource } = props;
//   const className = isOver ? 'drop-target' : ''
//   return connectDropTarget(connectDragPreview(
//     <tr className={className}>
//       { connectDragSource(<td className='cell read-only row-handle' key='$$actionCell' />)}
//       { children }{props.length > 1 ?<span 
//        onClick = {(event) =>{
//       event.stopPropagation();
//       props.delete(props.rowIndex) 
//       props.testdelete()
//       }} 
//       className = {`span${props.rowIndex}`}
//       style = {{display: props.spanIndex === props.rowIndex ? "block" :"none",fontSize:12,cursor:"pointer"}}>delete</span>: null}
//     </tr>
//   ))
// }))

var RowRenderer = function RowRenderer(props) {
  var isOver = props.isOver,
      children = props.children;

  var className = isOver ? 'drop-target' : '';
  return _react2.default.createElement(
    'tr',
    { className: className },
    _react2.default.createElement('td', { className: 'cell read-only row-handle', key: '$$actionCell' }),
    children,
    _react2.default.createElement(
      'td',
      null,
      props.length > 1 ? _react2.default.createElement(
        'span',
        {
          onClick: function onClick(event) {
            event.stopPropagation();
            props.delete(props.rowIndex);
            props.testdelete();
          },
          className: 'span' + props.rowIndex,
          style: { display: props.spanIndex === props.rowIndex ? "block" : "none", fontSize: 12, cursor: "pointer" } },
        'delete'
      ) : null
    )
  );
};

var FillViewer = function FillViewer(props) {
  var value = props.value;

  return _react2.default.createElement(
    'div',
    { style: { width: '100%' } },
    [1, 2, 3, 4, 5].map(function (v) {
      var backgroundColor = v > value ? 'transparent' : '#007eff';
      return _react2.default.createElement('div', { key: v, style: { float: 'left', width: '20%', height: '17px', backgroundColor: backgroundColor } });
    })
  );
};

var CustomRenderSheet = function (_PureComponent2) {
  _inherits(CustomRenderSheet, _PureComponent2);

  function CustomRenderSheet(props) {
    _classCallCheck(this, CustomRenderSheet);

    var _this2 = _possibleConstructorReturn(this, (CustomRenderSheet.__proto__ || Object.getPrototypeOf(CustomRenderSheet)).call(this, props));

    _this2.state = {
      columns: [{ label: 'Style', width: '25%' }, { label: 'IBUs', width: '25%' }, { label: 'Color (SRM)', width: '25%' }, { label: 'Rating', width: '25%' }],
      grid: [[{ name: '', value: "" }, { name: '', value: "" }, { name: '', value: "" }, { nn: '111', dataEditor: _DataSelect2.default }], [{ name: '', value: "" }, { name: '', value: "" }, { name: '', value: "" }, { nn: '111', dataEditor: _DataSelect2.default }]]
      // .map((a, i) => a.map((cell, j) => Object.assign(cell, {key: `${i}-${j}`})))

      // console.log(this.state.grid,'grid')

    };_this2.handleColumnDrop = _this2.handleColumnDrop.bind(_this2);
    _this2.handleRowDrop = _this2.handleRowDrop.bind(_this2);
    _this2.handleChanges = _this2.handleChanges.bind(_this2);
    _this2.renderSheet = _this2.renderSheet.bind(_this2);
    _this2.renderRow = _this2.renderRow.bind(_this2);
    return _this2;
  }

  _createClass(CustomRenderSheet, [{
    key: 'handleColumnDrop',
    value: function handleColumnDrop(from, to) {
      var columns = [].concat(_toConsumableArray(this.state.columns));
      columns.splice.apply(columns, [to, 0].concat(_toConsumableArray(columns.splice(from, 1))));
      var grid = this.state.grid.map(function (r) {
        var row = [].concat(_toConsumableArray(r));
        row.splice.apply(row, [to, 0].concat(_toConsumableArray(row.splice(from, 1))));
        return row;
      });
      this.setState({ columns: columns, grid: grid });
    }
  }, {
    key: 'handleRowDrop',
    value: function handleRowDrop(from, to) {
      var grid = [].concat(_toConsumableArray(this.state.grid));
      grid.splice.apply(grid, [to, 0].concat(_toConsumableArray(grid.splice(from, 1))));
      this.setState({ grid: grid });
    }
  }, {
    key: 'handleChanges',
    value: function handleChanges(changes) {
      console.log('handleChanges', changes);
      var grid = this.state.grid.map(function (row) {
        return [].concat(_toConsumableArray(row));
      });
      changes.forEach(function (_ref) {
        var cell = _ref.cell,
            row = _ref.row,
            col = _ref.col,
            value = _ref.value;

        if (grid[row] && grid[row][col]) {
          grid[row][col] = _extends({}, grid[row][col], { value: value });
        }
      });
      this.setState({ grid: grid });
    }
    //增加一行

  }, {
    key: 'addrow',
    value: function addrow() {
      var grid = this.state.grid;

      var newData = [{ value: '' }, { value: '' }, { value: '' }, { value: '', dataEditor: _DataSelect2.default }];
      this.setState({
        grid: [].concat(_toConsumableArray(grid), [newData])
      });
    }
    //校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构

  }, {
    key: 'checkDataType',
    value: function checkDataType(i, j) {
      console.log(i, j);
      var grid = this.state.grid;

      var select = Object.keys(grid[i][j]).indexOf("dataEditor") === 1 ? true : false;
      if (select) {
        console.log(grid[i][j]);
        grid[i][j] = { name: "", value: "" };
      }
    }
    //校验数据格式遇到下拉框单击文本框双击下拉框实现形式改变数据结构

  }, {
    key: 'checkDataTypeSelect',
    value: function checkDataTypeSelect(i, j) {
      console.log(i, j);
      var grid = this.state.grid;

      var select = Object.keys(grid[i][j]).indexOf("dataEditor") === 1 ? true : false;
      if (select) {
        console.log(grid[i][j]);
        grid[i][j] = { name: "", value: "" };
      }
    }
  }, {
    key: 'delete',
    value: function _delete(i) {
      var grid = this.state.grid;

      grid.splice(i, 1);
      console.log(grid);
    }
  }, {
    key: 'renderSheet',
    value: function renderSheet(props) {
      return _react2.default.createElement(SheetRenderer, _extends({ columns: this.state.columns, onColumnDrop: this.handleColumnDrop }, props)); //表格头部
    }
  }, {
    key: 'renderRow',
    value: function renderRow(props) {
      var row = props.row,
          cells = props.cells,
          rest = _objectWithoutProperties(props, ['row', 'cells']);

      return _react2.default.createElement(RowRenderer, _extends({ length: this.state.grid.length, 'delete': this.delete.bind(this), onRowDrop: this.handleRowDrop, rowIndex: row }, rest));
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          grid = _state.grid,
          columns = _state.columns;

      return (
        // <DragDropContextProvider backend={HTML5Backend}>
        _react2.default.createElement(_DataSheet2.default, {
          data: grid,
          addrow: this.addrow.bind(this),
          checktype: this.checkDataType.bind(this),
          valueRenderer: function valueRenderer(cell) {
            return cell.value;
          },
          sheetRenderer: this.renderSheet,
          rowRenderer: this.renderRow,
          onCellsChanged: this.handleChanges,
          columnslenth: columns.length
        })
        // </DragDropContextProvider>


      );
    }
  }]);

  return CustomRenderSheet;
}(_react.PureComponent);

exports.default = CustomRenderSheet;