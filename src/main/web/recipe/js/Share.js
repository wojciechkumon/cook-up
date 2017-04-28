import React, {Component} from "react";
import {connect} from "react-redux";
import "../style/Share.scss";
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

class Share extends Component {

  render() {
    const {
        FacebookShareButton,
        GooglePlusShareButton,
        TwitterShareButton
    } = ShareButtons;

    const shareUrl = 'http://github.com';
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

export default Share;
