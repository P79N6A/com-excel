import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CellShape from './CellShape';

export default class Cell extends PureComponent {
  render() {
    const {
      cell, row, col, attributesRenderer,
      className, style, onMouseDown, onMouseOver, onClick, onDoubleClick, onContextMenu, children
    } = this.props;

    const { colSpan, rowSpan } = cell;
    const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};

    return (
      <td
        className={className}
        onFocus={() => {}}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
        onClick={onClick}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={style}
        {...attributes}
      >
        {children}
      </td>
    );
  }
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Cell.defaultProps = {
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: () => {},
  className: '',
  style: {}
};
