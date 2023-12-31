import PropTypes from 'prop-types'
import Avater from '../../../src/components/ui/avater';
import { useState } from 'react';
import SettingsModal from '../../../src/components/modal/settings-modal';
const UserBox = ({
    user
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return ( 
        <>
        <SettingsModal
        currentUser={user}
        isOpen={isOpen}
        onClose={()=> setIsOpen(false)} />
        <div className='m-auto' onClick={()=> setIsOpen(true)}>
            <Avater currentUser={user} large />
            <div className='text-center'>
                <p className='mt-2 text-xs text-zinc-400'>{user?.username}</p>
            </div>
        </div>
        </>
     );
}

UserBox.propTypes = {
    user: PropTypes.object
}
 
export default UserBox;