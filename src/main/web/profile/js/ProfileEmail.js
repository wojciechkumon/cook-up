import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../util/js/Loader";
import {fetchProfileAccountIfNeeded} from "./actions/actions";

class ProfileEmail extends Component {

  componentDidMount() {
    const {dispatch, profileId} = this.props;
    dispatch(fetchProfileAccountIfNeeded(profileId));
  }

  render() {
    const {profiles, profileId} = this.props;
    const profile = profiles[profileId];

    let accountWrapper = profile ? profile.account : undefined;
    const fetching = accountWrapper ? accountWrapper.isFetching : false;
    const account = accountWrapper ? accountWrapper.data : undefined;

    return (
      <div>
        {fetching && <Loader/>}
        {account && account.email}
      </div>
    );
  }
}

ProfileEmail.propTypes = {
  profileId: PropTypes.number.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profiles: state.profiles.byId
  }
};

ProfileEmail = connect(mapStateToProps)(ProfileEmail);

export default ProfileEmail;