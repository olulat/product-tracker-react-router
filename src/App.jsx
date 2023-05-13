import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { mainLoader } from './layout/Main';


import { logoutAction } from './action/logout';
import { deleteProduct } from './action/deleteProduct';


import Parts, { partAction, partsLoader } from './pages/Parts';
import Product, { productAction, productLoader } from './pages/Product';




const router = createBrowserRouter([
  {
    path: '/',
    element:<Main/>,
    loader: mainLoader,
    errorElement:<Error/>,
    children: [
      {
        index:true,
        element:<Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement:<Error/>
      },
      {
        path: 'parts',
        element:<Parts/>,
        loader: partsLoader,
        action: partAction,
        errorElement:<Error/>
        
       
      },
      {
        path: 'product/:id',
        element:<Product/>,
        loader: productLoader,
        action: productAction,
        errorElement:<Error/>,

        children: [
          {
             path: 'delete',
             action: deleteProduct,
          }
        ]
        
       
      },
      {
        path:'logout',
        action: logoutAction,
      }
    ]

  },
 
])


function App() {
  return <div className="App">
    <RouterProvider router={router}/>
    <ToastContainer/>
  </div>;
}

export default App;

