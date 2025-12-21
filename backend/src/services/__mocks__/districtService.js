const mockCities = [
  { id: 1, name: "Hà Nội" },
  { id: 2, name: "Hồ Chí Minh" },
];

const mockDistricts = [
  { id: 1, name: "Quận 1", cityId: 2 },
  { id: 2, name: "Quận 3", cityId: 2 },
  { id: 3, name: "Ba Đình", cityId: 2 },
];

module.exports = {
  getOne: jest.fn(async ({ id, cityId }) => {
    let district = mockDistricts.find(
      (d) =>
        (id && d.id === Number(id)) || (cityId && d.cityId === Number(cityId))
    );

    if (!district) return null;

    return {
      ...district,
      city: mockCities.find(
        (c) => parseInt(c.id) === parseInt(district.cityId)
      ),
    };
  }),

  getAll: jest.fn(async ({ name, offset = 0, cityId }) => {
    let districts = [...mockDistricts];

    if (name) {
      districts = districts.filter((d) => d.name.includes(name));
    }

    if (cityId) {
      districts = districts.filter((d) => d.cityId === Number(cityId));
    }

    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = parseInt(offset) * limit;

    return districts.slice(start, start + limit);
  }),

  create: jest.fn(async ({ district }) => {
    const newDistrict = {
      id: mockDistricts.length + 1,
      ...district,
    };
    mockDistricts.push(newDistrict);
    return newDistrict;
  }),

  update: jest.fn(async ({ district, id }) => {
    const index = mockDistricts.findIndex((d) => d.id === Number(id));
    if (index === -1) return [0];

    mockDistricts[index] = {
      ...mockDistricts[index],
      ...district,
    };

    // Sequelize update thường return [affectedCount]
    return [1];
  }),

  deleteOne: jest.fn(async ({ id }) => {
    const index = mockDistricts.findIndex((d) => d.id === Number(id));
    if (index === -1) return 0;

    mockDistricts.splice(index, 1);
    return 1;
  }),
};
