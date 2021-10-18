import './Header.css';
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory();
    const redirectToGallerie = () => {
        history.push('/Gallerie');
    }
    const redirectToAcceuil = () => {
        history.push('/');
    }
    return (
        <div className='Header'>
            <div className='header-startup-name-container'>
                <h1 className='startup-name' onClick={redirectToAcceuil}>BarakaStore</h1>
                <p className='startup-slogant'>DITES-LE AVEC DES FLEURS</p>
            </div>
            <div className='header-option-container'>
                <ul className='option-ul header-ul'>
                    <li className='option-li option-acceuil header-li' onClick={redirectToAcceuil}>Acceuil</li>
                    <li className='option-li option-gallerie header-li' onClick={redirectToGallerie}>Gallerie</li>
                    <li className='option-li option-catalogue header-li'>Catalogue</li>
                    <li className='option-li option-login header-li'>Souscrire</li>
                </ul>
            </div>
        </div>
    );
}

export default Header
