import { useEffect, useRef } from "react"
import { useFetcher } from "react-router-dom"




const AddPartForm = ({products}) => {

    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    const isSubmitting = fetcher.state === 'submitting'

    useEffect (() => {
        if (!isSubmitting) {
              formRef.current.reset()
              focusRef.current.focus()
            }
      },[isSubmitting])
    
  return (
    <div className='form-wrapper'>
        <h2 className='h3'> Add New <span className='accent'>
        {products.length=== 1 && `${products.map((productList) => productList.name)}`}
        </span> {" "} Part</h2>
       
       <fetcher.Form
       method="POST"
       className="grid-sm"
       ref={formRef}
       >
        <div className="expense-inputs">
            <div className="grid-xs">
                <label htmlFor="newPart">Part Name</label>
                <input type="text" name="newPart" id="newPart" placeholder="e.g., screen" ref={focusRef} required />

            </div>

            <div className="grid-xs">
                <label htmlFor="newPartPrice">Price</label>
                <input type="number"  
                step='0.01' 
                inputMode="decimal"
                name="newPartPrice" 
                id="newPartPrice" 
                placeholder="e.g., 400.50" 
                required />

            </div>
        </div>

        <div className="grid-xs" hidden={products.length === 1}>
            <label htmlFor="productInStore">
                Select Product
            </label>
            <select name="productInStore" id="productInStore" required>
                {
                    products.sort((a, b) => a.createdAt - b.createdAt)
                    .map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))
                }
                
            </select>

        </div>

        <input type="hidden" name="_action" value='createPart' />

        <button 
            type='submit' 
            className='btn btn--dar'
            disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Add Part'}
            </button>

       </fetcher.Form>

    </div>
  )
}

export default AddPartForm