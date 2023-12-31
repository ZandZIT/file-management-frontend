import clsx from 'clsx'
import PropTypes from 'prop-types'

const Avater = ({
  currentUser,
  large
}) => {
  return (
    <div className='relative'>
        <div className={clsx(`relative
        overflow-hidden
        h-6
        w-6
        sm:h-8 sm:w-8
        rounded-full
        cursor-pointer`,
        large && "sm:h-[80px] sm:w-[80px]")}>
          <img src={currentUser?.image ? currentUser.image  : '/user-placeholder.png'} alt='user' />    
        </div>
    </div>
  )
}

Avater.propTypes = {
  currentUser: PropTypes.object,
  large: PropTypes.bool
}

export default Avater