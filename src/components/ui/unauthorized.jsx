

const Unauthorized = () => {
  return (
    <div className="h-screen w-full bg-black">
        <div className="h-full flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold font-sans">401 Unauthorized</h2>
            <p className="mt-2 text-gray-500 text-xs text-center">You do not have access to this page</p>
        </div>
    </div>
  )
}

export default Unauthorized