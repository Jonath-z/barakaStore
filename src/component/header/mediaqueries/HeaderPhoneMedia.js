import React from 'react';
import '../../acceuil/Acceuil.css';
import { RiArrowUpSLine,RiArrowDownSLine } from 'react-icons/ri';
import Menu from './headerMenue/Menu';
import { useState } from 'react';

export const HeaderPhoneMedia = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const openMenu = () => {
        setIsOpenMenu(true)
    }
    const closeMenu = () => {
        setIsOpenMenu(false);
    }

    return (
        <div>
            {
                !isOpenMenu ?
                    <div className='phone-open-menu-band'>
                        <RiArrowUpSLine className="phone-open-menu-icon" onClick={openMenu}/>
                    </div>
                    :
                    <div>
                        <RiArrowDownSLine
                            onClick={closeMenu}
                            style={{
                                fontSize: '30px',
                                color: '008000',
                            }}
                        />
                    </div>
                        
            }
           
            {
                isOpenMenu && <Menu />
            }
        </div>
    );
}
