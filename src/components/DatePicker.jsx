import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	isSameMonth,
	isToday,
	startOfMonth,
	startOfWeek,
} from "date-fns"
import { useState } from "react"

export function DatePicker({ value, onChange }) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<div className="date-picker-container">
				<button
					className="date-picker-button"
					onClick={() => {
						setIsOpen((cur) => !cur)
					}}
				>
					{value == null
						? "select a date"
						: format(value, "MMM do, yyyy")}
				</button>
				{isOpen && (
					<DatePickerModel onChange={onChange} value={value} />
				)}
			</div>
		</>
	)
}

function DatePickerModel({ onChange, value }) {
	const [visibleMonth, setVisibleMonth] = useState(value || new Date())
	const visibleDates = eachDayOfInterval({
		start: startOfWeek(startOfMonth(visibleMonth)),
		end: endOfWeek(endOfMonth(visibleMonth)),
	})
	function showPreviousMonth() {
		setVisibleMonth((current) => {
			return addMonths(current, -1)
		})
	}
	function showNextMonth() {
		setVisibleMonth((current) => {
			return addMonths(current, 1)
		})
	}
	return (
		<>
			<div className="date-picker">
				<div className="date-picker-header">
					<button
						className="prev-month-button month-button"
						onClick={showPreviousMonth}
					>
						&larr;
					</button>
					<div className="current-month">
						{format(visibleMonth, "MMM - yyyy")}
					</div>
					<button
						className="next-month-button month-button"
						onClick={showNextMonth}
					>
						&rarr;
					</button>
				</div>
				<div className="date-picker-grid-header date-picker-grid">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</div>
				<div className="date-picker-grid-dates date-picker-grid">
					{visibleDates.map((date) => {
						return (
							<button
								onClick={() => onChange(date)}
								className={`date ${
									!isSameMonth(date, visibleMonth) &&
									"date-picker-other-month-date"
								} ${
									isSameDay(date, value) &&
									"selected"
								}  ${isToday(date) && "today"}`}
								key={date.toDateString()}
							>
								{date.getDate()}
							</button>
						)
					})}
				</div>
			</div>
		</>
	)
}
