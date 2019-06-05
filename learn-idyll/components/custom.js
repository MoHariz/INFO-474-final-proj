const React = require('react');

class Custom extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div {...props}>
        <h1>Test ... hello hello {this.props.slide}</h1>
      </div>
    );
  }
}

module.exports = Custom;
