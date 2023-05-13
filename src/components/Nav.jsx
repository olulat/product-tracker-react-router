
import { Form, NavLink } from "react-router-dom"
import logomark from "../assets/logomark.svg"



const Nav = ({userName}) => {
  return (
    <nav>

        <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="logo" height={30} />
        <span>ProductTracker</span>
        </NavLink>

        {
            userName&&(
                <Form method="POST" action="/logout"
                      onSubmit={(event) =>{
                        if(!confirm('Are you sure you want to logout?')){
                            event.preventDefault();
                        }
  
                      }} 
                >
                 <button type="submit" className="btn btn--warning">
                    Logout
                    </button>

                </Form>
            )
        }

    </nav>
  )
}

export default Nav