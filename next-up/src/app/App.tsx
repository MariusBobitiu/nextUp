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
// import Swiper from '@/pages/Swiper'
// import AiPoweredSearch from '@/pages/AiPoweredSearch'
import Layout from '@/components/layout/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import Search from '@/pages/Search'
import SignUp from '@/pages/SignUp'
import SignIn from '@/pages/SignIn'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import SignOut from '@/pages/SignOut'
import Profile from '@/pages/Profile'
import MovieDetails from '@/pages/MovieDetails'
import TvDetails from '@/pages/TvDetails'
import MovieDetailsCast from '@/pages/MovieDetailsCast'
import MovieDetailsVideo from '@/pages/MovieDetailsVideo'
import MovieDetailsImages from '@/pages/MovieDetailsImages'
import MovieDetailsPosters from '@/pages/MovieDetailsPosters'
import { Suspense } from 'react'
import Loading from '@/components/layout/Loading'
import Settings from '@/pages/Settings'

const queryClient = new QueryClient()

const App = () => {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Router>
            <Layout>
              <Routes>
                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* SEARCH */}
                <Route path="/search" element={<Search />} />
                <Route path="/search?search=:searchTerm" element={<Search />} />

                {/* CATEGORIES */}
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/categories"
                  element={<Navigate to="/categories" />}
                />
                <Route path="/categories/movie/:id" element={<MovieCategory />} />
                <Route path="/categories/tv/:id" element={<TVCategory />} />

                {/* AUTHORIZATION */}
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-out" element={<SignOut />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />

                {/* Movie/TV Details */}
                <Route path="/movie/:slug" element={<MovieDetails />} />
                <Route path="/tv/:slug" element={<TvDetails />} />
                <Route path="/movie/:slug/cast" element={<MovieDetailsCast />} />
                <Route path='/movie/:slug/videos' element={<MovieDetailsVideo />} />
                <Route path='/movie/:slug/images' element={<MovieDetailsImages />} />
                <Route path='/movie/:slug/posters' element={<MovieDetailsPosters />} />

                {/* USER */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* LATER IMPLEMENTATION */}
                {/* <Route path="/swiper" element={<Swiper />} />
                <Route path="/ai-powered-search" element={<AiPoweredSearch />} /> */}
              </Routes>
            </Layout>
          </Router>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
