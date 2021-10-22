import './Gallerie.css';
import GallerieCommandForm from './GallerieCommandForm';
import GallerieSkeleton from './GallerieSkeleton';
import Header from '../header/Header';
import { realTimeDB } from '../modules/firebase';
import {useState,useEffect} from 'react';
import uuid from 'react-uuid';

const themeMemory = [];


    const Gallerie = () => {
        const [model, setmodel] = useState('');
        const [displayForm, setDisplayForm] = useState('none');
        const [galleryPhotos, setGalleryPhotos] = useState();
        useEffect(() => {
            realTimeDB.ref('/Gallerie').on('value', (snapshot) => {
                const photos = Object.values(snapshot.val());
                // localStorage.setItem('gallerie', JSON.stringify(photos));
                setGalleryPhotos(photos);
                // setGalleryPhotos(photos);
                photos.map(({ theme }) => {
                    if (themeMemory.indexOf(theme) === -1) {
                        console.log(themeMemory);
                        themeMemory.push(theme);
                    }
                    return (themeMemory);
                })
                console.log(photos);
            });
        }, [])

        const openForm = (e) => {
            console.log(e.target.parentNode.firstChild.src);
            setmodel(e.target.parentNode.firstChild.src);
            setDisplayForm('block')
            let x = window.screenX;
            let y = window.screenY;
            window.scrollTo(0, 0);
            window.onscroll = function () { window.scroll(x, y) };
        }

        const GallerySorting = () => {
            return (
                themeMemory.map(memoryTheme => {
                    return (
                        <>
                            <div className='gallery-theme-container' key={uuid}>
                                <h4 className='gallery-theme' key={uuid()}>{memoryTheme}</h4>
                            </div>
                            <div className='gallery-photo-container' key={uuid()}>
                                {
                                    galleryPhotos !== undefined && galleryPhotos.reverse().map(({ theme, image }) => {
                                        return (
                                        theme === memoryTheme &&
                                                <div className='image-global-div' onClick={openForm}>
                                                    <img alt={theme} src={image} key={uuid()} className='gallery-photo' />
                                                    <div className='image-details-container'>
                                                        <h4 className='gallery-theme theme-h4'>{theme}</h4><hr />
                                                        <p className='image-details'>Commadez comme model</p>
                                                    </div>
                                                </div>
                                        )
                                    })
                                }
                                {galleryPhotos === undefined && <div className='image-global-div'>
                                    <div className='image-details-container'>
                                        <GallerieSkeleton countValue={5} />
                                    </div>
                                    <div className='image-details-container'>
                                        <GallerieSkeleton countValue={5} />
                                    </div>
                                </div>}
                            </div>
                        </>
               
                    )
                })
            )
        }

        return (
            <>
                <div className='gallerie'>
                    <Header
                        acceuilBorder={'none'}
                        gallerieBorder={'2px solid rgb(68, 2, 2)'}
                        catalogueBorder={'none'}
                        souscrireBorder={'none'}
                    />
                    <div className='gallerie-content'>
                        {
                         <GallerySorting />
                        }
                    </div>
                </div>
                <GallerieCommandForm
                    display={displayForm}
                    model={model}
                    closeCommande={
                        () => {
                            setDisplayForm('none')
                            window.onscroll = function () { };
                        }
                    }
                />
            </>
        
        );
    
}

export default Gallerie
