
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {  useSearchParams } from 'react-router-dom'



const Filter = ({
    valueKey, data
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItem = searchParams.get('type')
  
  const onClick = (id) => {
    if(id === selectedItem){
        setSearchParams({})
    }else{
        setSearchParams({ [valueKey]: id });
    }
  }

  return (
    <div className='mb-4'>
        <div className='my-4'>
            <p className='text-lg font-semibold border-b pb-2'>Filter</p>
        </div>
        <div 
        className='flex flex-wrap gap-2'>
        {
            data.map(item => (
            <button
            onClick={()=>onClick(item.id)}
            key={item.id} 
            className={clsx(
            `rounded-md
            border
            px-3
            py-2
            border-gray-300
            font-semibold
            hover:opacity-75
            text-sm
            transition
            text-gray-900`,
            selectedItem === item.id ? 'bg-black text-white' : "bg-white"
            )}>
                <div className='flex'>
                    <img src={item?.src} className="h-4 w-4 mr-2 " />
                    <span className='text-xs font-medium'>{item.name}</span>
                </div>
            </button>
               
            ))
        }
        </div>
    </div>
  )
}

Filter.propTypes = {
    valueKey: PropTypes.string,
    data: PropTypes.array
}

export default Filter