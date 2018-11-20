'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectEditor = function (_PureComponent) {
  _inherits(SelectEditor, _PureComponent);

  function SelectEditor(props) {
    _classCallCheck(this, SelectEditor);

    var _this = _possibleConstructorReturn(this, (SelectEditor.__proto__ || Object.getPrototypeOf(SelectEditor)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(SelectEditor, [{
    key: 'handleChange',
    value: function handleChange(opt) {
      var _props = this.props,
          onCommit = _props.onCommit,
          onRevert = _props.onRevert;

      if (!opt) {
        return onRevert();
      }
      var e = this.state.e;

      onCommit(opt.value, e);
      console.log('COMMITTED', opt.value);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      // record last key pressed so we can handle enter
      if (e.which === _keys.ENTER_KEY || e.which === _keys.TAB_KEY) {
        e.persist();
        this.setState({ e: e });
      } else {
        this.setState({ e: null });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default, {
        autoFocus: true,
        openOnFocus: true,
        closeOnSelect: true,
        value: this.props.value,
        onChange: this.handleChange,
        onInputKeyDown: this.handleKeyDown,
        options: [{ label: '1', value: "1" }, { label: '2', value: "2" }, { label: '3', value: "3" }, { label: '4', value: "4" }, { label: '5', value: "5" }]
      });
    }
  }]);

  return SelectEditor;
}(_react.PureComponent);

exports.default = SelectEditor;