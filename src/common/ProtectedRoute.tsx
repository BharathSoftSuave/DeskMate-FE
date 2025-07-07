import { Navigate} from 'react-router-dom';
import MainBoard from '../components/Layout/MainBoard';
const ProtectedRoute = () => {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
  return (isAuthenticated ? <MainBoard/> : <Navigate to="/login" replace />)
}

export default ProtectedRoute