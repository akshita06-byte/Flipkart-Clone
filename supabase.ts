import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// UUID validation helper
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Orders API
export async function getOrders(userId: string) {
  // Skip database query if userId is invalid format
  if (!userId || !isValidUUID(userId)) {
    console.warn('Invalid user ID format:', userId)
    return []
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }
  
  // Format orders to include nested address object
  const formattedOrders = (data || []).map((order: any) => ({
    ...order,
    address: {
      name: order.address_name,
      street: order.address_street,
      city: order.address_city,
      state: order.address_state,
      pincode: order.address_pincode
    },
    order_items: (order.order_items || []).map((item: any) => ({
      ...item,
      title: item.product_title
    }))
  }))
  
  return formattedOrders
}

export async function createOrder(
  userId: string,
  orderData: {
    order_id: string
    total: number
    address: {
      name: string
      street: string
      city: string
      state: string
      pincode: string
    }
    items: Array<{
      product_id: string
      title: string
      quantity: number
      price: number
    }>
  }
) {
  // Validate UUID format
  if (!isValidUUID(userId)) {
    console.error('Invalid user ID format:', userId)
    return null
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      id: orderData.order_id,
      total: orderData.total,
      address_name: orderData.address.name,
      address_street: orderData.address.street,
      address_city: orderData.address.city,
      address_state: orderData.address.state,
      address_pincode: orderData.address.pincode,
      status: 'pending',
      is_successful: true
    })
    .select()

  if (error) {
    console.error('Error creating order:', error)
    return null
  }

  if (data && data.length > 0) {
    const orderId = orderData.order_id

    // Insert order items
    const orderItems = orderData.items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_title: item.title,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      return null
    }
  }

  return data?.[0] || null
}

// Products API
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data || []
}

export async function addProduct(productData: {
  title: string
  price: number
  original_price: number
  image: string
  rating: number
  reviews: number
  discount: number
  category: string
  description: string
  specifications: Record<string, string>
}) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()

  if (error) {
    console.error('Error adding product:', error)
    return null
  }
  return data?.[0] || null
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    console.error('Error deleting product:', error)
    return false
  }
  return true
}

export async function updateProduct(productId: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()

  if (error) {
    console.error('Error updating product:', error)
    return null
  }
  return data?.[0] || null
}
