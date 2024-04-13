import Home from './components/Home'
import Header from './components/Header'
import { CartContextProvider } from './context/CartContext'
import './App.css'

const App = () => (
  <CartContextProvider>
    <Header />
    <Home />
  </CartContextProvider>
)

export default App
