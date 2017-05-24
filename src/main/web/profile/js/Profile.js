import React, {Component} from "react";
import "../style/Profile.scss";
import ProfileRecipes from "./ProfileRecipes";
import ProfileFavouriteRecipes from "./ProfileFavouriteRecipes";

class Profile extends Component {

  render() {
    const {match} = this.props;
    const profileId = Number(match.params.userId);
    return (
      <div className="Profile">
        <ProfileRecipes profileId={profileId}/>
        <ProfileFavouriteRecipes profileId={profileId}/>
      </div>
    );
  }
}

export default Profile;
