import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './lib/PageNotFound';
import Layout from '@/components/site/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';

function App() {
    return (
        <QueryClientProvider client={queryClientInstance}>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
            <Toaster />
        </QueryClientProvider>
    )
}

export default App