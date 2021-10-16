import './App.css';
import logo from './assets/barakaStore-logo.jpg';
import { IoMailOutline } from 'react-icons/io5';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io5';
import Acceuil from './component/acceuil/Acceuil';

function App() {
  return (
    <div className="App">
      <div className='main'>
        <div className='main-option-container'>
          <ul className='option-ul'>
            <li className='option-li option-acceuil'>Acceuil</li>
            <li className='option-li option-gallerie'>Gallerie</li>
            <li className='option-li option-catalogue'>Catalogue</li>
            <li className='option-li option-login'>Login</li>
          </ul>
        </div>
        <div className='main-logo-container'>
          <img src={logo} alt='logo' className='logo' />
        </div>
        <div className='main-icons-container'>
          <ul className='icons-ul'>
            <li className='icons-li'><IoMailOutline /></li>
            <li className='icons-li'><IoLogoWhatsapp /></li>
            <li className='icons-li'><RiFacebookCircleLine /></li>
            <li className='icons-li'><IoLogoInstagram /></li>
          </ul>
        </div>
      </div>
      <div className='option-content'>
        <Acceuil/>
      </div>
    </div>
  );
}

export default App;
