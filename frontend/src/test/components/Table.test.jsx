import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from '../../components/table/Table';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

const mockGet = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../utils/apiUtil', () => ({
  authApiUtil: () => ({
    get: mockGet,
    delete: mockDelete,
  }),
  end_point: {
    users: '/api/users',
    'users-detail': (id) => `/api/users/${id}`,
  },
}));

jest.mock('../../utils/errorAlertUtil', () => ({
  handleError: jest.fn(),
}));

jest.mock('../../components/searchBar/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('../../components/Loading/Loading', () => () => <div>Loading...</div>);

describe('Table component (NO Router)', () => {
  const listData = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
  ];

  const fields = ['name', 'email'];
  const searchFields = ['name', 'email'];
  const url = '/users';
  const endPointKey = 'users';

  beforeEach(() => {
    mockNavigate.mockClear();
    mockGet.mockClear();
    mockDelete.mockClear();
  });

  test('renders table rows', async () => {
    mockGet.mockResolvedValue({ data: { data: listData } });

    render(
      <Table
        list={listData}
        setList={() => {}}
        url={url}
        endPointKey={endPointKey}
        fields={fields}
        searchFields={searchFields}
      />
    );

    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('click Chi tiết navigates correctly', async () => {
    render(
      <Table
        list={listData}
        setList={() => {}}
        url={url}
        endPointKey={endPointKey}
        fields={fields}
        searchFields={searchFields}
      />
    );

    const buttons = screen.getAllByRole('button', { name: /Chi tiết/i });
    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/users/1');
  });

  test('click Xoá calls delete API and updates list', async () => {
    const setListMock = jest.fn();
    mockDelete.mockResolvedValue({});

    render(
      <Table
        list={listData}
        setList={setListMock}
        url={url}
        endPointKey={endPointKey}
        fields={fields}
        searchFields={searchFields}
      />
    );

    const buttons = screen.getAllByRole('button', { name: /Xoá/i });
    fireEvent.click(buttons[0]);

    await waitFor(() => expect(mockDelete).toHaveBeenCalledWith('/api/users/1'));
    expect(setListMock).toHaveBeenCalledWith([{ id: 2, name: 'Bob', email: 'bob@test.com' }]);
  });
});
