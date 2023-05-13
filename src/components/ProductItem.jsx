
import { Form, Link } from 'react-router-dom'
import { calculateTotalPartByProduct, formatCurrency, formatPercent } from '../helpers'



const ProductItem = ({product, showDelete = false}) => {
    const {id, name, amount, color} = product
    const totalParts = calculateTotalPartByProduct(id)
    const ProfitAndLost = totalParts - amount
  return (
    <div 
    className='budget'
    style={{
      "--accent": color
    }}
    >

        <div className='progress-text'>
            <h3>{name}</h3>
            <p>{formatCurrency (amount)} Total Cost</p>
        </div>
        <progress max={amount} value={totalParts}>
         {formatPercent(totalParts / amount) }
        </progress>

        <div className='progress-text'>
            <small>{formatCurrency(totalParts)} Part</small>
            <small>{formatCurrency(ProfitAndLost)} {ProfitAndLost > 0 ? 'Profit' : 'Left'} </small>

        </div>

      {
        showDelete ? (
          <div className='flex-sm'>
<Form method='post'
action='delete'
onSubmit={(event) => {
  if (!confirm('Are you sure you want to delete this product?')) {
    event.preventDefault()
  }
}}>
  
  <button type='submit' className='btn'>Delete Product</button>
 
 
</Form>
</div>
        ) :
         (
<div className='flex-sm'> 
<Link to={`/product/${id}`} className='btn'>
<span>View Details</span>
</Link>
</div>

         )
      }

    </div>
  )
}

export default ProductItem