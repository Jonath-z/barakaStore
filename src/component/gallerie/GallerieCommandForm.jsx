
import '../acceuil/Acceuil.css';
import Resizer from 'react-image-file-resizer';
import { useState } from 'react';
import { storageDB, realTimeDB } from '../modules/firebase';
import uuid from 'react-uuid';
import { useCookies } from 'react-cookie';
import { MdCancel } from 'react-icons/md';

const GallerieCommandForm = (props) => {
    const [uploadedImg, setUploadedImg] = useState();
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [price, setPrice] = useState();
    const [destinationEmail, setDestinationEmail] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [destinationPhone, setDestinationPhone] = useState('');
    const [commadDetails, setCommandDetails] = useState('');
    const [uploadState, setUploadState] = useState(0);
    const [cookie, setCookie] = useCookies(['clientEmail']);
    const [phoneCookie, setPhoneCookie] = useCookies(['clientPhone']);
    let storageRef = storageDB.ref('/preuve-de-payement').child(`/preuve-de-payement_${Date.now()}`);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });
    
    const uploadProof = async (e) => {
        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            storageRef.put(image).then((snapshot) => {
                setUploadState((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                snapshot.ref.getDownloadURL().then(url => {
                    console.log(url);
                    setUploadedImg(url);
                })
            })
            console.log(image);
          } catch (err) {
            console.log(err);
          }
        
    }
    const sendCommand = () => {
        const today = new Date();
        realTimeDB.ref('/commades').push({
            id:`${uuid()}`,
            clientEmail: `${clientEmail}`,
            clientPhone: `${clientPhone}`,
            price: `${price}`,
            destinationEmail: `${destinationEmail}`,
            destinationName: `${destinationName}`,
            destinationPhone: `${destinationPhone}`,
            commadDetails:`${commadDetails}`,
            payementProof: `${uploadedImg}`,
            model:`${props.model}`,
            date: `${today.toLocaleString()}`
        });
        const expire = new Date();
        expire.setTime(today.getTime() + (30 * 60 * 60 * 1000));
        setCookie('clientEmail', clientEmail, { path: '/', expires: new Date(Date.now()+2592000)});
        setPhoneCookie('clientPhone', clientPhone, { path: '/', expires: new Date(Date.now()+2592000) });

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

        <div className='GallerieCommandForm' style={{
            display: props.display
        }}>
            <div className='acceuil'>
                <h3 className='welcome-h3'>Passez votre commande</h3>
                <MdCancel className='cancel-icon' onClick={props.closeCommande}/>
            <div className='acceuil-client-form'>
                <h4 className='client-title'>Client</h4>
                <input className='client-form-mail' type='email' placeholder='Email' value={cookie.clientEmail} name='clientMail' onChange={(e) => { setClientEmail(e.target.value) }} />
                <input type='phone' placeholder='phone' className='client-form-phone' value={phoneCookie.clientPhone}  name='clientPhone' onChange={(e) => { setClientPhone(e.target.value) }} />
                <h5 className='select-title'>Veuillez choisir le bouquet</h5>
                <select className='main-form-select-price' onChange={(e) => { setPrice(e.target.value) }}>
                    <option value=''>choisir le bouquet</option>
                    <option value='30'>30 roses 60$</option>
                    <option value='30'>60 roses 120$</option>
                    <option value='30'>200 roses 230$</option>
                    <option value='30'>600 roses 400$</option>
                    <option value='30'>1000 roses 800$</option>
                </select>
            </div>
            <div className='acceuil-client-form'>
                <h4 className='client-title'>Destination</h4>
                {/* <img src={uploadedImg} alt='uploaded'/> */}
                <input className='client-form-mail' type='email' placeholder='Email (optionel)' value={destinationEmail}  name='destinationMail' onChange={(e) => { setDestinationEmail(e.target.value) }} />
                <input className='client-form-name' type='text' placeholder='Name' value={destinationName} name='destinationName' onChange={(e) => { setDestinationName(e.target.value) }} />
                <input type='phone' placeholder='phone' className='client-form-phone' value={destinationPhone} name='destinationPhone' onChange={(e) => { setDestinationPhone(e.target.value) }} />
                <textarea placeholder='Details' className='client-text-textarea' value={commadDetails} name='commandDetails' onChange={(e) => { setCommandDetails(e.target.value) }} />
                <h5 className='select-title'>Preuve de paiyement     (<span>chargement: {uploadState}%</span>)</h5>
                <input type='file' name='payementProof' className='client-payement-proof' onChange={uploadProof} />
            </div>
            <div className='submit-button-container'>
                {
                    uploadState === 100 && clientPhone.length >=10 && clientEmail !=='' && destinationPhone.length>=10 && commadDetails !== '' && price !==''&& destinationEmail !== ''&& <button className='submit-button' onClick={sendCommand}>ENVOYEZ</button>
                
                }
            </div>
        </div>
        </div>
    )
}

export default GallerieCommandForm
