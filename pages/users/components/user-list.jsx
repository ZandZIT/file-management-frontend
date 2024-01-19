
import PropTypes from 'prop-types'
import UserBox from './user-box';

const UsersList = ({
    users
}) => {
    return ( 
        <div className='px-6'>
            <div className="
            flex flex-col
            ">
                {users.map((doc) => (
                    <UserBox key={doc.id}
                    user={{...doc.data(), uid: doc.id  }} />
                ))}
            </div>
            
        </div>
     );
}
 
UsersList.propTypes = {
    users: PropTypes.array
}
export default UsersList;