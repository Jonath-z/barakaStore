import { realTimeDB } from "../../modules/firebase";
import { useState, useEffect } from "react";
import './Command.css';
import uuid from "react-uuid";
import emailjs from 'emailjs-com';

const Command = () => {
    const [allCommand, setAllCommand] = useState();
    const [noCommad, setNoCommd] = useState(true);
    useEffect(() => {
        
        realTimeDB.ref('/commades').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const commads = Object.values(snapshot.val());
                setAllCommand(commads);
                setNoCommd(false);
            }
            if (!snapshot.exists()) {
                setNoCommd(true);
            }
        });
    }, []);
    
    return (
        <div className='command-div'>
            {
              !noCommad &&  allCommand !== undefined && allCommand.reverse().map(command => {
                    return (
                        <>
                            <div className='command-container'>
                                <div className='command-proof-container'>
                                    <p>Preuve de payement</p>
                                    <a href={command.payementProof}><img src={command.payementProof} className='payement-proof-image' /></a>
                                    {
                                        command.model !== '' && command.model &&
                                        <div>
                                            <p>model</p>
                                            <a href={command.model}><img src={command.model} className='model-image' /></a>
                                        </div>
                                    }
                                </div>
                                <div className='commad-details-list'>
                                    <h4 className='commd-details-h4'>Client</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Phone: {command.clientPhone}</li>
                                        <li className='command-details-li'>Email: {command.clientEmail}</li>
                                        <li className='command-details-li'>Prix: {command.price} $</li>
                                        <li className='command-details-li'>Date: {command.date}</li>
                                    </ul>
                                    <h4 className='commd-details-h4'>Recepteur</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Nom: {command.destinationName}</li>
                                        <li className='command-details-li'>Phone: {command.destinationPhone}</li>
                                        <li className='command-details-li'>Email: {command.destinationEmail}</li>
                                        <li className='command-details-li'>Details: <b>{command.commadDetails}</b></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='command-buttons'>
                                <button className='command-button-reject' key={uuid()} accessKey={JSON.stringify(command)}
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                            console.log(JSON.parse(e.target.accessKey).clientEmail.toLowerCase());
                                            emailjs.send(`service_dx7aqu2`, `template_eusrxdb`, {
                                                sujet: `Commade rejetée`,
                                                to: `${JSON.parse(e.target.accessKey).clientEmail}`,
                                                reply_to: `barakastore.drc@gmail.com`,
                                                name: JSON.parse(e.target.accessKey).clientEmail.toLowerCase(),
                                                message: `
                                                    Votre commande pour ${JSON.parse(e.target.accessKey).destinationName} a été rejeté;  merci de nous contater pour plus de details.
                                                `}, 'user_dAVFn0qCut39ZHgNN8mf9');
                                            realTimeDB.ref('/reject-commades').child(`${JSON.parse(e.target.accessKey).id}`).set({
                                                command
                                            })
                                            realTimeDB.ref('/commades').child(JSON.parse(e.target.accessKey).id).remove();
                                        }
                                }
                                >Rejeter</button>
                                <button className='command-button-validate' key={uuid()} accessKey={JSON.stringify(command)} onClick={
                                    (e) => {
                                        e.preventDefault();
                                        console.log(JSON.parse(e.target.accessKey).clientEmail.toLowerCase());
                                        emailjs.send(`service_dx7aqu2`, `template_eusrxdb`, {
                                            sujet: `Commade validée`,
                                            to: `${JSON.parse(e.target.accessKey).clientEmail}`,
                                            reply_to:`barakastore.drc@gmail.com`,
                                            name: JSON.parse(e.target.accessKey).clientEmail.toLowerCase(),
                                            message: `
                                                Votre commande pour ${JSON.parse(e.target.accessKey).destinationName} a été bien approuvée;  merci de nous faire confiance
                                            `}, 'user_dAVFn0qCut39ZHgNN8mf9');
                                        realTimeDB.ref('/valid-commades').child(`${JSON.parse(e.target.accessKey).id}`).set({
                                            command
                                        })
                                        realTimeDB.ref('/commades').child(JSON.parse(e.target.accessKey).id).remove();
                                    }
                                        
                                }>Valider</button>
                            </div>
                        </>
                    )
                })
            }
            {
                noCommad&& <h1 style={{textAlign:"left"}}>Pas de commande disponible</h1>
            }
        </div>
    );
}

export default Command
