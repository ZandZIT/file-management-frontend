'use client'

import clsx from 'clsx'
import PropTypes from 'prop-types';



const Input = ({
    label,
    disabled,
    errors,
    id,
    register,
    required,
    type
}) => {
  return (
    <div>
        <label
        className={clsx(`
        text-sm 
        font-medium
        leading-6
        block
        `, 
        errors[id] ? "text-rose-500" : 'text-gray-900'
        )}>
            {label}
        </label>
        <input 
            type={type} 
            disabled={disabled} 
            {...register(id, {required})}
            className={
                clsx(`
                mt-2
                text-sm
                text-gray-900
                w-full
                rounded-md
                sm:leading-6
                py-1.5
                px-2
                ring-1
                ring-gray-300
                border-0
                outline-0
                placeholder:text-gray-400
                focus:ring-2
               
                `, 
                errors[id] ? "focus:ring-rose-500": " focus:ring-sky-500",
                disabled && "opacity-50 cursor-default")
            }
        />
    </div>
  )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired, // Assuming register is a function provided by react-hook-form
    errors: PropTypes.object.isRequired, // Assuming errors is an object provided by react-hook-form
    required: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
}

export default Input