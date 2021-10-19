import { useState,useEffect } from "react";
import { realTimeDB } from "../modules/firebase";
import uuid from "react-uuid";
import Header from "../header/Header";
import './Souscrire.css';
import { useHistory } from "react-router-dom";

const Souscrire = () => {
    const [clientEmail, setClientEmail] = useState('');
    const [displayThanksMessage, setDisplayThanksMessage] = useState(false);
    const [allSusribers, setAllSuscribers] = useState();
    let history = useHistory();
    useEffect(() => {
        realTimeDB.ref('/suscribers').on('value', (snapshot) => {
                const suscribers = Object.values(snapshot.val());
                setAllSuscribers(suscribers);
        })
    }, []);

    const souscrire = () => {
        if (allSusribers !== undefined) {
            allSusribers.map(({ client }) => {
                if (client !== clientEmail) {
                    realTimeDB.ref('/suscribers').push({
                        client: `${clientEmail}`,
                        id: `${uuid()}`
                    });
                    setDisplayThanksMessage(true);
                }
                else {
                    const confirmation = window.confirm('Vous avez déjà souscri à barakaStore,passez plutôt une commande');
                    if (confirmation) {
                        history.push('/');
                    } else {
                        history.push('/');
                    }
                }
            })
        }
    }

    return (
        <div className='souscrire'>
            <Header
             acceuilBorder={'none'}
             gallerieBorder={'none'}
             catalogueBorder={'none'}
             souscrireBorder={'2px solid rgb(68, 2, 2)'}
            />
            <div className='souscire-content'>
                {displayThanksMessage &&<h1 className='souscrire-success'>Vous avez souscri avec succès</h1>}
                {!displayThanksMessage &&<h3 className='welcome-h3'>Souscrivez pour ne rien rater de nos offres</h3>}
                { !displayThanksMessage &&<div>
                    <input className='client-form-mail' type='email' placeholder='Email' value={clientEmail} name='clientMail' onChange={(e) => { setClientEmail(e.target.value) }} />
                </div>}
                { !displayThanksMessage &&<div className='submit-button-container'>
                    {
                        clientEmail !== '' && <button className='submit-button' onClick={souscrire}>SOUSCRIRE</button>
                
                    }
                </div>}
            </div>
        </div>
    );
}

export default Souscrire
