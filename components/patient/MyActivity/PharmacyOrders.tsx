'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type PharmacyOrder = {
  id: string
  pharmacyName: string
  pharmacyPhoto: string
  products: { name: string; price: number; quantity: number }[]
  date: string
  totalPrice: number
}

export default function PharmacyOrders() {
  const [orders, setOrders] = useState<PharmacyOrder[]>([
    { 
      id: '1', 
      pharmacyName: 'City Pharmacy', 
      pharmacyPhoto: '/placeholder.svg', 
      products: [
        { name: 'Aspirin', price: 5, quantity: 2 },
        { name: 'Vitamin C', price: 10, quantity: 1 }
      ],
      date: '2023-06-10',
      totalPrice: 20
    },
    { 
      id: '2', 
      pharmacyName: 'Health Plus', 
      pharmacyPhoto: '/placeholder.svg', 
      products: [
        { name: 'Antibiotic', price: 15, quantity: 1 },
        { name: 'Bandages', price: 5, quantity: 2 }
      ],
      date: '2023-06-12',
      totalPrice: 25
    },
  ])

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <Card key={order.id} className="w-full">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <Avatar>
                  <AvatarImage src={order.pharmacyPhoto} alt={order.pharmacyName} />
                  <AvatarFallback>{order.pharmacyName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{order.pharmacyName}</h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
              </div>
            </div>
            <div>
            <div className="flex justify-between">

<h4 className="font-semibold mb-2">Products:</h4>
<h4 className="font-semibold mb-2">Unit Price</h4>
      </div>
              <ul className="space-y-1">
                {order.products.map((product, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{product.name} (x{product.quantity})</span>
                    <span>${product.price * product.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 text-right font-semibold">
              Total: ${order.totalPrice}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

