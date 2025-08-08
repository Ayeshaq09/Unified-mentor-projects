import photo from "../../Images/photo.jpg";
import "./Profile.css";
import { Tooltip } from "react-tooltip";

const Profile = () => {
  return (
    <div className="profile-page">
      {/* display all profile data */}
      <img src={photo} alt="my profile" className="photo" />
      <h1>Ayesha Quadros</h1>
      <h3>Web Developer</h3>

      <div className="social-media">
        <a
          href="mailto:ayeshaquadros1998@gmail.com?subject=Inquiry"
          data-tooltip-id="tooltip-email"
          data-tooltip-content="Email"
        >
          <box-icon name="envelope" className="profile-icon"></box-icon>
        </a>
        <Tooltip id="tooltip-email" />
        <a
          href="https://www.linkedin.com/in/ayeshaquadros/"
          target="_blank"
          rel="noopener noreferrer"
          data-tooltip-id="tooltip-linkedIn"
          data-tooltip-content="LinkedIn"
        >
          <box-icon
            name="linkedin"
            type="logo"
            className="profile-icon"
          ></box-icon>
        </a>
        <Tooltip id="tooltip-linkedIn" />
        <a
          href="tel:+919284347739"
          data-tooltip-id="tooltip-tel"
          data-tooltip-content="Phone no."
        >
          <box-icon name="phone" className="profile-icon"></box-icon>
        </a>
        <Tooltip id="tooltip-tel" />
      </div>

      <p>
        A motivated and self-driven web developer with a keen interest in
        building modern, responsive web applications. I have gained hands-on
        experience through internships and personal projects using technologies
        such as React, Node.js, Firebase, and WebSockets. I am constantly
        exploring new technologies to sharpen my skills.
      </p>
      <div className="btn-outer-container">
        <div className="btn-container">
          <a
            className="btn"
            href="/Ayesha Quadros Resume.pdf"
            download="Ayesha Quadros Resume.pdf"
          >
            Download CV
          </a>
          <a
            href="mailto:ayeshaquadros1998@gmail.com?subject=Inquiry"
            className="btn"
          >
            Contact Me
          </a>
        </div>
      </div>
      {/* page number */}
      <span className="page-number">1</span>
    </div>
  );
};

export default Profile;
