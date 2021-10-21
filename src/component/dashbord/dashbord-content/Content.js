import './Content.css';
import { useState } from 'react';

const Content = (props) => {
    const [commandBorder, setCommandBorder] = useState('2px solid rgb(170, 4, 4)');
    const [catalogueBorder, setcatalogueBorder] = useState('none');
    const [gallerieBorder, setGalleryBorder] = useState('none');
    const [notifyMailBorder, setNotifyMailBorder] = useState('none');

    const setFucus = (e) => {
        if (e.target.innerHTML.toLowerCase().trim() === 'commandes') {
            setCommandBorder('2px solid rgb(170, 4, 4)');
            setcatalogueBorder('none')
            setGalleryBorder('none');
            setNotifyMailBorder('none');
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'editer la gallerie') {
            setNotifyMailBorder('none');
            setCommandBorder('none');
            setGalleryBorder('2px solid rgb(170, 4, 4)');
            setcatalogueBorder('none')
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'editer le catalogue') {
            setNotifyMailBorder('none');
            setCommandBorder('none');
            setGalleryBorder('none');
            setcatalogueBorder('2px solid rgb(170, 4, 4)')
        }
        if (e.target.innerHTML.toLowerCase().trim() === 'notifier par mail') {
            setNotifyMailBorder('2px solid rgb(170, 4, 4)');
            setCommandBorder('none');
            setGalleryBorder('none');
            setcatalogueBorder('none')
        }
    }


    return (
        <div className='content'>
            <div className='content-list'>
                <ul className='content-list-ul'>
                    <li className='constent-list-li' onClick={(e) => {
                        props.openContent(e);
                        setFucus(e)
                    }
                    } style={{
                        borderBottom: commandBorder
                    }}>COMMANDES</li><hr className='list-hr' />
                    <li className='constent-list-li' onClick={(e) => {
                        props.openContent(e)
                        setFucus(e)
                    }
                    } style={{
                        borderBottom: catalogueBorder
                    }}>EDITER LE CATALOGUE</li><hr className='list-hr' />
                    <li className='constent-list-li' onClick={(e) => {
                        props.openContent(e)
                        setFucus(e)
                    }
                    } style={{
                        borderBottom: gallerieBorder
                    }}>EDITER LA GALLERIE</li><hr className='list-hr' />
                    <li className='constent-list-li' onClick={(e) => {
                        props.openContent(e)
                        setFucus(e)
                    }
                    } style={{
                        borderBottom: notifyMailBorder
                    }}>NOTIFIER PAR MAIL</li><hr className='list-hr' />
                </ul>
            </div>
        </div>
    );
}

export default Content;
