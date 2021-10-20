import React from 'react';
import { useState } from 'react';
import EditCatalogue from './edit/editCatalogue/EditCatalogue';
import Content from './dashbord-content/Content';
import EditGallery from './edit/editGallery/EditGallery';
import Command from './commande/Command';
import MailNotify from './mail/MailNotify';

const Dashbord = () => {
    const [isCommadContent, setIsCommadContent] = useState(true);
    const [isCatalogueContent, setIsCatalogueContent] = useState(false);
    const [isGalleryContent, setIsGalleryContent] = useState(false);
    const [isNotifiedByMail, setIsNotifiedByMail] = useState(false)
    
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
                <Command/>
            }
            {
                isNotifiedByMail &&
                <MailNotify/>
            }
        </>
    );
}

export default Dashbord
