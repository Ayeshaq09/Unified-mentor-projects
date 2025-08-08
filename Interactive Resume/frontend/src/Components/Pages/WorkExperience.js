import {WorkExperienceData} from '../../data/WorkExperience';

const WorkExperience = () => {
  return (
    <>
      <h1 className="title">Work Experience</h1>
      <div className="info-container">
        {/* map all work experience details from WorkExperienceData */}
        {WorkExperienceData.map((item) => {
          return (
            <div className="content">
              <span className="year">
                <box-icon name='calendar' type='solid' className="icon"></box-icon>
                {item.year}
              </span>
              <h3>
                {item.role} - {item.company}
              </h3>
              <p className="info">{item.info.map((item, index) => {
                return (<ul>
                  <li key={index}>{item}</li>
                </ul>)
              })}</p>
            </div>
          );
        })}
        {/* page number */}
        <span className="page-number">3</span> 
      </div>
    </>
  );
};

export default WorkExperience;
