import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OffersPage from './pages/OffersPage';
import ResourcesPage from './pages/ResourcesPage';
import OfferDetailsPage from './pages/OfferDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OffersPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/offer/:id" element={<OfferDetailsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;