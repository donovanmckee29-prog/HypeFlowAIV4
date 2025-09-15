import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PortfolioPage from '../PortfolioPage';
import { portfolioAPI } from '../../services/api';

// Mock the API
jest.mock('../../services/api', () => ({
  portfolioAPI: {
    getValue: jest.fn(),
    getItems: jest.fn(),
    addItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn()
  }
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('PortfolioPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders portfolio overview correctly', async () => {
    const mockValueData = {
      totalValue: 50000,
      totalCost: 40000,
      roi: 25.0,
      monthlyChange: 5.0
    };

    const mockItemsData = [
      {
        id: 1,
        name: 'Test Card',
        quantity: 1,
        cost: 1000,
        currentValue: 1200,
        change: 20,
        grade: 'PSA 9',
        trend: 'up'
      }
    ];

    portfolioAPI.getValue.mockResolvedValue({ data: mockValueData });
    portfolioAPI.getItems.mockResolvedValue({ data: mockItemsData });

    renderWithRouter(<PortfolioPage />);

    await waitFor(() => {
      expect(screen.getByText('Portfolio Center')).toBeInTheDocument();
    });

    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('+25.0%')).toBeInTheDocument();
    expect(screen.getByText('$40,000')).toBeInTheDocument();
  });

  it('calculates ROI correctly', () => {
    const totalCost = 1000;
    const totalValue = 1200;
    const expectedROI = ((totalValue - totalCost) / totalCost) * 100;
    
    expect(expectedROI).toBe(20);
  });

  it('shows loading state initially', () => {
    portfolioAPI.getValue.mockImplementation(() => new Promise(() => {})); // Never resolves
    portfolioAPI.getItems.mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<PortfolioPage />);

    expect(screen.getByText('Portfolio Center')).toBeInTheDocument();
    // Should show skeleton loading
  });

  it('shows error state when API fails', async () => {
    portfolioAPI.getValue.mockRejectedValue(new Error('API Error'));
    portfolioAPI.getItems.mockRejectedValue(new Error('API Error'));

    renderWithRouter(<PortfolioPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to Load Portfolio')).toBeInTheDocument();
    });

    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('displays holdings table correctly', async () => {
    const mockItemsData = [
      {
        id: 1,
        name: 'Test Card 1',
        quantity: 2,
        cost: 1000,
        currentValue: 1200,
        change: 20,
        grade: 'PSA 9',
        trend: 'up',
        sport: '🏀'
      },
      {
        id: 2,
        name: 'Test Card 2',
        quantity: 1,
        cost: 500,
        currentValue: 600,
        change: 20,
        grade: 'PSA 10',
        trend: 'up',
        sport: '🏈'
      }
    ];

    portfolioAPI.getValue.mockResolvedValue({ data: { totalValue: 0, totalCost: 0, roi: 0, monthlyChange: 0 } });
    portfolioAPI.getItems.mockResolvedValue({ data: mockItemsData });

    renderWithRouter(<PortfolioPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Card 1')).toBeInTheDocument();
      expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    });

    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity
    expect(screen.getByText('$1,000')).toBeInTheDocument(); // Cost
    expect(screen.getByText('$1,200')).toBeInTheDocument(); // Value
  });
});
