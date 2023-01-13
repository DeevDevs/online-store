import React from 'react';
import './footer.scss';
import githubUserSvg from '../../static/github-user.svg';
import rsLogoSvg from '../../static/rs-logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__nav">
          <a
            className="footer__link"
            href="https://rs.school/js/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="footer__link-img" src={rsLogoSvg} alt="" />
          </a>
          <a
            className="footer__link"
            href="https://github.com/ldemyanov/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github-octopus" src={githubUserSvg} />
            <span className="footer__link-text">Leonid Demyanov</span>
          </a>
          <a
            className="footer__link"
            href="https://github.com/DeevDevs/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github-octopus" src={githubUserSvg} />
            <span className="footer__link-text">Dmitriy Vnuchkov</span>
          </a>
          <p className="footer__date">Created in: 2022</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
