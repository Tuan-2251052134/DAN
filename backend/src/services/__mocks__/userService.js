const mockUsers = [
  {
    id: 1,
    name: "TuanAdmin",
    email: "lygiatuanAdmin@gmail.com",
    password: "$2b$10$AAY9WFG0MQNd.x5oLbnMve1DAYe5QztYPIhsYvju87xtvsDWO7cBO",
    districtId: 1,
    address: "70 Hà Tôn Quyền",
    role: "ADMIN",
    avatar:
      "https://res.cloudinary.com/dx6brcofe/image/upload/v1764347804/jbuibf86mdnsjnay11xe.jpg",
  },
  {
    id: 2,
    name: "TuanBusiness",
    email: "lygiatuanBusiness@gmail.com",
    password: "$2b$10$AAY9WFG0MQNd.x5oLbnMve1DAYe5QztYPIhsYvju87xtvsDWO7cBO",
    districtId: 1,
    address: "70 Hà Tôn Quyền",
    role: "BUSINESS",
    avatar:
      "https://res.cloudinary.com/dx6brcofe/image/upload/v1764353816/cxlpia0rma8s41hpault.jpg",
  },
  {
    id: 3,
    name: "TuanJobseeker",
    email: "lygiatuanJobseeker@gmail.com",
    password: "$2b$10$AAY9WFG0MQNd.x5oLbnMve1DAYe5QztYPIhsYvju87xtvsDWO7cBO",
    districtId: 1,
    address: "70 Hà Tôn Quyền",
    role: "JOB_SEEKER",
    avatar:
      "https://res.cloudinary.com/dx6brcofe/image/upload/v1766210422/gxtokntqdnrdwgrh3ljy.jpg",
  },
];

const mockCVs = [
  {
    id: 3,
    url: "https://res.cloudinary.com/dx6brcofe/image/upload/v1766127542/wsjamgfyorfi726li9it.pdf",
  },
];

module.exports = {
  register: jest.fn(async ({ user }) => {
    const newUser = { id: mockUsers.length + 1, ...user };
    mockUsers.push(newUser);
    return newUser;
  }),

  getOne: jest.fn(async ({ email, id }) => {
    return mockUsers.find(
      (u) => (email && u.email === email) || (id && `${u.id}` === `${id}`)
    );
  }),

  getAll: jest.fn(async ({ name, offset = 0 }) => {
    let users = [...mockUsers];
    if (name) {
      users = users.filter((u) => u.name.includes(name));
    }
    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = offset * limit;
    return users.slice(start, start + limit);
  }),

  getDetailOne: jest.fn(async ({ id }) => {
    return mockUsers.find((u) => u.id === id);
  }),

  update: jest.fn(async ({ id, user }) => {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...user };
      if (user.cv) {
        mockCVs.push({ id, url: user.cv });
      }
      return mockUsers[index];
    }
    return null;
  }),

  checkCVExist: jest.fn(async ({ id }) => {
    return mockCVs.find((cv) => cv.id === id);
  }),
};
