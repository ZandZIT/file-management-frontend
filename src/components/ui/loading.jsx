import clsx from "clsx";
import { Loader } from "lucide-react";
import PropTypes from 'prop-types'

const Loading = ({large = ""}) => {
    return ( 
    <div className={clsx("flex items-center justify-center",
      large && "h-screen" )}>
      <Loader className="animate-spin text-gray-500" size={large ? 26 : 20} />
    </div>
     );
}
 
Loading.propTypes = {
  large: PropTypes.string
}
export default Loading;