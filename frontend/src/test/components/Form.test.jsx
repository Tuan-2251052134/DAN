// src/test/Form.test.jsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Form from '../../components/form/Form';

// Mock react-router-dom hoàn toàn
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <div>{children}</div>,
}));

// Mock apiUtil
jest.mock('../../utils/apiUtil', () => ({
  authApiUtil: () => ({
    get: jest.fn(() => Promise.resolve({ data: { data: {} } })),
    post: jest.fn(() => Promise.resolve({ data: { data: {} } })),
    put: jest.fn(() => Promise.resolve({ data: { data: {} } })),
    delete: jest.fn(() => Promise.resolve({})),
  }),
  end_point: {
    test: '/test-endpoint',
    'test-detail': (id) => `/test-endpoint/${id}`,
  },
}));

describe('Form Component', () => {
  const fields = [
    { label: 'Name', type: 'text', key: 'name' },
    { label: 'Description', type: 'textarea', key: 'description' },
    { label: 'Status', type: 'select', key: 'status', data: [{ value: 'active', label: 'Active' }] },
  ];

  it('renders form fields correctly', () => {
    render(<Form fields={fields} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('submits the form without errors', async () => {
    const afterSubmitMock = jest.fn();

    render(<Form fields={fields} afterSubmit={afterSubmitMock} />);

    const nameInput = screen.getByLabelText('Name');
    const descInput = screen.getByLabelText('Description');
    const submitBtn = screen.getByRole('button', { name: /xác nhận/i });

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(descInput, { target: { value: 'Test Desc' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(afterSubmitMock).toHaveBeenCalled();
    });
  });
});
