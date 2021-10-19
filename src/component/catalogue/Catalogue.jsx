import Header from "../header/Header";
import { useEffect,useState } from "react";
import '../header/Header.css';
import { realTimeDB } from "../modules/firebase";
import uuid from "react-uuid";
import './Catalogue.css';
import CatalogueSkeleton from "./CatalogueSkeleton";

const cataloguePhoto = () => {
    realTimeDB.ref('/Catalogue').on('value', (snapshot) => {
        const photos = Object.values(snapshot.val());
        // console.log('catalogue', photos);
        localStorage.setItem('catalogue', JSON.stringify(photos));
    
    })
}
cataloguePhoto();

const Catalogue = () => {
    const [images, setImages] = useState();
    useEffect(() => {
        realTimeDB.ref('/Catalogue').on('value', (snapshot) => {
            const photos = Object.values(snapshot.val());
            // console.log('catalogue', photos);
            setImages(photos);
        })
    },[])
    return (
        <>
            <div className='catalogue'>
                <Header
                    acceuilBorder={'none'}
                    gallerieBorder={'none'}
                    catalogueBorder={'2px solid rgb(68, 2, 2)'}
                    souscrireBorder={'none'}
                />
                <div className='catalogue-content'>
                    {
                        images !== undefined && images.reverse().map(({ image }) => {
                            return (
                                <div key={uuid()} className='img-catalogue-container'>
                                    <a href={image} download><img src={image} alt='catalogue' className='catalogueImg' /></a>
                                </div>
                            )
                                    
                        })
                    
                    }
                    {images === undefined && <CatalogueSkeleton />}
                </div>
            </div>
        </>
    );
}

export default Catalogue;