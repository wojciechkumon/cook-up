import React, {Component} from "react";
import "./Sidebar.scss";
import AvatarBox from "./AvatarBox";
import SignIn from "./steamIntegration/SignIn";

class Sidebar extends Component {
  render() {
    return (
      <div className='Sidebar'>
        <AvatarBox/>
        <div>blabla</div>
        <SignIn/>
      </div>
    );
  }
}

export default Sidebar;
