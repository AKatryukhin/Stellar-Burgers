import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, currentUser }) => {
  return currentUser ? <Navigate to="/login" replace /> : children;
};

// export const ProtectedRoute = ({ children, ...rest }) => {
//   let { getUser, ...auth } = useAuth();
//   const [isUserLoaded, setUserLoaded] = useState(false);
//
//   const init = async () => {
//     await getUser();
//     setUserLoaded(true);
//   };
//
//   useEffect(() => {
//     init();
//   }, []);
//
//   if (!isUserLoaded) {
//     return null;
//   }
//
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         auth.user ? (
//           children
//         ) : (
//           // Если пользователя нет в хранилище, происходит переадресация на роут /login
//           <Redirect
//             to='/login'
//           />
//         )
//       }
//     />
//   );
// }
