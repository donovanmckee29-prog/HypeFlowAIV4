import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NavBar', () => {
  it('renders all navigation links', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('🔬 AI Grader')).toBeInTheDocument();
    expect(screen.getByText('📈 Market Scan')).toBeInTheDocument();
    expect(screen.getByText('🌌 Oracle')).toBeInTheDocument();
    expect(screen.getByText('💼 Portfolio')).toBeInTheDocument();
    expect(screen.getByText('🧭 Compass')).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: '🔬 AI Grader' })).toHaveAttribute('href', '/grader');
    expect(screen.getByRole('link', { name: '📈 Market Scan' })).toHaveAttribute('href', '/market');
    expect(screen.getByRole('link', { name: '🌌 Oracle' })).toHaveAttribute('href', '/oracle');
    expect(screen.getByRole('link', { name: '💼 Portfolio' })).toHaveAttribute('href', '/portfolio');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByLabelText('Go to Home')).toBeInTheDocument();
    expect(screen.getByLabelText('AI Grader')).toBeInTheDocument();
    expect(screen.getByLabelText('Market Scanner')).toBeInTheDocument();
    expect(screen.getByLabelText('AI Oracle')).toBeInTheDocument();
    expect(screen.getByLabelText('Portfolio')).toBeInTheDocument();
    expect(screen.getByLabelText('Investment Compass')).toBeInTheDocument();
  });

  it('renders logo with correct text', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByText('∞ INFINITY')).toBeInTheDocument();
    expect(screen.getByText('THE SINGULARITY OF SPORTS CARD INTELLIGENCE')).toBeInTheDocument();
  });
});
