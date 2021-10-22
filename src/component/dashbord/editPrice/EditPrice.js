import { realTimeDB } from "../../modules/firebase";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import emailjs from 'emailjs-com';
import './EditPrice.css';

const EditPrice = () => {
    const [offer, setOffer] = useState();
    const [isAddOffer, setIsAddOffer] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [offerAnnoucement, setOfferAnnoucement] = useState('');
    const [sucribers, setSuscribers] = useState();

    useEffect(() => {
        realTimeDB.ref('/suscribers').on('value', (snapshot) => {
            if (snapshot.exists()) {
                setSuscribers(Object.values(snapshot.val()));
            }
        })
    },[])

    useEffect(() => {
        realTimeDB.ref('/offers').on('value', (snapshot) => {
            if (snapshot.exists()) {
                setOffer(Object.values(snapshot.val()));
            }
        })
    }, []);

    const addOffer = () => {
        setIsAddOffer(true)
    }
    const addNewOffer = () => {
        const offerID = uuid();
        realTimeDB.ref('/offers').child(offerID).set({
            id: `${offerID}`,
            price: `${newPrice}`,
            quantity: `${newQuantity}`
        })
        if (sucribers !== undefined) {
            sucribers.map(({ client }) => {
               return emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_VALIDATE_TEMPLETE_ID}`, {
                    sujet: 'Nouvelle Offre',
                    to: `${client}`,
                    reply_to: `barakastore.drc@gmail.com`,
                    name: `${client}`,
                    message: `
                   ${offerAnnoucement}
                `}, `${process.env.REACT_APP_EMAILJS_USER_ID}`);
            });
        }
        setIsAddOffer(false)
        setNewPrice('')
        setNewQuantity('')
        setOfferAnnoucement('');
    }

    return (
        <div className='edit-price'>
            <h1>Offres</h1>
            {
                offer !== undefined && offer.map(({ id, price, quantity }) => {
                    return (
                        <div className='price-container' key={id}>
                            <p>{quantity} roses pour {price}$ </p>
                            <button onClick={(e) => {
                                realTimeDB.ref('/offers').child(id).remove();
                                alert('offre supprimée');
                            }} className='editPrice-button delete'>Supprimer l'offre</button>
                        </div>
                    )
                })
            }
            <div className='add-button'>
                {!isAddOffer && <button onClick={addOffer} className='edit editPrice-button'>Ajouter une offre</button>}
            </div>
            {
                isAddOffer && <div className='acceuil'>
                    <input className='client-form-name' placeholder='Prix' value={newPrice} onChange={(e) => { setNewPrice(e.target.value) }} />
                    <input className='client-form-name' placeholder='Quantité' value={newQuantity} onChange={(e) => { setNewQuantity(e.target.value) }} />
                    <textarea placeholder="Rediger une annonce" className='client-text-textarea' value={offerAnnoucement} name='offerAnnoucement' onChange={(e) => { setOfferAnnoucement(e.target.value) }} />
                    <div className='submit-button-container'>
                        <button className='submit-button' style={{
                            background: 'red',
                            cursor: 'pointer'
                        }} onClick={() => {
                            setIsAddOffer(false);
                            setNewPrice('')
                            setNewQuantity('')
                            setOfferAnnoucement('');
                        }}>ANNULER</button>
                        {
                            offerAnnoucement !== '' && newPrice !== '' && newQuantity !== '' && <button className='submit-button' onClick={addNewOffer}>AJOUTER</button>
                
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default EditPrice
