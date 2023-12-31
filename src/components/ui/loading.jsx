import { Loader } from "lucide-react";

const Loading = () => {
    return ( 
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="animate-spin text-gray-500" size={20} />
    </div>
     );
}
 
export default Loading;