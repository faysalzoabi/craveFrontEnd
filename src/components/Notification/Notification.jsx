import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
 
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
 
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Error",
      message: "Please select or add a new delivery address!",
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
 
  render() {
    return (
      <div className="app-content">
        <ReactNotification ref={this.notificationDOMRef} />
        <button onClick={this.addNotification} className="btn btn-primary">
          Add Awesome Notification
        </button>
      </div>
    );
  }
}

export default Notification