import React from 'react';
import { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { storageDB, realTimeDB } from '../modules/firebase';
import AddCatalogue from './AddCatalogue';
import uuid from 'react-uuid';
const Dashbord = () => {
    const [uploadedImg, setUploadedImg] = useState('');
    const [photoDetails, setPhotoDetails] = useState('');

    const [theme, setTheme] = useState('');
    const [uploadState, setUploadState] = useState(0);
    let storageRef = storageDB.ref('/Gallerie').child(`/photo_${Date.now()}`);

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });
    
    const uploadPhoto = async (e) => {
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
    const addPhotoToGallery= () => {
        const today = new Date();
        realTimeDB.ref('/Gallerie').push({
            id:`${uuid()}`,
            theme: `${theme}`,
            image: `${uploadedImg}`,
            date: `${today.toLocaleString()}`,
            details: `${photoDetails}`
        });

        setUploadedImg('');
        setUploadState('0');
        document.querySelector('.client-payement-proof').value = '';
        console.log(today.toLocaleString())
    }

    return (
        <div className='acceuil'>
            
            <div className='acceuil-client-form'>
                <h4 className='client-title'>Ajouter une photo</h4>
                <select className='client-form-name' type='text' placeholder='Theme' value={theme} name='theme' onChange={(e) => { setTheme(e.target.value) }} >
                    <option value=''>choisir le theme</option>
                    <option value='Bouquet'>Bouquet</option>
                    <option value='Love'>Love</option>
                    <option value='Birthday'>Birthday</option>
                    <option value='Graduation'>Graduation</option>
                    <option value='Saint Valentin'>Saint Valentin</option>
                </select>
                <textarea placeholder='Details' className='client-text-textarea' value={photoDetails} name='commandDetails' onChange={(e) => { setPhotoDetails(e.target.value) }} />
                <h5 className='select-title'>Ajouter une photo dans la gallerie    (<span>chargement: {uploadState}%</span>)</h5>
                <input type='file' name='payementProof' className='client-payement-proof' onChange={uploadPhoto} />
            </div>
            <img src={uploadedImg} alt='uploaded'/>
            <div className='submit-button-container'>
                {
                    uploadState === 100 && theme !=='' && <button className='submit-button' onClick={addPhotoToGallery}>AJOUTER UNE IMAGE</button>
                
                }
            </div>
            <AddCatalogue/>
        </div>
    );
}

export default Dashbord
