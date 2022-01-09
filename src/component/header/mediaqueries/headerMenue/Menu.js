import React from 'react'
import { useHistory } from 'react-router-dom';
import { redirectToSouscire,redirectToGallerie,redirectToCatalogue } from '../../../../router/Router';

const Menu = () => {
    let history = useHistory();
    return (
        <div>
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
            }}>
                <li className='option-li option-acceuil'>Acceuil</li>
                <li className='option-li option-gallerie' onClick={()=>redirectToGallerie(history)}>Gallerie</li>
                <li className='option-li option-catalogue' onClick={()=>redirectToCatalogue(history)}>Catalogue</li>
                <li className='option-li option-sousrire' onClick={() => {
                    redirectToSouscire(history);
                }}>Souscrire</li>
            </ul>
        </div>
    )
}

export default Menu;