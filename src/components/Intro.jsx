import { Form } from "react-router-dom"

import illustration from "../assets/illustration.jpg"



const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>Take Control of <span className='accent'>
                Your Stock</span></h1>

            <p>
                Accurate record is the secret to successful business.
                Start your journey today.
            </p>

            <Form method="POST">
                <input 
                type="text" 
                name='userName'
                required
                placeholder='Your name' 
                autoComplete='given-name' /> 

                <input type="hidden" name='_action' value='newUser' /> 
                <button type='submit' className='btn btn--dark'>Create Account</button>
            </Form>
        </div>
       <img src={illustration} alt="Person with money" width={600} />
    </div>
  )
}

export default Intro