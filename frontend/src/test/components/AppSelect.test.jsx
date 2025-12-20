// src/test/AppSelect.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppSelect from '../../components/appSelect/AppSelect';

// Mock apiUtil và end_point
jest.mock('../../utils/apiUtil', () => ({
  apiUtil: { get: jest.fn() },
  end_point: { user: 'api/user' },
}));

// Mock handleError
jest.mock('../../utils/errorAlertUtil', () => ({
  handleError: jest.fn(),
}));

import { apiUtil } from '../../utils/apiUtil';
import { handleError } from '../../utils/errorAlertUtil';

describe('AppSelect Component', () => {
  const mockData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ];

  const defaultProps = {
    setValue: jest.fn(),
    endPointKey: 'user',
    defaultValue: [],
    value: null,
    extraQueryKey: null,
    extraQueryValue: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('render AppSelect và load dữ liệu từ API khi mở menu', async () => {
    apiUtil.get.mockResolvedValue({ data: { data: mockData } });

    render(<AppSelect {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    // mở menu
    await userEvent.click(selectInput);

    await waitFor(() => {
      expect(apiUtil.get).toHaveBeenCalled();
    });

    // Kiểm tra option có trong document
    expect(await screen.findByText('Option 1')).toBeInTheDocument();
    expect(await screen.findByText('Option 2')).toBeInTheDocument();
  });

  test('gọi setValue khi chọn option', async () => {
    apiUtil.get.mockResolvedValue({ data: { data: mockData } });

    render(<AppSelect {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    await userEvent.click(selectInput);

    const option1 = await screen.findByText('Option 1');
    await userEvent.click(option1);

    expect(defaultProps.setValue).toHaveBeenCalledWith(1, 'Option 1');
  });

  test('gọi handleError khi API lỗi', async () => {
    apiUtil.get.mockRejectedValue(new Error('API error'));

    render(<AppSelect {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    await userEvent.click(selectInput);

    await waitFor(() => {
      expect(handleError).toHaveBeenCalled();
    });
  });

  test('thay đổi input keyword và gọi API', async () => {
    apiUtil.get.mockResolvedValue({ data: { data: mockData } });

    render(<AppSelect {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    await userEvent.click(selectInput);

    // Type vào input của react-select
    await userEvent.type(selectInput, 'Option');

    await waitFor(() => {
      expect(apiUtil.get).toHaveBeenCalled();
    });
  });

  test('scroll to bottom gọi API load thêm', async () => {
    apiUtil.get.mockResolvedValue({ data: { data: mockData } });

    render(<AppSelect {...defaultProps} />);
    const selectInput = screen.getByRole('combobox');

    await userEvent.click(selectInput);

    // Trigger scroll
    const menuList = document.querySelector('[role="listbox"]');
    if (menuList) {
      menuList.scrollTop = menuList.scrollHeight;
      menuList.dispatchEvent(new Event('scroll', { bubbles: true }));
    }

    await waitFor(() => {
      expect(apiUtil.get).toHaveBeenCalled();
    });
  });
});
