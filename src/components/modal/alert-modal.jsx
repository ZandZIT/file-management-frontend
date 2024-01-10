
import Modal from './modal'
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form"

import Button from '../ui/button';


const AlertModal = ({
    disabled,
    isOpen,
    onClose,
    onAction
}) => {
    const { handleSubmit} = useForm()
      
    return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}>
        <form onSubmit={handleSubmit(onAction)}>
            <div className='space-y-8'>
                <div className='
                border-b pb-4 border-gray-900/10
                '>  
                    <h2 className='
                    font-semibold
                    text-gray-900
                    leading-7
                    '>
                        Delete 
                    </h2>
                    <p className='
                    text-sm text-gray-500 mt-1 leading-6
                    '>
                        Are you sure?
                    </p>
                </div>
                <div className='
                mt-10
                space-y-4'>
                    <div className="mt-10">
                        <div className="
                        flex items-center justify-end
                        ">
                            <div className="flex items-center gap-x-2">
                                <Button 
                                onClick={onClose}
                                disable={disabled}
                                type="button"
                                secondary
                                >
                                    <p>Cancel</p>
                                </Button>
                                <Button 
                                disable={disabled}
                                type="submit"
                                danger
                                >
                                    <p>Continue</p>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </Modal>
  )
}

AlertModal.propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onAction: PropTypes.func

}

export default AlertModal