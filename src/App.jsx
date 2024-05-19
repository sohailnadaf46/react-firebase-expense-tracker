import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/auth/Auth.jsx"
import Expense from "./pages/expense-tracker/Expense.jsx"

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/expense-tracker" element = {<Expense />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
