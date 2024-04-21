import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from '@/pages/Home'
import Categories from '@/pages/Categories'
import MovieCategory from '@/pages/MovieCategory'
import TVCategory from '@/pages/TVCategory'
import Swiper from '@/pages/Swiper'
import AiPoweredSearch from '@/pages/AiPoweredSearch'
import Layout from '@/components/layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/?search=:searchTerm" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route
                path="/categories/categories"
                element={<Navigate to="/categories" />}
              />
              <Route path="/categories/movie/:id" element={<MovieCategory />} />
              <Route path="/categories/tv/:id" element={<TVCategory />} />
              <Route path="/swiper" element={<Swiper />} />
              <Route path="/ai-powered-search" element={<AiPoweredSearch />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
