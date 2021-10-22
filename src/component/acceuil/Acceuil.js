import './Acceuil.css';
import logo from '../../assets/barakaStore-logo.jpg';
import { IoMailOutline } from 'react-icons/io5';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { storageDB, realTimeDB } from '../modules/firebase';
import uuid from 'react-uuid';
import MediaQuery from 'react-responsive';
import emailjs from 'emailjs-com';


// ///////////////////////////////// ACCEUIL ///////////////////////////////////
export const Main = () => {
    let history = useHistory();
    const redirectToGallerie = () => {
        history.push('/Gallerie');
    }
    const redirectToCatalogue = () => {
        history.push('/Catalogue');
    }
    return (
        <>
            <div className='main'>
                <MediaQuery minWidth={300} maxWidth={500}>
                    <div className='main-option-container'>
                        <ul className='option-ul'>
                            <li className='option-li option-acceuil'>Acceuil</li>
                            <li className='option-li option-gallerie' onClick={redirectToGallerie}>Gallerie</li>
                            <li className='option-li option-catalogue' onClick={redirectToCatalogue}>Catalogue</li>
                            <li className='option-li option-sousrire' onClick={() => {
                                history.push('/Souscrire')
                            }}>Souscrire</li>
                        </ul>
                    </div>
                </MediaQuery>
                <MediaQuery minWidth={501} maxWidth={2000}>
                    <div className='main-option-container'>
                        <ul className='option-ul'>
                            <li className='option-li option-acceuil'>Acceuil</li>
                            <li className='option-li option-gallerie' onClick={redirectToGallerie}>Gallerie</li>
                            <li className='option-li option-catalogue' onClick={redirectToCatalogue}>Catalogue</li>
                            <li className='option-li option-sousrire' onClick={() => {
                                history.push('/Souscrire')
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
        </>
    );
}

/////////////////////////////  ACCEUIL INPUT FORM ////////////////////////////////////////
export const Acceuil = () => {
    const [uploadedImg, setUploadedImg] = useState();
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [price, setPrice] = useState('');
    const [destinationEmail, setDestinationEmail] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [destinationPhone, setDestinationPhone] = useState('');
    const [commadDetails, setCommandDetails] = useState('');
    const [uploadState, setUploadState] = useState(0);
    const [options, setOptions] = useState();

    useEffect(() => {
        realTimeDB.ref('/offers').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const offers = Object.values(snapshot.val())
                setOptions(offers);
                // console.log(options);
            }
        })
    },[])

    let storageRef = storageDB.ref('/preuve-de-payement').child(`/preuve-de-payement_${Date.now()}`);    
    const uploadProof = async (e) => {
            const file = e.target.files[0];
            storageRef.put(file).then((snapshot) => {
                setUploadState((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                snapshot.ref.getDownloadURL().then(url => {
                    console.log(url);
                    setUploadedImg(url);
                })
            })
    }
// ////////////////////////// SEND COMMAND FROM USER TO BARAKASTORE ///////////////////////////////////
    const sendCommand = () => {
        const today = new Date();
        const commandID = uuid();
        realTimeDB.ref('/commades').child(commandID).set({
            id:`${commandID}`,
            clientEmail: `${clientEmail}`,
            clientPhone: `${clientPhone}`,
            price: `${price}`,
            destinationEmail: `${destinationEmail}`,
            destinationName: `${destinationName}`,
            destinationPhone: `${destinationPhone}`,
            commadDetails:`${commadDetails}`,
            payementProof: `${uploadedImg}`,
            date: `${today.toLocaleString()}`
        });
// ************************** SEND EMAIL TO ADMIN *****************************************//
        emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_VALIDATE_TEMPLETE_ID}`, {
            sujet: `Nouvelle Commande`,
            to: `barakastore.drc@gmail.com`,
            reply_to: `barakastore.drc@gmail.com`,
            name: `BarakaStore`,
            message: `
                Vous avez une nouvelle commande,
                Client: ${clientEmail},
                phone: ${clientPhone},
                prix: ${price}
                Nom du recepteur : ${destinationName},
                Numero du recepteur: ${destinationPhone},
                Details de la commande : ${commadDetails}
                Date de la commande: ${today.toLocaleString()}
        `}, `${process.env.REACT_APP_EMAILJS_USER_ID}`);
        //*************************** CLEAR INPUTS ******************************************* */ 
        setClientEmail('');
        setClientPhone('');
        setPrice('');
        setDestinationEmail('');
        setDestinationName('');
        setDestinationPhone('');
        setCommandDetails('');
        setUploadedImg('');
        setUploadState('0');
        document.querySelector('.client-payement-proof').value = '';
        console.log(today.toLocaleString())
    }

    return (
        <>
            <div className='acceuil'>
                <h3 className='welcome-h3'>Bienvenue chez BarakaStore,passez votre commande</h3>
                <div className='acceuil-client-form'>
                    <h4 className='client-title'>Client</h4>
                    <input className='client-form-mail' type='email' placeholder='Email' value={clientEmail} name='clientMail' onChange={(e) => { setClientEmail(e.target.value) }} />
                    <input type='phone' placeholder='phone' className='client-form-phone' value={clientPhone} name='clientPhone' onChange={(e) => { setClientPhone(e.target.value) }} />
                    <h5 className='select-title'>Veuillez choisir le bouquet</h5>
                    <select className='main-form-select-price' onChange={(e) => { setPrice(e.target.value) }}>
                        <option value=''>choisir le bouquet</option>
                        {
                            options !== undefined && options.map(({ id, price, quantity }) => {
                                return <option value={price} key={id}>{quantity} roses {price}$</option>
                            })
                        }
                    </select>
                </div>
                <div className='acceuil-client-form'>
                    <h4 className='client-title'>Destination</h4>
                    {/* <img src={uploadedImg} alt='uploaded'/> */}
                    <input className='client-form-mail' type='email' placeholder='Email (optionel)' value={destinationEmail} name='destinationMail' onChange={(e) => { setDestinationEmail(e.target.value) }} />
                    <input className='client-form-name' type='text' placeholder='Name' value={destinationName} name='destinationName' onChange={(e) => { setDestinationName(e.target.value) }} />
                    <input type='phone' placeholder='phone' className='client-form-phone' value={destinationPhone} name='destinationPhone' onChange={(e) => { setDestinationPhone(e.target.value) }} />
                    <textarea placeholder='Details' className='client-text-textarea' value={commadDetails} name='commandDetails' onChange={(e) => { setCommandDetails(e.target.value) }} />
                    <h5 className='select-title'>Preuve de paiyement     (<span>chargement: {uploadState}%</span>)</h5>
                    <input type='file' name='payementProof' className='client-payement-proof' onChange={uploadProof} />
                </div>
                <div className='submit-button-container'>
                    {
                        uploadState === 100 && clientPhone.length >= 10 && clientEmail !== '' && destinationPhone.length >= 10 && commadDetails !== '' && price !== '' && <button className='submit-button' onClick={sendCommand}>ENVOYEZ</button>
                
                    }
                </div>
            </div>
        </>
    );
}

