
import PropTypes from 'prop-types'
import UserBox from './user-box';

const UsersList = ({
    users
}) => {
    
    return ( 
        <div className='px-6'>
            <div className="
            mt-10
            grid
            sm:grid-cols-3
            md:grid-cols-5
            lg:grid-cols-7
            ">
                {users.map((doc) => (
                    <UserBox key={doc.id}
                    user={doc.data()} />
                ))}
            </div>
            
        </div>
     );
}
 
UsersList.propTypes = {
    users: PropTypes.array
}
export default UsersList;