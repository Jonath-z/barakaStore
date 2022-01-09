import './Acceuil.css';
import logo from '../../assets/barakaStore-logo.jpg';
import { IoMailOutline } from 'react-icons/io5';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import 'react-phone-number-input/style.css';
import "react-datetime/css/react-datetime.css";
import { HeaderPhoneMedia } from '../header/mediaqueries/HeaderPhoneMedia';
import { redirectToGallerie, redirectToCatalogue, redirectToSouscire, redirectToAcceuil } from '../../router/Router';
import InputForms from '../order/InputForms';

// ///////////////////////////////// ACCEUIL ///////////////////////////////////
export const Acceuil = () => {
    let history = useHistory();
    return (
        <>
            <div className='main home-page-component'> 
                 <MediaQuery minWidth={1024} maxWidth={20000}>
                     <div className='main-option-container'>
                        <ul className='option-ul'>
                            <li className='option-li-desk option-acceuil' onClick={()=> redirectToAcceuil(history)}>Acceuil</li>
                            <li className='option-li-desk option-gallerie' onClick={()=>redirectToGallerie(history)}>Gallerie</li>
                            <li className='option-li-desk option-catalogue' onClick={()=>redirectToCatalogue(history)}>Catalogue</li>
                            <li className='option-li-desk option-sousrire' onClick={() => {
                                redirectToSouscire(history);
                            }}>Souscrire</li>
                        </ul>
                    </div> 
                </MediaQuery> 
                 <div className='main-logo-container'>
                    <img src={logo} alt='logo' className='logo' />
                </div>
                <div className='main-icons-container'>
                    <ul className='icons-ul'>
                        <a href='mailto:barakastore.drc@gmail.com'><li className='icons-li'><IoMailOutline /></li></a>
                        <a href='https://api.whatsapp.com/send?phone=243976721972'><li className='icons-li'><IoLogoWhatsapp /></li></a>
                        <a href='https://www.facebook.com/barakastoredrc/'><li className='icons-li'><RiFacebookCircleLine /></li></a>
                        <a href='https://www.instagram.com/barakastoredrc/'><li className='icons-li'><IoLogoInstagram /></li></a>
                    </ul>
                </div>
            </div> 

            <MediaQuery minWidth={300} maxWidth={1024}>
                <HeaderPhoneMedia />
            </MediaQuery>
            <MediaQuery minWidth={1024} maxWidth={20000}>
                <div style={{
                    width: '50%',
                    marginLeft:'50%'
                }}>
                    <InputForms />
                </div>
            </MediaQuery>
        </> 
    );
}


