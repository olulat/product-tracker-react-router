import React from 'react'
import { formatCurrency, formatDateToLocaleString, getAllMatchingItem } from '../helpers'
import { Link, useFetcher } from 'react-router-dom'

const TableItem = ({item, showItemBtn}) => {
  const fetcher = useFetcher()
  const product = getAllMatchingItem({
    category: "products",
    key:"id",
    value: item.productId
  })[0]
  return (
    <>
    
    <td>{item.name}</td>
    <td>{formatCurrency(item.amount)}</td>
    <td>{formatDateToLocaleString(item.createdAt)}</td>

    {showItemBtn && (
    <td>
      

     
      <Link 
    to={`/product/${product.id}`}
    style={{"--accent":product.color}}
    >
    {product.name}
    </Link></td>

)}

     <td>
      <fetcher.Form
      method='post'>
        <input type="hidden" name='_action' value="deleteItem" />
        <input type="hidden" name='itemId' value={item.id} />
           
        <button type='submit' className='btn btn--warning' aria-label={`Delete ${item.name} item`}>
          Delete
        </button>

      </fetcher.Form>

     </td>
    </>
  
  )
}




export default TableItem