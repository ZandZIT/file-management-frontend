import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types'
import { ROOT_FOLDER } from '../hooks/use-folder';
import { Link } from 'react-router-dom';

const Path = ({folder }) => {
    let path = folder == ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if(folder?.path) {
        path = [...path, ...folder.path]
    }
    return ( 
        <div className='px-4 '>
            <div className='flex items-center flex-wrap gap-x-2 '>
                {/* <div className='flex items-center '>
                    <div className='px-4 py-1 bg-transparent hover:bg-neutral-200/50 w-fit rounded-full transition-all cursor-pointer'>
                        <h1 className='text-2xl text-gray-800'>My Drive</h1>
                    </div>
                    {path?.length !== 0 && <ChevronRight className='h-6 w-6 ml-2' />}
                </div> */}
                
                {
                    path?.length > 0 && path?.map((item) => (
                        <div key={item?.id} className='flex items-center '>
                            <Link 
                            to={{
                                pathname: item?.id ? `/folders/${item?.id}` : '/',
                                // search: '?id=newId1',  // Update the query parameter
                                state: 'newState1',  // Update the state
                              }}
                            // state={{ name: "Imran" }}
                            className='px-4 py-1 bg-transparent hover:bg-neutral-200/50 w-fit rounded-full transition-all cursor-pointer'>
                                <h1 className='text-2xl text-gray-800'>{item?.name}</h1>
                            </Link>
                            <ChevronRight className='h-6 w-6 ml-2' />
                        </div>
                    ))
                }
                <Link 
                            to={folder?.id ? `/folders/${folder?.id}` : '/'}
                            state={{ name: "Imran" }}
                            className='px-4 py-1 bg-transparent hover:bg-neutral-200/50 w-fit rounded-full transition-all cursor-pointer'>
                                <h1 className='text-2xl text-gray-800'>{folder?.name}</h1>
                            </Link>
            </div>
        </div>
     );
}

Path.propTypes = {
    folder: PropTypes.object
}
 
export default Path;