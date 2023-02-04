import ReactDOM from 'react-dom'
import { unmountComponentAtNode } from 'react-dom'
import MainApp from './App'
test('Renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<MainApp />, div)
	unmountComponentAtNode(div)
})
