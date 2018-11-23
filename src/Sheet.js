import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Sheet extends PureComponent {
  render() {
    const { className, children } = this.props;

    return (
      <table className={className}>
        <tbody>
          {children}
        </tbody>
      </table>
    );
  }
}

Sheet.propTypes = {
  className: PropTypes.string,
};

Sheet.defaultProps = {
  className: '',
};

export default Sheet;
