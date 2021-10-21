import React from 'react';
import { useState,useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { storageDB, realTimeDB } from '../../../modules/firebase';
import uuid from 'react-uuid';
import './EditGallery.css';

const EditGallery = () => {
    const [uploadedImg, setUploadedImg] = useState('');
    const [photoDetails, setPhotoDetails] = useState('');
    const [theme, setTheme] = useState('');
    const [uploadState, setUploadState] = useState(0);
    const [galleryPhotos, setGalleryPhotos] = useState();
    const [preventEmptyGallery, setPreventEmptyGallery] = useState(false);
   // ///////////////////////////////////  GET ALL GALLERY'S PHOTOS AND PREVENT THE EMPTY GALLERY ///////////////////////////////////////////////////
    useEffect(() => {
        realTimeDB.ref('/Gallerie').on('value', (snapshot) => {
            if (snapshot.val() !== null && snapshot.val() !== undefined) {
                const photos = Object.values(snapshot.val());
                if (photos.length === 1) {
                    setPreventEmptyGallery(true);
                }
                if (photos.length > 1) {
                    setPreventEmptyGallery(false);
                }
                photos.map(photo => {
                    photo.key = `${snapshot.key}`
                })
                setGalleryPhotos(photos);
                // console.log(photos);
            }
        })
    },[])
// ///////////////////////////////////  RESIZE GALLERY'S PHOTO BEFORE UPLOADING IN DB ///////////////////////////////////////////////////
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
   // /////////////////////////////////// UPLOAD PHOTO IN FIRESTORE DB /////////////////////////////////////////////////// 
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
    // ///////////////////////////////////  UPLOAD PHOTO URL IN REALTIME DB ///////////////////////////////////////////////////
    const addPhotoToGallery= () => {
        const today = new Date();
        const photoID = uuid()
        realTimeDB.ref('/Gallerie').child(photoID).set({
            id:`${photoID}`,
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
        <div className='edithGallery'>
            <div className='editGallery-gallery'>
                {
                    galleryPhotos !== undefined && galleryPhotos.reverse().map(({ id, image }) => {
                        return (
                            <div key={id} className='editGallery-photo-container'>
                                <img src={image} alt='gallery-photo' className='editGallery-photos' />
                                {!preventEmptyGallery && <div className='button-container'>
                                    <button className='delete-button' accessKey={id} onClick={(e) => {
                                        console.log(e.target.parentNode.parentNode.children[0].src);
                                        storageDB.refFromURL(e.target.parentNode.parentNode.children[0].src); // delete photo in firestore
                                        realTimeDB.ref('/Gallerie').child(`${id}`).remove(); // delete photo in realTime bata base
                                    }}>Effacer</button>
                                </div>}
                            </div>
                        )
                    })
                }
            </div>
            <div className='acceuil editGallery-form'>
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
                <img src={uploadedImg} alt='uploaded' />
                <div className='submit-button-container'>
                    {
                        uploadState === 100 && theme !== '' && <button className='submit-button' onClick={addPhotoToGallery}>AJOUTER UNE IMAGE</button>
                
                    }
                </div>
            </div>
        </div>
    );
}

export default EditGallery
