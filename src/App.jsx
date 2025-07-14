import  {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Product from './components/Product'  
import {db} from './data/db'
import './App.css'

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  const MIN_ITEMS = 1
  const MAX_ITEMS = 10

  function addToCart(item) {
    const itemExists = cart.findIndex(product => product.id === item.id) 
    if (itemExists >=0 ) {
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
      console.log("Ya existe en el carrito")
      console.log(item)
    } else {
      item.quantity = 1
      setCart([...cart, item])
      console.log("Agregado al carrito")  
      console.log(item)
  }
}

  function removeFromCart(id) {
    const updateCart = cart.filter(product => product.id !== id)
    setCart(updateCart)

  }

function increaseQuantity(id){
const updateCart = cart.map( item => { 
  if (item.id === id && item.quantity < MAX_ITEMS) { 
    return {
      ...item,
      quantity: item.quantity + 1
    }
  }
  return item
})
setCart(updateCart)
}

function decreaseQuantity(id){
const updateCart = cart.map( item => { 
  if (item.id === id && item.quantity > MIN_ITEMS) { 
    return {
      ...item,
      quantity: item.quantity - 1
    }
  }
  return item
})
setCart(updateCart)
}

function clearCart(e) {
  setCart([])
}




  return (
    <>
    <Header
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
      <div className="row mt-5">

        {data.map((product) => (
          <Product 
          key={product.id}
          product={product}
          addToCart={addToCart}
          />
        ))}
        
        </div>
    </main>

    <Footer />

    </>
  )
}

export default App
