import './Header.css';
import { useHistory } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import {FaTimes} from 'react-icons/fa'

const Header = (props) => {
    const [isMenueResponsive, setIsMenuResponsive] = useState(false);
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
    const openMenu = () => {
        setIsMenuResponsive(true);
    }
    const closeMenu = () => {
        setIsMenuResponsive(false);
    }
    return (
        <>
            <div className='Header'>
                <div className='header-startup-name-container'>
                    <h1 className='startup-name' onClick={redirectToAcceuil}>BarakaStore</h1>
                    <p className='startup-slogant'>DITES-LE AVEC DES FLEURS</p>
                </div>
                <MediaQuery minWidth={300} maxWidth={500}>
                    <div className='menu-icon-container'>
                        <p><FiMenu className='menu-icon' onClick={openMenu}/></p>
                    </div>
                    {isMenueResponsive && <div className='header-option-container-reponsive '>
                        <FaTimes className='close-menu-icon' onClick={closeMenu }/>
                        <ul className='header-ul-reponsive'>
                            <li className='option-li-responsive' onClick={redirectToAcceuil} style={{
                                borderBottom: props.acceuilBorder
                            }}>Acceuil</li>
                            <li className='option-li-responsive option-gallerie' onClick={redirectToGallerie} style={{
                                borderBottom: props.gallerieBorder
                            }}>Gallerie</li>
                            <li className='option-li-responsive option-catalogue' onClick={redirectToCatalogue} style={{
                                borderBottom: props.catalogueBorder
                            }}>Catalogue</li>
                            <li className='option-li-responsive option-login' onClick={() => {
                                history.push('/Souscrire')
                            }} style={{
                                borderBottom: props.souscrireBorder
                            }}>Souscrire</li>
                        </ul>
                    </div>}
                </MediaQuery>
                <MediaQuery minWidth={501} maxWidth={2000}>
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
                </MediaQuery>
            </div>
        </>
    );
}

export default Header
