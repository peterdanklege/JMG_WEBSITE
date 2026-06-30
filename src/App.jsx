import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './lib/PageNotFound';
import Layout from '@/components/site/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClientInstance}>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
                <Toaster />
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default App