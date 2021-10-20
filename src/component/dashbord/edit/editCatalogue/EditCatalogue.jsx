import { useState,useEffect } from "react";
import uuid from "react-uuid";
import { realTimeDB, storageDB } from "../../../modules/firebase";
import './EditCatalogue.css';

const EditCatalogue = () => {
    const [uploadedImg, setUploadedImg] = useState('');
    const [uploadState, setUploadState] = useState(0);
    const [allCatalogue, setAllCatalogue] = useState();
    const [preventEmptyCatalogue, setPreventEmptyCatalogue] = useState(false);

    useEffect(() => {
        realTimeDB.ref('/Catalogue').on('value', (snapshot) => {
            if (snapshot.val() !== null && snapshot.val() !== undefined) {
                const photos = Object.values(snapshot.val());
                if (photos.length === 1) {
                    setPreventEmptyCatalogue(true);
                }
                if (photos.length > 1) {
                    setPreventEmptyCatalogue(false);
                }
                photos.map(photo => {
                    photo.key = `${snapshot.key}`
                })
                setAllCatalogue(photos);
                // console.log(photos);
            }
        })
    }, []);

    let storageRef = storageDB.ref('/Catalogue').child(`/photo_${Date.now()}`);
    const uploadPhoto = async (e) => {
        try {
            const file = e.target.files[0];
            storageRef.put(file).then((snapshot) => {
                setUploadState((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                snapshot.ref.getDownloadURL().then(url => {
                    console.log(url);
                    setUploadedImg(url);
                })
            })
          } catch (err) {
            console.log(err);
          }
        
    }
    const addCatalogue= () => {
        const today = new Date();
        const catalogueID = uuid()
        realTimeDB.ref('/Catalogue').child(catalogueID).set({
            id:`${catalogueID}`,
            image: `${uploadedImg}`,
            date: `${today.toLocaleString()}`,
        });

        setUploadedImg('');
        setUploadState('0');
        document.querySelector('.client-payement-proof').value = '';
        console.log(today.toLocaleString())
    }
    return (
        
        <div className='editCatalogue'>
            <div className='editCatalogue-catalogue'>
                {
                    allCatalogue !== undefined && allCatalogue.reverse().map(({ id, image }) => {
                        return (
                            <div key={id} className='editCatalogue-photoContainer' >
                                <img className='editCatalogue-catalogue-photo' src={image} alt='catalogue' />
                                {!preventEmptyCatalogue && <div className='editCatalogue-deleteButton'>
                                    <button className='delete-button' accessKey={id} onClick={(e) => {
                                        storageDB.refFromURL(e.target.parentNode.parentNode.children[0].src); // delete photo in firestore
                                        realTimeDB.ref('/Catalogue').child(`${id}`).remove(); // delete photo in realTime bata base
                                    }}>SUPRIMER LE CATALOGUE</button>
                                </div>}
                            </div>
                        )
                    })
                }
            </div>
            <div className='acceuil editCatalogue-form'>
                <div>
                    <h4 className='client-title'>Ajouter un catalogue    (<span>chargement: {uploadState}%</span>)</h4>
                    <input type='file' name='payementProof' className='client-payement-proof' onChange={uploadPhoto} />
                </div>
                <img src={uploadedImg} alt='uploaded' style={{
                    width:'200px'
                }}/>
                <div className='submit-button-container'>
                    {
                        uploadState === 100 && <button className='submit-button' onClick={addCatalogue}>AJOUTER UN CATALOGUE</button>
                
                    }
                </div>
            </div>
        </div>
    );
}

export default EditCatalogue
