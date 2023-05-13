import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItem } from "../helpers";
import { redirect } from "react-router-dom";



export function deleteProduct({params}) {
    try {
        deleteItem({
            key:'products',
            id:params.id
        })

        const associatedParts = getAllMatchingItem({
            key:'parts',
            key:"productId",
            value:params.id
        })

                associatedParts.forEach(part => {
                    deleteItem({
                        key:'parts',
                        id:part.id
                    })
                })

        toast.success('Product deleted successfully')
    } catch (error) {
        throw new Error('there was an error deleting the product')
    }

    return redirect('/')
}

deleteItem