import { SkillsData } from "../../data/SkillsData";
import "./Skills.css";

const Skills = () => {
  return (
    <>
      <h1 className="title">My Skills</h1>
      <div className="skills-container">
        <div className="skills-content-container">
          {/* map all skills from SkillsData */}
          {SkillsData.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.category}</h3>
                <div className="skills-content">
                  {item.skills.map((skill, index) => {
                    return (
                      <span key={index}>
                        <box-icon
                          name={skill.icon}
                          type={skill.type}
                          className="icon"
                        ></box-icon>
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div> 
      {/* page number */}
      <span className="page-number">4</span>
    </>
  );
};

export default Skills;
