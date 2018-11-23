import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { 
  ENTER_KEY, ESCAPE_KEY, TAB_KEY, RIGHT_KEY, LEFT_KEY, UP_KEY, DOWN_KEY 
} from './keys';

import Cell from './Cell';
import CellShape from './CellShape';
import DataEditor from './DataEditor';
import ValueViewer from './ValueViewer';
import { renderValue, renderData } from './renderHelpers';

function initialData({
  cell, row, col, valueRenderer, dataRenderer
}) {
  return renderData(cell, row, col, valueRenderer, dataRenderer);
}

function initialValue({
  cell, row, col, valueRenderer
}) {
  return renderValue(cell, row, col, valueRenderer);
}

function widthStyle(cell) {
  const width = typeof cell.width === 'number' ? `${cell.width}px` : cell.width;
  return width ? { width } : null;
}

export default class DataCell extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCommit = this.handleCommit.bind(this);
    this.handleRevert = this.handleRevert.bind(this);

    this.handleKey = this.handleKey.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      reverting: false, value: '', committing: false 
    };
  }

  selectType = (type) => {
    console.log(type, 'selectType');
  }

  componentWillReceiveProps(nextProps) {
    const { editing } = this.props;

    if (initialValue(nextProps) !== initialValue(this.props)) {
      // this.setState({updated: true})
      // this.timeout = setTimeout(() => this.setState({ updated: false }), 700);
    }
    if (nextProps.editing === true && editing === false) {
      const value = nextProps.clearing ? '' : initialData(nextProps);
      this.setState({ value, reverting: false });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      editing, onChange, row, col 
    } = this.props;
    const { reverting, committing, value } = this.state;

    if (prevProps.editing === true
        && editing === false
        && !reverting
        && !committing
        && value !== initialData(this.props)) {
      onChange(row, col, value);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleChange(value) {
    this.setState({ value, committing: false });
  }

  handleCommit(value, e, opt) {
    const {
      onChange, onNavigate, row, col 
    } = this.props;
    if (value !== initialData(this.props)) {
      this.setState({ value, committing: true });
      onChange(row, col, value, opt);
    } else {
      this.handleRevert();
    }
    if (e) {
      e.preventDefault();
      onNavigate(e, true);
    }
  }

  handleRevert() {
    const { onRevert } = this.props;
    this.setState({ reverting: true });
    onRevert();
  }

  handleMouseDown() {
    const { 
      row, col, onMouseDown, cell 
    } = this.props;
    if (!cell.disableEvents) {
      onMouseDown(row, col);
    }
  }

  handleMouseOver() {
    const {
      row, col, onMouseOver, cell
    } = this.props;
    if (!cell.disableEvents) {
      onMouseOver(row, col);
    }
  }

  handleDoubleClick() {
    const { 
      row, col, onDoubleClick, cell 
    } = this.props;
    if (!cell.disableEvents) {
      onDoubleClick(row, col);
    }
  }

  handleClick() {
    const {
      row, col, onClick, cell
    } = this.props;
    if (!cell.disableEvents) {
      onClick(row, col);
    }
  }

  handleContextMenu(e) {
    const { 
      row, col, onContextMenu, cell 
    } = this.props;
    if (!cell.disableEvents) {
      onContextMenu(e, row, col);
    }
  }

  handleKey(e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === ESCAPE_KEY) {
      return this.handleRevert();
    }
    const { cell: { component }, forceEdit } = this.props;
    const { value } = this.state;

    const eatKeys = forceEdit || !!component;
    const commit = keyCode === ENTER_KEY || keyCode === TAB_KEY
      || (!eatKeys && [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY].includes(keyCode));
    if (commit) {
      this.handleCommit(value, e);
    }
  }

  renderComponent(editing, cell) {
    const { component, readOnly, forceComponent } = cell;
    if ((editing && !readOnly) || forceComponent) {
      return component;
    }
  }

  renderEditor(editing, cell, row, col, dataEditor) {
    if (editing) {
      const Editor = cell.dataEditor || dataEditor || DataEditor;

      const { forceEdit } = this.props;
      const { value } = this.state;

      if (cell.render && forceEdit) { // forceEdit，是否触发自定义编辑组件渲染 ？
        return cell.render({
          onCommit: this.handleCommit,
          onChange: this.handleChange,
          onRevert: this.handleRevert,
          onKeyDown: this.handleKey
        });
      } 
      return (
        <Editor
          cell={cell}
          row={row}
          selectType={this.selectType}
          col={col}
          value={value}
          onChange={this.handleChange}
          onCommit={this.handleCommit}
          onRevert={this.handleRevert}
          onKeyDown={this.handleKey}
          // selectData={this.props.selectData}
        />
      );
    }
  }

  renderViewer(cell, row, col, valueRenderer, valueViewer) {
    const Viewer = cell.valueViewer || valueViewer || ValueViewer;
    const value = renderValue(cell, row, col, valueRenderer);
    return <Viewer cell={cell} row={row} col={col} value={value} />;
  }

  render() {
    const { 
      row, col, cell, cellRenderer: CellRenderer,
      valueRenderer, dataEditor, valueViewer, attributesRenderer,
      selected, editing, onKeyUp 
    } = this.props;
    // const {updated} = this.state

    const content = this.renderComponent(editing, cell)
        || this.renderEditor(editing, cell, row, col, dataEditor)
        || this.renderViewer(cell, row, col, valueRenderer, valueViewer);

    const className = [
      cell.className,
      'cell', cell.overflow,
      selected && 'selected',
      editing && 'editing',
      cell.readOnly && 'read-only',
      // updated && 'updated'
    ].filter(a => a).join(' ');

    return (
      <CellRenderer
        row={row}
        col={col}
        cell={cell}
        selected={selected}
        editing={editing}
        // updated={updated}
        attributesRenderer={attributesRenderer}
        className={className}
        style={widthStyle(cell)}
        onFocus={() => 0} // 解决 mouse-events-have-key-events eslint 报错
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onDoubleClick={this.handleDoubleClick}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
        onKeyUp={onKeyUp}
      >
        {content}
      </CellRenderer>
    );
  }
}

DataCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  forceEdit: PropTypes.bool,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  clearing: PropTypes.bool,
  cellRenderer: PropTypes.func,
  valueRenderer: PropTypes.func.isRequired,
  valueViewer: PropTypes.func,
  dataEditor: PropTypes.func,
  attributesRenderer: PropTypes.func,
  onNavigate: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired
};

DataCell.defaultProps = {
  forceEdit: false,
  selected: false,
  editing: false,
  clearing: false,
  cellRenderer: Cell,
  valueViewer: () => {},
  dataEditor: () => {},
  attributesRenderer: () => {},
};
