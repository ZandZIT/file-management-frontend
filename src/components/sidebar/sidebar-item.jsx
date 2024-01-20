import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SidebarItem = ({
  label,
  icon: Icon,
  onClick,
  active,
  count,
  href
}) => {
  return (
    <li className='w-full relative'>
      <Link
        to={href}
        onClick={onClick}
        className={clsx(
          'flex gap-x-3 text-sm p-3 relative cursor-pointer leading-6  hover:text-black hover:bg-gray-100',
          active ? 'bg-gray-100 text-black' : 'text-gray-500'
        )}
      >
       
        {label === "Expired" && <div className='absolute right-3 top-2 rounded-full h-4 w-4 bg-rose-500 flex items-center justify-center'>
          <div className='text-white font-semibold text-[10px]'>{count}</div>
        </div>}
        <Icon className='h-5 w-5 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  count: PropTypes.number,
  href: PropTypes.string,
};

export default SidebarItem;
