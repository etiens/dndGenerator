var React = require("react");
var StateFromStoreMixin = require("items-store/StateFromStoresMixin");
var RouteHandler = require("react-router").RouteHandler;
var Footer = require("./../components/Footer");

// Styles
require("../styles/index.less");

if(__DEV__) {
  require("react-a11y")(React);
}

var Application = React.createClass({
  mixins: [StateFromStoreMixin],
  statics: {
    getState: function(stores) {
      var transition = stores.Router.getItem("transition");
      return {
        loading: !!transition
      };
    }
  },
  render: function() {
    return (
      <div
        className={ this.state.loading ? "application loading" : "application"}
      >
        {
          this.state.loading ?
            <div style={{float: "right"}}>loading...</div>
            : null
        }
        <RouteHandler />
        <Footer />
      </div>
    );
  },
  update: function() {
    var { stores } = this.context;
    Object.keys(stores).forEach(function(key) {
      stores[key].update();
    });
  }
});
module.exports = Application;
