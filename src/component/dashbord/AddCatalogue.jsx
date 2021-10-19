import { useState } from "react";
import uuid from "react-uuid";
import { realTimeDB,storageDB } from "../modules/firebase";

const AddCatalogue = () => {
    const [uploadedImg, setUploadedImg] = useState('');

    const [uploadState, setUploadState] = useState(0);
    let storageRef = storageDB.ref('/Gallerie').child(`/photo_${Date.now()}`);
    
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
        realTimeDB.ref('/Catalogue').push({
            id:`${uuid()}`,
            image: `${uploadedImg}`,
            date: `${today.toLocaleString()}`,
        });

        setUploadedImg('');
        setUploadState('0');
        document.querySelector('.client-payement-proof').value = '';
        console.log(today.toLocaleString())
    }
    return (
        <div>
            <div>
                <h4 className='client-title'>Ajouter un catalogue    (<span>chargement: {uploadState}%</span>)</h4>
                <input type='file' name='payementProof' className='client-payement-proof' onChange={uploadPhoto} />
            </div>
            <img src={uploadedImg} alt='uploaded' />
            <div className='submit-button-container'>
                {
                    uploadState === 100 && <button className='submit-button' onClick={addCatalogue}>AJOUTER UN CATALOGUE</button>
                
                }
            </div>
        </div>
    );
}

export default AddCatalogue
