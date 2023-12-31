
import ReactSelect from 'react-select'
import PropTypes from 'prop-types';

const Select= ({
    label,
    value,
    options,
    onChange,
    disabled,
    required
})=>{
    return(
        <div>
            <label
            className='text-sm 
            font-medium
            leading-6
            block
            text-gray-900'
            >
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect 
                    required={required}
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) =>({
                            ...base,
                            zIndex: 9999,
                                                        
                        }),
                    }}
                    classNames={{
                        input: () => 'text-sm rounded-md text-gray-900 ',
                        control: () =>  'text-sm rounded-md sm:leading-6 '
                    }}
                />
            </div>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    required: PropTypes.bool
}

export default Select