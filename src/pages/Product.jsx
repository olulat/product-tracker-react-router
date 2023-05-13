import { useLoaderData } from "react-router-dom"
import { createPart, deleteItem, getAllMatchingItem } from "../helpers"
import ProductItem from "../components/ProductItem"
import AddPartForm from "../components/AddPartForm"
import Table from "../components/Table"
import { toast } from "react-toastify"



export async function productLoader({params}){
    const product = await getAllMatchingItem({
        category: "products",
        key: "id",
        value: params.id
    }) [0]


    const parts = await getAllMatchingItem({
        category: "parts",
        key: "productId",
        value: params.id
    })

    if(!product){
        throw new Error("Product not found")
    }
    return {product,parts}
}

export async function productAction({request}) {
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)

    if (_action === "createPart") {
  
        try {
      
          createPart(
            {
              name: values.newPart,
              amount: values.newPartPrice,
              productId: values.productInStore,
            }
          )
        
          return toast.success(`Thanks for adding a new part!`)
        } catch (error) {
          
          throw new Error('There was a problem with your submission of new part.')
        }
      
       }
  
    if (_action === "deleteItem") {
    
      try {
    deleteItem({
      key: "parts",
      id: values.itemId
    })
      
        return toast.success(`I tem deleted!`)
      } catch (error) {
        
        throw new Error('Problem with deleting item.')
      }
    
     }
  }
  

const Product = () => {
    const {product,parts} = useLoaderData()
  return (
    <div 
    className="grid-lg"
    style={{
        "--accent": product.color,
    }}
    >
        <h1 className="h2">
         <span className="accent">{product.name} </span>
         Overview
        </h1>

        <div className="flex-lg">
         <ProductItem product={product} showDelete={true}/>
         <AddPartForm products ={[product]}/>
        </div>

        {
            parts && parts.length > 0 &&  (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{product.name}</span>
                    </h2>
                    <Table items={parts} showItemBtn={false}/>
                </div>
            )
        }
    </div>
  )
}



export default Product