
import { Link, useFetcher, useLoaderData } from "react-router-dom"
import { createPart, createProduct, deleteItem, fetchData } from "../helpers"
import Intro from "../components/Intro"
import { toast } from "react-toastify"
import AddProductForm from "../components/AddProductForm"
import AddPartForm from "../components/AddPartForm"
import ProductItem from "../components/ProductItem"
import Table from "../components/Table"



export function dashboardLoader() {
  const userName = fetchData("userName")  
  const products = fetchData("products") 
  const parts = fetchData("parts") 
  return{userName,products,parts}
}

export async function dashboardAction({request}) {
 const data = await request.formData()
 const {_action, ...values} = Object.fromEntries(data)
 
 if (_action === "newUser") {

  try {
    localStorage.setItem('userName', JSON.stringify(values.userName))
    return toast.success(`Hi, ${values.userName}! Welcome back!`)
   } catch (error) {
    throw new Error('There was a problem with your submission.')
   }
  
 }

 if (_action === "newProduct") {
  
  try {

    createProduct(
      {
        name: values.newProduct,
        amount: values.productAmount
      }
    )
  
    return toast.success(`Thanks for adding a new product!`)
  } catch (error) {
    
    throw new Error('There was a problem with your submission of new product.')
  }

 }


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




const Dashboard = () => {
    const {userName, products,parts} = useLoaderData()
  return (
    <div>


    {userName ? (


      <div className="dashboard">
<h1> Welcome back , <span className="accent">{userName}</span></h1>

<div className="grid-sm">

  { products && products.length > 0 ?
  
  <div className="grid-lg">
    <div className="flex-lg"> 
    <AddProductForm/>
    <AddPartForm products = {products}/> 
    </div>

    <h2>Existing Product</h2>
    <div className="budgets">
      {
        products.map((product) => (
          <ProductItem key={product.id} product={product}/>
        ))
      }

    </div>
       
       {
        parts && parts.length > 0 && (
          <div className="grid-md">
            <h2>Recent Parts</h2>

            <Table items={parts.sort((a,b) =>
              b.createdAt - a.createdAt ) . slice(0, 5)}/>

              {parts .length > 5 && (
                <Link to='parts' className="btn btn--dark"> 
                View All Part
                </Link>
              )}

            </div>
        )
       }
    </div>

    : (
      <div className="grid-sm">
        <p>Secret to a successful business is good book keeping.</p>
        <AddProductForm/>
      </div>
    )

  }

</div>







      </div>
   
   ): <Intro/>}

    </div>
  )
}

export default Dashboard
