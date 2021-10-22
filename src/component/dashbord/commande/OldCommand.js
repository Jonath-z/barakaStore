import { realTimeDB } from "../../modules/firebase";
import { useState, useEffect } from "react";

const Oldcommand = () => {
    const [validCommands, setValidCommand] = useState();
    const [rejectCommands, setRejectCommand] = useState();
    useEffect(() => {
        realTimeDB.ref('/valid-commades').on('value', (snapshot) => {
            if (snapshot.exists()) {
                setValidCommand(Object.values(snapshot.val()));
                console.log(Object.values(snapshot.val()));
            }
        });
        realTimeDB.ref('/reject-commades').on('value', (snapshot) => {
            if (snapshot.exists()) {
                setRejectCommand(Object.values(snapshot.val()));
            }
        });
    }, []);
    return (
        <div>
            <div className='valid-commands' style={{float:'left', marginLeft:'30px'}}>
                <h1>Commande(s) validée(s)</h1>
                {
                    validCommands !== undefined && validCommands.reverse().map((command) => {
                        return (
                            <div>
                                <a href={command.command.payementProof}><img src={command.command.payementProof} alt='command-proof' className='command-proof' style={{width:'200px'}}/></a>
                                {command.command.model !== '' && command.command.model &&
                                    <a href={command.command.model}><img src={command.command.model} alt='command-proof' className='command-proof' style={{width:'200px'}}/></a>
                                }
                                <div>
                                    <h4 className='commd-details-h4'>Client</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Phone: {command.command.clientPhone}</li>
                                        <li className='command-details-li'>Email: {command.command.clientEmail}</li>
                                        <li className='command-details-li'>Prix: {command.command.price} $</li>
                                        <li className='command-details-li'>Date: {command.command.date}</li>
                                    </ul>
                                    <h4 className='commd-details-h4'>Recepteur</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Nom: {command.command.destinationName}</li>
                                        <li className='command-details-li'>Phone: {command.command.destinationPhone}</li>
                                        <li className='command-details-li'>Email: {command.command.destinationEmail}</li>
                                        <li className='command-details-li'>Details: <b>{command.command.commadDetails}</b></li>
                                    </ul>
                                </div>
                                <button style={{
                                    color: 'red',
                                    width: '30em',
                                    height: '3em'
                                }}
                                onClick={()=>{realTimeDB.ref('/valid-commades').child(command.command.id).remove()}}
                                >Supprimer</button>
                            </div>
                        );
                    })
                }
            </div>
            <div className='reject-command' style={{float:'right'}}>
                <h1>Commande(s) rejetée(s)</h1>
                {
                    rejectCommands !== undefined && rejectCommands.reverse().map((command) => {
                        return (
                            <div>
                                <a href={command.command.payementProof}><img src={command.command.payementProof} alt='command-proof' className='command-proof' style={{width:'200px'}}/></a>
                                {command.command.model !== '' && command.command.model &&
                                     <a href={command.command.model}><img src={command.command.model} alt='command-proof' className='command-proof' style={{width:'200px'}}/></a>
                                }
                                <div>
                                    <h4 className='commd-details-h4'>Client</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Phone: {command.command.clientPhone}</li>
                                        <li className='command-details-li'>Email: {command.command.clientEmail}</li>
                                        <li className='command-details-li'>Prix: {command.command.price} $</li>
                                        <li className='command-details-li'>Date: {command.command.date}</li>
                                    </ul>
                                    <h4 className='commd-details-h4'>Recepteur</h4>
                                    <ul className='commad-details-ul'>
                                        <li className='command-details-li'>Nom: {command.command.destinationName}</li>
                                        <li className='command-details-li'>Phone: {command.command.destinationPhone}</li>
                                        <li className='command-details-li'>Email: {command.command.destinationEmail}</li>
                                        <li className='command-details-li'>Details: <b>{command.command.commadDetails}</b></li>
                                    </ul>
                                </div>
                                <button style={{
                                    color: 'red',
                                }}
                                onClick={(e)=>{realTimeDB.ref('/reject-commades').child(command.command.id).remove()}}
                                >Supprimer</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Oldcommand;

