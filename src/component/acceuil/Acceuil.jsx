import './Acceuil.css';

const Acceuil = () => {
    return (
        <div className='acceuil'>
            <h3 className='welcome-h3'>Bienvenue chez BarakaStore,passez votre commande</h3>
            <div className='acceuil-client-form'>
                <h4 className='client-title'>Client</h4>
                <input className='client-form-mail' type='email' placeholder='Email' />
                <input type='phone' placeholder='phone' className='client-form-phone'/>
                <h5 className='select-title'>Veuillez choisir le bouquet</h5>
                <select className='main-form-select-price'>
                    <option value='30'>10 roses 30$</option>
                    <option value='30'>30 roses 60$</option>
                    <option value='30'>60 roses 120$</option>
                    <option value='30'>200 roses 230$</option>
                    <option value='30'>600 roses 400$</option>
                    <option value='30'>1000 roses 800$</option>
                </select>
            </div>
            <div className='acceuil-client-form'>
                <h4 className='client-title'>Destination</h4>
                <input className='client-form-mail' type='email' placeholder='Email (optionel)' />
                <input className='client-form-name' type='text' placeholder='Name' />
                <input type='phone' placeholder='phone' className='client-form-phone'/>
                <textarea placeholder='Details' className='client-text-textarea'/>
            </div>
            <div className='submit-button-container'>
                <button className='submit-button'>ENVOYEZ</button>
            </div>
        </div>
    );
}

export default Acceuil
