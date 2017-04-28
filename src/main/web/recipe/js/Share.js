import React, {Component} from "react";
import {connect} from "react-redux";
import "../style/Share.scss";
import PropTypes from "prop-types";
import {ShareButtons, generateShareIcon} from 'react-share';

class Share extends Component {

  render() {
    const {
        FacebookShareButton,
        GooglePlusShareButton,
        TwitterShareButton
    } = ShareButtons;

    const {recipeId} = this.props;
    const shareUrl = window.location.origin + '/recipe/' + recipeId;
    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const GooglePlusIcon = generateShareIcon('google');

    const iconSize = 32;

    return (
        <div className="Share">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={iconSize} round/>
          </FacebookShareButton>
          <GooglePlusShareButton url={shareUrl}>
            <GooglePlusIcon size={iconSize} round/>
          </GooglePlusShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={iconSize} round/>
          </TwitterShareButton>
        </div>
    );
  }
}

Share.propTypes = {
  recipeId: PropTypes.number.isRequired
};

export default Share;
