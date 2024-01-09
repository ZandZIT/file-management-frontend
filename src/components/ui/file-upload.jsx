import clsx from 'clsx'
import Dropzone from 'react-dropzone'
import { ROOT_FOLDER } from '../../hooks/use-folder'
import PropTypes from 'prop-types'
import { collections, db, storage } from '../../../firebase'
import { addDoc,  doc,  serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import toast from 'react-hot-toast'

const FileUpload = ({
    currentFolder,
    user,
    setCount,
    setIsLoading
})=>{
    // const { getRootProps, getInputProps } = useDropzone({ 
    //    maxSize: 20971520,
    //     onDrop: handleDrop, 
    //     disabled,
    //   });
    const maxSize = 20971520
    
    const handleDrop = (files) =>{
        if(!files.length) return 

        setCount(files?.length)
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = ()=> console.log("aborted")
            reader.onerror = ()=> console.log("failed")
            reader.onload = async ()=> {
                setIsLoading(true)
                await uploadPost(file)
            };
            reader.readAsArrayBuffer(file)
        })

    }

    const uploadPost = async(file)=> {
        if(!user) return

       try{
            const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.join("/")}/${file.name}`
                : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

            const docRef = await addDoc(collections.files, {
                name: file.name,
                createdAt: serverTimestamp(),
                folderId: currentFolder?.id,
                userId: user.uid,
                size: file.size,
                type: file.type,
            })
        
            const fileRef = ref(storage, `/files/${user.uid}/${filePath}`)
            await uploadString(fileRef, file)
            .then( async () => {
                const downloadURL = await getDownloadURL(fileRef)
                await updateDoc(doc(db, 'files', docRef.id),{
                    downloadURL: downloadURL
                })
                toast.success(`Uploaded`);
            })
        }
        catch(error){
            toast.error("Something went wrong")
            console.error(error)
        }finally{
            setIsLoading(false)
            setCount(0)
        }
        
    }
    
    return(
        <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles) }>
        {({
            getRootProps, 
            getInputProps,
            isDragActive,
            isDragReject    ,
            fileRejections}) => {
                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
                return(
                    (
                        <section className={clsx('h-full w-full rounded-full transition overflow-hidden',
                            isDragActive ? "bg-neutral-200/30  animate-pulse " : "bg-transparent")}>
                            <div 
                            {...getRootProps({className: 'h-full w-full cursor-pointer text-gray-400 text-xs text-center  flex flex-col items-center justify-center'})}>
                                <input {...getInputProps()} />
                                <img src="/empty-state.jpg" className=" object-cover rounded-full  bg-transparent h-48 w-48" alt="" />
                                <div className='font-medium mt-2'>
                                {
                                    !isDragActive && <p>Click here or drop a file to upload!</p>
                                }
                                {
                                    isDragActive && !isDragReject && <p>Drop to upload a file!</p>
                                }
                                {
                                    isDragReject && <p>File type not accepted, sorry!</p>
                                }
                                {
                                    isFileTooLarge && <p>File is too large!</p>
                                }
                                </div>
                            </div>
                        </section>
                    )
                )
            }}
        </Dropzone>
    )
}



FileUpload.propTypes = {
    currentFolder: PropTypes.object,
    user: PropTypes.object,
    setCount: PropTypes.func,
    setIsLoading: PropTypes.func
}

export default FileUpload;