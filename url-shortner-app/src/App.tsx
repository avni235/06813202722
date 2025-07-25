import { BrowserRouter, Routes, Route } from "react-router-dom"
import ShortenerPage from "./pages/ShortnerPage"
import StatsPage from "./pages/StatsPage"
import RedirectHandler from "./pages/RedirectHandler"

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  )
}
