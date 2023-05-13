import { Link, useNavigate, useRouteError } from "react-router-dom"



const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate()
    return (
      <div className="error">
        <h1>We've got a problem </h1>
        <p>{error.message || error.statusText}</p>

        <div className="flex-md">
         
          <Link to='/'
          className="btn btn--dark">
          <span>Home</span>
          </Link>

          <button>
          <span 
          className="btn btn--dark"
          onClick={() => navigate(-1)}
          >Back</span>
          </button>

        </div>
      </div>
    )
  return (
    <div>Error</div>
  )
}

export default Error