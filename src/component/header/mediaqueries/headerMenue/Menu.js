import React from 'react'
import { useHistory } from 'react-router-dom';
import { redirectToSouscire,redirectToGallerie,redirectToCatalogue,redirectToCommande } from '../../../../router/Router';

const Menu = () => {
    let history = useHistory();
    return (
        <div>
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '0px',
                marginTop:'5px'
            }}>
                <li className='option-li' onClick={() => redirectToGallerie(history)}>Gallerie</li>
                <li className='option-li' onClick={() => {
                    redirectToSouscire(history);
                }}>Souscrire</li>
                <li className='option-li' onClick={() => redirectToCatalogue(history)}>Catalogue</li>
                 <li className='option-li' onClick={()=>redirectToCommande(history)}>Passez la commande</li>
            </ul>
        </div>
    )
}

export default Menu;