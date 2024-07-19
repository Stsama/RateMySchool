import React, { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';



const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    navigate('/');
  }, [setCurrentUser, navigate]);

  return null; // Retourne null ou un fragment vide car rien ne doit être affiché
};
// const Logout = () => {
//   const { setCurrentUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   setCurrentUser(null);
//   return (
//     navigate('/')
//   )
// }

 export default Logout