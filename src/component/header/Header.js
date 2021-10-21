import './Header.css';
import { useHistory } from 'react-router-dom';

const Header = (props) => {
    let history = useHistory();
    const redirectToGallerie = () => {
        history.push('/Gallerie');
    }
    const redirectToAcceuil = () => {
        history.push('/');
    }
    const redirectToCatalogue = () => {
        history.push('/Catalogue');
    }
    return (
        <>
            <div className='Header'>
                <div className='header-startup-name-container'>
                    <h1 className='startup-name' onClick={redirectToAcceuil}>BarakaStore</h1>
                    <p className='startup-slogant'>DITES-LE AVEC DES FLEURS</p>
                </div>
                <div className='header-option-container'>
                    <ul className='option-ul header-ul'>
                        <li className='option-li header-li' onClick={redirectToAcceuil} style={{
                            borderBottom: props.acceuilBorder
                        }}>Acceuil</li>
                        <li className='option-li option-gallerie header-li' onClick={redirectToGallerie} style={{
                            borderBottom: props.gallerieBorder
                        }}>Gallerie</li>
                        <li className='option-li option-catalogue header-li' onClick={redirectToCatalogue} style={{
                            borderBottom: props.catalogueBorder
                        }}>Catalogue</li>
                        <li className='option-li option-login header-li' onClick={() => {
                            history.push('/Souscrire')
                        }} style={{
                            borderBottom: props.souscrireBorder
                        }}>Souscrire</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header
