import './Header.css';
import MediaQuery from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';

import { redirectToGallerie, redirectToAcceuil, redirectToCatalogue,redirectToSouscire, redirectToCommande } from '../../router/Router';

const Header = (props) => {
    const [isMenueResponsive, setIsMenuResponsive] = useState(false);

    const dispatch = useDispatch();

    const { hideComponent, unhideComponent } = bindActionCreators(actionCreators, dispatch);
    
    let history = useHistory();
    const closeMenu = () => {
        setIsMenuResponsive(false);
    }
    const openMenu = () => {
        setIsMenuResponsive(true);
    }
    
    return (
        <>
            <div className='Header'>
                <div className='header-startup-name-container'>
                    <h1 className='startup-name' onClick={redirectToAcceuil}>BarakaStore</h1>
                    <p className='startup-slogant'>DITES-LE AVEC DES FLEURS</p>
                </div>
                <MediaQuery minWidth={300} maxWidth={1024}>
                    <div className='menu-icon-container'>
                        <p><FiMenu className='menu-icon' onClick={() => {
                            openMenu();
                            hideComponent('true');
                        }} /></p>
                    </div>
                    {isMenueResponsive && <div className='header-option-container-reponsive '>
                        <FaTimes className='close-menu-icon' onClick={() => {
                            closeMenu();
                            unhideComponent('false');
                        }} />
                        <ul className='header-ul-reponsive'>
                            <li className='option-li-responsive' onClick={() => {
                                redirectToAcceuil(history);
                                unhideComponent('false');
                            }}>Acceuil</li>
                            <li className='option-li-responsive option-gallerie' onClick={() => {
                                redirectToGallerie(history);
                                unhideComponent('false');
                            }}>Gallerie</li>
                            <li className='option-li-responsive option-catalogue' onClick={() => {
                                redirectToCatalogue(history)
                                unhideComponent('false');
                            }}>Catalogue</li>
                            <li className='option-li-responsive option-login' onClick={() => {
                                redirectToSouscire(history)
                                unhideComponent('false');
                            }}>Souscrire</li>
                            <li className='option-li-responsive option-login' onClick={() => {
                                redirectToCommande(history);
                                unhideComponent('false');
                            }}>Passez une commande</li>
                        </ul>
                    </div>}
                </MediaQuery>
                <MediaQuery minWidth={1025} maxWidth={2000}>
                    <div className='header-option-container'>
                        <ul className='option-ul header-ul'>
                            <li className='option-li header-li' onClick={() => redirectToAcceuil(history)} style={{
                                borderBottom: props.acceuilBorder
                            }}>Acceuil</li>
                            <li className='option-li option-gallerie header-li' onClick={() => redirectToGallerie(history)} style={{
                                borderBottom: props.gallerieBorder
                            }}>Gallerie</li>
                            <li className='option-li option-catalogue header-li' onClick={() => redirectToCatalogue(history)} style={{
                                borderBottom: props.catalogueBorder
                            }}>Catalogue</li>
                            <li className='option-li option-login header-li' onClick={() => {
                                redirectToSouscire(history);
                            }} style={{
                                borderBottom: props.souscrireBorder
                                }}>Souscrire</li>
                              <li className='option-li option-login header-li' onClick={() => {
                                redirectToCommande(history);
                            }} style={{
                                borderBottom: props.commandeBorder
                            }}>Passez une commande</li>
                        </ul>
                    </div>
                </MediaQuery>
            </div>
        </>
    );
}

export default Header
