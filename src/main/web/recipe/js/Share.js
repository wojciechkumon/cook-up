import React, {Component} from "react";
import "../style/Share.scss";
import PropTypes from "prop-types";
import {generateShareIcon, ShareButtons} from "react-share";

class Share extends Component {

  render() {
    const {
        FacebookShareButton,
        TwitterShareButton
    } = ShareButtons;

    const {recipeId} = this.props;
    const shareUrl = window.location.origin + '/recipe/' + recipeId;
    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');

    const iconSize = 32;

    return (
        <div className="Share">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon className="fb" size={iconSize} round/>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon className="twitter" size={iconSize} round/>
          </TwitterShareButton>
        </div>
    );
  }
}

Share.propTypes = {
  recipeId: PropTypes.number.isRequired
};

export default Share;
