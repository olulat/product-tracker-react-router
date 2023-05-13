import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useFetcher } from 'react-router-dom'



const AddProductForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'submitting'
  const formRef = useRef()
  const focusRef = useRef()

  useEffect (() => {
    if (!isSubmitting) {
          formRef.current.reset()
          focusRef.current.focus()
        }
  },[isSubmitting])
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Create Product</h2>

        <fetcher.Form
        method='post'
        className='grid-sm'
        ref={formRef}
        >

            <div className='grid-xs'>
               <label htmlFor='newProduct'>Product Name</label>
            <input 
            type="text" 
            name='newProduct' 
            id='newProduct'
            placeholder='e.g., Iphone'
            required
            ref={focusRef}
             />
            </div>


            <div className='grid-xs'>
            <label htmlFor='amount'>Amount</label>
            <input 
            type="number"
            step='0.01'
            name='productAmount' 
            id='amount'
            placeholder='£ 300'
            inputMode='decimal'
            required
             />
            </div>

            <input type="hidden" name='_action' value='newProduct' />

            <button 
            type='submit' 
            className='btn btn--dar'
            disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
        </fetcher.Form>

    </div>
  )
}



export default AddProductForm