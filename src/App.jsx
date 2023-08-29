import { useState } from "react"
import { DatePicker } from "./components/DatePicker"

export default function App() {
	const [value, setValue] = useState()
	return <DatePicker value={value} onChange={setValue} />
}
