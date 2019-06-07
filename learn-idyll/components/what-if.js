const React = require("react");

class WhatIf extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { genre: this.props.genre };

    this.updateGenre = this.updateGenre.bind(this);
    this.uodatePlatform = this.updatePlatform.bind(this);
  }
  updateGenre(e) {
    this.props.updateProps({
      genre: e.target.value
    });
  }

  updatePlatform(e) {
    this.props.updateProps({
      platform: e.target.value
    });
  }
  render() {
    return (
      <div className="what-if">
        <span>I am a developer who want to make a game of </span>
        <select name="genres" onChange={this.updateGenre}>
          <option value="platform">Platform</option>
          <option value="shooter">Shooter</option>
        </select>
        <span> at </span>
        <select name="platform" onChange={this.updateGenre}>
          <option value="XBOX">XBOX</option>
          <option value="PS">PlayStation</option>
          <option value="PC">PC</option>
        </select>
      </div>
    );
  }
}
module.exports = WhatIf;
