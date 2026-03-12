'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Order {
  id: string
  date: string
  items: Array<{ id: string; title: string; quantity: number; price: number }>
  total: number
  address: { name: string; street: string; city: string; state: string; pincode: string }
  status: 'pending' | 'shipped' | 'delivered'
  isSuccessful?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  isAdmin?: boolean
}

interface UserContextType {
  user: User | null
  orders: Order[]
  isLoggedIn: boolean
  isAdmin: boolean
  lastOrderSuccess: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addOrder: (order: Order) => void
  clearLastOrderSuccess: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const DEMO_CREDENTIALS = {
  email: 'demo@flipkart.com',
  password: 'demo123'
}

const ADMIN_CREDENTIALS = {
  email: 'admin@flipkart.com',
  password: 'admin123'
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [mounted, setMounted] = useState(false)
  const [lastOrderSuccess, setLastOrderSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Clear all old localStorage data to start fresh
    localStorage.removeItem('user')
    localStorage.removeItem('orders')
    setUser(null)
    setOrders([])
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const newUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Demo User',
        email: email,
        phone: '+91 9999999999',
        isAdmin: false
      }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      return true
    }
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const newUser: User = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Admin',
        email: email,
        phone: '+91 9999999999',
        isAdmin: true
      }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const addOrder = (order: Order) => {
    const newOrder = { ...order, isSuccessful: true }
    const newOrders = [newOrder, ...orders]
    setOrders(newOrders)
    setLastOrderSuccess(true)
    localStorage.setItem('orders', JSON.stringify(newOrders))
  }

  const clearLastOrderSuccess = () => {
    setLastOrderSuccess(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        orders,
        isLoggedIn: !!user,
        isAdmin: user?.isAdmin ?? false,
        lastOrderSuccess,
        login,
        logout,
        addOrder,
        clearLastOrderSuccess
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
