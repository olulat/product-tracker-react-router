export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const generateRandomColor = () => {
  const existingProductLength = fetchData('products')?.length ?? 0
  // return '#' + existingProductLength * 34` 65% 50%`
  return `${existingProductLength * 34} 65% 50%`
}



export const deleteItem = ({key, id}) => {
  const existingItem = fetchData(key)
 
  if (id) {
    const newData = existingItem.filter((item) => item.id !== id)
    return localStorage.setItem(key, JSON.stringify(newData))
  }
  return localStorage.removeItem(key)
}


export const createProduct = ({
  name,
  amount,
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor()
    
  }

  const existingProducts = fetchData('products')??[]

  return localStorage.setItem('products', JSON.stringify([...existingProducts, newItem]))
}


export const createPart = ({
  name,
  amount,
  productId,
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: +amount,
    createdAt: Date.now(),
    productId
    
  }

  const existingParts = fetchData('parts')??[]

  return localStorage.setItem('parts', JSON.stringify([...existingParts, newItem]))
}

export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined,
    {style: 'currency', currency: 'GBP'})
}




export const calculateTotalPartByProduct = (productId) => {
  const existingParts = fetchData('parts')??[]
  const partsByProduct = existingParts.reduce(
    (acc, part) => {
     
      if (part.productId !== productId) return acc

      return acc += part.amount
      
      
      }, 0)
    
  return partsByProduct
}


export const formatPercent = (amount) => {
  return amount.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  })
}

export const formatDateToLocaleString = (date) => 
  new Date(date).toLocaleDateString()

export const getAllMatchingItem = ({category, key, value}) => {
  const data = fetchData(category)??[]  
  return data.filter(item => item[key] === value)
}
