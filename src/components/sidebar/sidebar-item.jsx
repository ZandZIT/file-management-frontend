import clsx from 'clsx';
import PropTypes from 'prop-types';


const SidebarItem = ({
  label,
  icon: Icon,
  onClick,
  active,
  href
}) => {
  return (
    <li className='w-full'>
      <a
        href={href}
        onClick={onClick}
        className={clsx(
          'flex gap-x-3 text-sm p-3 cursor-pointer leading-6  hover:text-black hover:bg-gray-100',
          active ? 'bg-gray-100 text-black' : 'text-gray-500'
        )}
      >
        <Icon className='h-5 w-5 shrink-0' />
        <span className='sr-only'>{label}</span>
      </a>
    </li>
  );
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  href: PropTypes.string,
};

export default SidebarItem;
