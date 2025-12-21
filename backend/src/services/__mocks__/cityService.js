// services/__mocks__/cityService.js
const mockCities = [
  { id: 1, name: "City 1" },
  { id: 2, name: "City 2" },
  { id: 3, name: "City 3" },
];

module.exports = {
  // GET all
  getAll: jest.fn(async ({ name, offset = 0 } = {}) => {
    let cities = [...mockCities];

    if (name) {
      cities = cities.filter((c) => c.name.includes(name));
    }

    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = parseInt(offset) * limit;

    return cities.slice(start, start + limit);
  }),

  // GET one
  getOne: jest.fn(async ({ id }) => {
    return mockCities.find((c) => parseInt(c.id) === parseInt(id)) || null;
  }),

  // CREATE
  create: jest.fn(async ({ city }) => {
    const newCity = { id: mockCities.length + 1, ...city };
    mockCities.push(newCity);
    return newCity;
  }),

  // UPDATE
  update: jest.fn(async ({ city, id }) => {
    const index = mockCities.findIndex((c) => parseInt(c.id) === parseInt(id));
    if (index !== -1) {
      mockCities[index] = { ...mockCities[index], ...city };
      return city;
    }
    return [0];
  }),

  // DELETE
  deleteOne: jest.fn(async ({ id }) => {
    const index = mockCities.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockCities.splice(index, 1);
      return 1; // giống Sequelize trả về số lượng bản ghi xóa
    }
    return 0;
  }),
};
