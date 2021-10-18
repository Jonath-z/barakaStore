import './Gallerie.css';
import GallerieCommandForm from './GallerieCommandForm';
import Header from '../header/Header';
import { realTimeDB } from '../modules/firebase';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const themeMemory = [];

const Gallerie = () => {
    let [galleryPhotos, setGalleryPhotos] = useState();
    const [model, setmodel] = useState('');
    const [displayForm, setDisplayForm] = useState('none');
    useEffect(() => {
        realTimeDB.ref('/Gallerie').on('value', (snapshot) => {
            const photos = Object.values(snapshot.val());
            setGalleryPhotos(photos);
            photos.map(({ theme }) => {
                if (themeMemory.indexOf(theme) === -1) {
                    console.log(themeMemory);
                  themeMemory.push(theme);
                }
                return (themeMemory);
            })
            console.log(photos);
        })
    }, []);

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
            galleryPhotos !== undefined && themeMemory.map(memoryTheme => {
                return (
                    <>
                        <div className='gallery-theme-container' key={uuid}>
                            <h4 className='gallery-theme' key={uuid()}>{memoryTheme}</h4>
                        </div>
                        <div className='gallery-photo-container' key={uuid()}>
                            {
                                galleryPhotos.map(({ theme, image }) => {
                                    if (theme === memoryTheme) {
                                        return (
                                            <div className='image-global-div' onClick={openForm}>
                                                <img alt={theme} src={image} key={uuid()} className='gallery-photo' />
                                                <div className='image-details-container'>
                                                    <h4 className='gallery-theme theme-h4'>{theme}</h4><hr/>
                                                    <p className='image-details'>{theme} event</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </>
               
                )
            })
        )
    }

    return (
        <>
            <div className='gallerie'>
            <Header />
            <div className='gallerie-content'>
                {
                   <GallerySorting/>
                }
            </div>
            </div>
            <GallerieCommandForm
                display={displayForm}
                model={model}
                closeCommande={
                    () => {
                        setDisplayForm('none')
                        window.onscroll = function () {};
                }
                }
            />
            </>
        
    );
}

export default Gallerie
