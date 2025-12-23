const mockTypes = [
  { id: 1, name: "Full-time" },
  { id: 2, name: "Part-time" },
  { id: 3, name: "Internship" },
];

module.exports = {
  create: jest.fn(async ({ type }) => {
    const newType = { id: mockTypes.length + 1, ...type };
    mockTypes.push(newType);
    return newType;
  }),

  getOne: jest.fn(async ({ id }) => {
    return mockTypes.find((t) => `${t.id}` === `${id}`);
  }),

  getAll: jest.fn(async ({ name, offset = 0 }) => {
    let types = [...mockTypes];
    if (name) {
      types = types.filter((t) => t.name.includes(name));
    }
    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = offset * limit;
    return types.slice(start, start + limit);
  }),

  update: jest.fn(async ({ id, type }) => {
    const index = mockTypes.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockTypes[index] = { ...mockTypes[index], ...type };
      return mockTypes[index];
    }
    return null;
  }),

  deleteOne: jest.fn(async ({ id }) => {
    const index = mockTypes.findIndex((t) => t.id === id);
    if (index !== -1) {
      const deleted = mockTypes.splice(index, 1)[0];
      return deleted;
    }
    return null;
  }),
};
