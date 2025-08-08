import {EducationData} from '../../data/EducationData';

const Education = () => {
  return (
    <>
      <h1 className="title">Education</h1>
      <div className="info-container">
        {/* map all education details from EducationData */}
        {EducationData.map((item) => {
          return (
            <div className="content">
              <span className="year">
                <box-icon name='calendar' type='solid' className="icon"></box-icon>
                {item.year}
              </span>
              <h3>{item.class}</h3>
              <p className="college">{item.college}</p>
              <p className="marks">
                {item.board} | {item.marks}
              </p>
              {item.info && <p className="info">{item.info}</p>}
            </div>
          );
        })}
      </div>
      {/* page number */}
      <span className="page-number">2</span>
    </>
  );
};

export default Education;
