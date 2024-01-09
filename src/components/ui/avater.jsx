import clsx from 'clsx'
import PropTypes from 'prop-types'

const Avater = ({
  currentUser,
  large
}) => {
  return (
    <div className=''>
        <div className={clsx(`
        h-6 w-6
        sm:h-8 sm:w-8
        overflow-hidden
        cursor-pointer`,
        large && "h-[60px] w-[60px] sm:h-[80px] sm:w-[80px]")}>
          <img className='rounded-full h-full w-full object-cover object-center' src={currentUser?.image ? currentUser?.image  : '/user-placeholder.png'} alt='user' />    
        </div>
    </div>
  )
}

Avater.propTypes = {
  currentUser: PropTypes.object,
  large: PropTypes.bool
}

export default Avater