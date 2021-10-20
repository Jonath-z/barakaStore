import './Content.css';

const Content = (props) => {
    return (
        <div className='content'>
            <div className='content-list'>
                <ul className='content-list-ul'>
                    <li className='constent-list-li' onClick={props.openContent}>COMMANDES</li><hr className='list-hr'/>
                    <li className='constent-list-li' onClick={props.openContent}>EDITER LE CATALOGUE</li><hr className='list-hr'/>
                    <li className='constent-list-li' onClick={props.openContent}>EDITER LA GALLERIE</li><hr className='list-hr'/>
                    <li className='constent-list-li' onClick={props.openContent}>NOTIFIER PAR MAIL</li><hr className='list-hr'/>
                </ul>
            </div>
        </div>
    );
}

export default Content;
