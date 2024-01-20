
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types'

export default function DateSelect({
    startDate, setStartDate, title
}) {
  return (
    <div className="space-y-2">
        <h2 className="text-sm pb-2 text-neutral-500">Please select {title} date</h2>
        <DatePicker
        className="p-2 ring-2 ring-neutral-400/50 text-xs w-[200px] focus:outline-none focus:border-none rounded-md focus-visible:ring-neutral-900 placeholder:text-xs placeholder:text-gray-500/70"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        isClearable
        placeholderText="Pick a date"
        />
        {title === "expiry" && <h2 className="text-[10px] text-neutral-400 font-light tracking-wider">[This is optional]</h2>}
        {title === "reminder" && <h2 className="text-[10px] text-neutral-400 font-light tracking-wider">[This is optional]</h2>}

    </div>
    
  )
}

DateSelect.propTypes = {
    title: PropTypes.string,
    startDate: PropTypes.object,
    setStartDate: PropTypes.func
}