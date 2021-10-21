import TextareaAutosize from "react-textarea-autosize";
import { useState, useEffect } from "react";
import { realTimeDB } from "../../modules/firebase";
import  emailjs from 'emailjs-com';
import React from 'react'
import './MailNotify.css';

const MailNotify = () => {
    const [allMails, setAllMails] = useState();
    const [noContact, setNoContact] = useState(false);
    const [message, setMessage] = useState('');
    const [sujet,setSujet] = useState('')
    useEffect(() => {
        realTimeDB.ref('/suscribers').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const mails = Object.values(snapshot.val());
                setAllMails(mails);
                setNoContact(false);
            }
            if (!snapshot.exists()) {
                setNoContact(true)
            }
        });  
    },[])
    return (
        <>
            {!noContact && <div className='mail-notify'>
                <div className='acceuil mail-notify-inputs'>
                    {allMails !== undefined &&<h1>Redigez un mail à {allMails.length} souscris</h1>}
                    <input className='client-form-name' type='text' placeholder='Sujet' value={sujet} onChange={(e)=>{setSujet(e.target.value)}} />
                    <div>
                        <TextareaAutosize height={200} className='mail-notify-text-area' value={message} placeholder='Mail...' onChange={(e) => {
                            setMessage(e.target.value);
                        }} />
                    </div>
                </div>
                <div className='acceuil'>
                <div>
                    {message !== '' && sujet !== '' && <button className='send-button' onClick={(e) => {
                            e.preventDefault();
                            if (allMails !== undefined) {
                                allMails.map(({ client }) => {
                                    console.log(client);
                                    emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_VALIDATE_TEMPLETE_ID}`, {
                                        sujet: `${sujet}`,
                                        to: `${client}`,
                                        reply_to: `barakastore.drc@gmail.com`,
                                        name: `${client}`,
                                        message: `
                                       ${message}
                                    `}, `${process.env.REACT_APP_EMAILJS_USER_ID}`);
                                })
                                setSujet('');
                                setMessage('');
                            }
                        
                    }}>ENVOYER</button>}
                    </div>
                    </div>
            </div >}
            {
                noContact && <h1>Pas de contact disponible</h1>
            }
        </>
    );
}

export default MailNotify
