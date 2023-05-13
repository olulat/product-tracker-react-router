
import { useLoaderData } from "react-router-dom"
import { deleteItem, fetchData } from "../helpers"

import Table from "../components/Table"
import { toast } from "react-toastify"




export function partsLoader() {
  const parts = fetchData("parts") 
  return{parts}
}


export async function partAction({request}) {
  const data = await request.formData()
  const {_action, ...values} = Object.fromEntries(data)

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

const Parts = () => {
    const { parts } = useLoaderData()
        return (
          <div className="grid-lg">
            <h1>All Parts</h1>
            {
                parts && parts.length > 0? (
                  
                    <div className="grid-md">
                        <h2>Recent Parts <small>({parts.length} total)</small></h2>

                        <Table items={parts}/>

                    </div>

                )
                :
                <p>No parts to show</p>
            }
          </div>
        )
  return (
    <div>Parts</div>
  )
}

export default Parts