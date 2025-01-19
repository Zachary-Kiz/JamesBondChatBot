import bond from '../../../src/bond.png'
import './BondMessage.css';


function BondMessage({message, input}) {
  
  return (
    <div className='exchange'>
    <div class="userContainer">
    <div class="userMes">
      {input}
    </div>
  </div>
    <div class="bondContainer">
      <div class="bondImgContainer">
        <img className="bondImg" src={bond} alt="Bond Image" />
      </div>
      <div class="bondMes">
        {message}
      </div>
    </div>
  </div>
    
  )
}

export default BondMessage;