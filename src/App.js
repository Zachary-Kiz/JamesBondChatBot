import bond from './bond.png'
import './App.css';


function BondMessage({message}) {
  return (
    <div class="bondContainer">
      <div class="bondImgContainer">
        <img className="bondImg" src={bond} alt="Bond Image" />
      </div>
      <div class="bondMes">
        {message}
      </div>
    </div>
  )
}

export default BondMessage;