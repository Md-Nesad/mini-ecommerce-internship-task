'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Get cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    // we will get updated cart state in the previous state
    setCartItems((prev) => {
      //Check if the product already exists in the cart
      const existsProduct = prev.find((item) => item.id === product.id)
      //if it exists, increase the quantity, otherwise add it to the cart
      if (existsProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        //if cart is empty or product does not exist, add it with quantity 1
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext>
  )
}

export const useCart = () => useContext(CartContext)
