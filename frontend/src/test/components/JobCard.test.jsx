// src/test/JobCard.test.jsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import JobCard from '../../components/jobCard/JobCard';

// Mock react-router useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockedNavigate,
}));

// Mock statusUtil
jest.mock('../../utils/statusUtil', () => ({
  statusMap: {
    FAIL: { name: 'Từ chối', color: 'red' },
    WAIT: { name: 'Đợi', color: '#FFC107' },
    PASS: { name: 'Chấp nhận', color: 'green' },
  },
}));

// Mock timeUtil
jest.mock('../../components/jobCard/timeUtil', () => ({
  convertToDate: (date) => '01-01-2025, 12:00',
}));

describe('JobCard Component', () => {
  const defaultProps = {
    typeName: 'Công việc',
    name: 'Test Job',
    createdDate: '2025-01-01T12:00:00Z',
    expiredDate: '2025-01-10T12:00:00Z',
    status: 'PASS',
    id: 1,
    url: '/custom-url',
  };

  it('renders job details correctly', () => {
    render(<JobCard {...defaultProps} />);
    
    expect(screen.getByText('Công việc')).toBeInTheDocument();
    expect(screen.getByText('Test Job')).toBeInTheDocument();
    expect(screen.getByText(/ngày tạo:/)).toBeInTheDocument();
    expect(screen.getByText(/ngày hết hạn:/)).toBeInTheDocument();
    expect(screen.getByText(/trạng thái:/)).toBeInTheDocument();

    const statusElement = screen.getByText(/trạng thái:/);
    expect(statusElement).toHaveStyle('color: green'); // PASS color
    expect(statusElement).toHaveTextContent('Chấp nhận');
  });

  it('navigates to custom url when button clicked', () => {
    render(<JobCard {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /Xem chi tiết/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/custom-url/1');
  });

  it('navigates to default url when url prop is not provided', () => {
    const props = { ...defaultProps, url: undefined };
    render(<JobCard {...props} />);
    
    const button = screen.getByRole('button', { name: /Xem chi tiết/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/business/job/1');
  });

  it('does not render status when status prop is undefined', () => {
    const props = { ...defaultProps, status: undefined };
    render(<JobCard {...props} />);

    expect(screen.queryByText(/trạng thái:/)).toBeNull();
  });
});
