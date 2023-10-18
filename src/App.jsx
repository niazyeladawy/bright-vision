
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './features/auth/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/login"
            element={

              <Login />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
