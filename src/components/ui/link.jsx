import clsx from 'clsx'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const LinkButton = ({
  fullWidth,
  children,
  danger,
  to,
  type,
  secondary
}) => {
  return (
    <Link
    to={to}
    type={type}
    className={clsx(`
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600',
        secondary && 'ring-[1px] ring-neutral-300 hover:bg-neutral-100'
      )}
      >
      {children}
    </Link>
  )
}

LinkButton.propTypes = {
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  children: PropTypes.any,
  to: PropTypes.string ,
  secondary: PropTypes.bool,
  danger: PropTypes.bool ,
}

export default LinkButton