import React from 'react'
import ReactDOM from 'react-dom/client'
import '@nutui/nutui-react-taro/dist/style.css'
import SubsidyPage from './pages/subsidy'

function App() {
  return <SubsidyPage />
}

const mountNode = document.getElementById('app')
if (mountNode) {
  ReactDOM.createRoot(mountNode).render(<App />)
}

export default App
