import { ProjectData } from "../../data/ProjectData";
import { Tooltip } from "react-tooltip";

const Projects = () => {
  return (
    <>
      <h1 className="title">Projects</h1>
      <div className="info-container">
        {/* map all project details from ProjectData */}
        {ProjectData.map((item) => {
          return (
            <>
              <div className="content">
                <h3
                  data-tooltip-id="tooltip-project"
                  data-tooltip-content={item.info}
                  className="project-name"
                >
                  {item.appName}
                </h3>
                <p className="tech">{item.technologies}</p>
                <p>
                  <a href={item.github}>Github link</a>
                </p>
              </div>
              <Tooltip id="tooltip-project" className="tooltip"/>
            </>
          );
        })}
      </div>
      {/* page number */}
      <span className="page-number">5</span>
    </>
  );
};

export default Projects;
