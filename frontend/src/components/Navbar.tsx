import { checkUserAuthenticated } from '../store/checkUserAuthentication'
 
 const Navbar = () => {
  const {authenticatedUser} = checkUserAuthenticated() 
  return (
     <div>
       
    <span className="loading loading-ring loading-md"></span>
     </div>
   )
 }
 
 export default Navbar
 