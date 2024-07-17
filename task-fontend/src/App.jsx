import { Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BannerUpload from './components/BannerUpload';
import CreateFAQs from './components/CreateFAQs';
const App = () => {
  // const location = window.location.hostname.split(".")[0]
  // console.log(location)
  return (
    <>
      <Routes >
        <Route element={<Layout />} >
          <Route path='' index element={<Home />} />
          <Route path='login' index element={<Login />} />
          <Route path='signup' index element={<SignUp />} />
          <Route path='admin/banner' element={<BannerUpload />} />
          <Route path='admin/faqs' element={<CreateFAQs />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
