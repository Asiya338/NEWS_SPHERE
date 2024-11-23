import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const shareUrl = window.location.href; // Use current URL to share

  const handleShare = (platform) => {
    let shareLink;

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      default:
        return;
    }

    window.open(shareLink, "_blank");
  };

  return (
    <footer className="footer mt-10 p-4 bg-gray-800 text-white text-center">
      <h2>Thank You for Visiting Us !...</h2>
      <h2>Share This Article</h2>
      <div className="share-buttons flex justify-center space-x-4 mt-2">
        <button onClick={() => handleShare("facebook")} className="share-btn ">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </button>
        <button onClick={() => handleShare("twitter")} className="share-btn ">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </button>
        <button onClick={() => handleShare("linkedin")} className="share-btn ">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </button>
      </div>
      <hr className="mt-3" />
      <p className="mt-4">
        &copy; {new Date().getFullYear()} News_Sphere. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
