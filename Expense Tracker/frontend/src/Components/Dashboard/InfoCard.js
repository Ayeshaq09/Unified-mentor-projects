import './InfoCard.css';

const InfoCard = (props) => {
    const { title, amount, infoIcon } = props;
  return (
    <div className='info-card'>
      <div className='info-details'>
        <p className='info-title'>{title}</p>
        <p className='info-amount'>{amount}</p>
    </div>
      <div className='info-icon-container'>
        <div className='info-icon-outline'>
            <i className={`info-icon ${infoIcon}`}></i>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
