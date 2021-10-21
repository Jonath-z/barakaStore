import React from 'react';
import './Dashbord.css';
import { useState } from 'react';
import EditCatalogue from './edit/editCatalogue/EditCatalogue';
import Content from './dashbord-content/Content';
import EditGallery from './edit/editGallery/EditGallery';
import Command from './commande/Command';
import MailNotify from './mail/MailNotify';
import EditPrice from './editPrice/EditPrice';


const Dashbord = () => {
    const [isCommadContent, setIsCommadContent] = useState(true);
    const [isCatalogueContent, setIsCatalogueContent] = useState(false);
    const [isGalleryContent, setIsGalleryContent] = useState(false);
    const [isNotifiedByMail, setIsNotifiedByMail] = useState(false);
    
    const openContent = (e) => {
        console.log(e.target.innerHTML.toLowerCase());
        if (e.target.innerHTML.toLowerCase().trim() === 'commandes') {
            setIsCommadContent(true);
            setIsGalleryContent(false);
            setIsNotifiedByMail(false);
            setIsCatalogueContent(false);
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'editer la gallerie') {
            setIsCommadContent(false);
            setIsGalleryContent(true);
            setIsNotifiedByMail(false);
            setIsCatalogueContent(false);
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'editer le catalogue') {
            setIsCommadContent(false);
            setIsGalleryContent(false);
            setIsNotifiedByMail(false);
            setIsCatalogueContent(true);
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'notifier par mail') {
            setIsCommadContent(false);
            setIsGalleryContent(false);
            setIsNotifiedByMail(true);
            setIsCatalogueContent(false);
        }
    }

    return (
        <>
            {window.location.search.replace('?id=','') !== '' &&<div>
                <Content
                    openContent={openContent}
                />
                {isGalleryContent &&
                    <EditGallery />
                }
                {isCatalogueContent &&
                    <div className='acceuil'>
                        <EditCatalogue />
                    </div>
                }
                {
                    isCommadContent &&
                    <div className='command-component'>
                        <Command />
                        <div className='edit-price-component'>
                            <EditPrice />
                        </div>
                    </div>
                }
                {
                    isNotifiedByMail &&
                    <MailNotify />
                }
            </div>}
        </>
    );
}

export default Dashbord
