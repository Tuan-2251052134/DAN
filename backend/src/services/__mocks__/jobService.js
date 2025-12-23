const mockJobs = [
  {
    id: 1,
    name: "Job 1",
    description: "Mô tả job 1",
    payment: 1000,
    userId: 2,
    typeId: 1,
    status: "PASS",
    expiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Job 2",
    description: "Mô tả job 2",
    payment: 2000,
    userId: 2,
    typeId: 2,
    status: "PASS",
    expiredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];

const mockMessages = [
  { id: 1, content: "Message 1" },
  { id: 2, content: "Message 2" },
];

const mockTypes = [
  { id: 1, name: "Full-time" },
  { id: 2, name: "Part-time" },
];

const mockUsers = [
  { id: 2, name: "TuanBusiness", avatar: "https://example.com/avatar.jpg" },
];

module.exports = {
  getOne: jest.fn(async ({ id, typeId }) => {
    const job = mockJobs.find(
      (j) =>
        (id && `${j.id}` === `${id}`) ||
        (typeId && `${j.typeId}` === `${typeId}`)
    );
    if (!job) return null;
    return {
      ...job,
      type: mockTypes.find((t) => t.id === job.typeId),
      user: mockUsers.find((u) => u.id === job.userId),
      message: mockMessages.find((m) => m.id === job.id),
    };
  }),

  getAll: jest.fn(async ({ name, typeId, offset = 0, userId, status }) => {
    let jobs = [...mockJobs];

    if (name) jobs = jobs.filter((j) => j.name.includes(name));
    if (typeId) jobs = jobs.filter((j) => j.typeId === typeId);
    if (userId) jobs = jobs.filter((j) => j.userId === userId);
    if (status) jobs = jobs.filter((j) => j.status === status);
    jobs = jobs.filter((j) => j.expiredDate > new Date());

    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = offset * limit;

    return jobs.slice(start, start + limit).map((job) => ({
      ...job,
      type: mockTypes.find((t) => t.id === job.typeId),
    }));
  }),

  create: jest.fn(async ({ job, message }) => {
    const newJob = { id: mockJobs.length + 1, ...job };
    mockJobs.push(newJob);
    if (message) {
      mockMessages.push({ id: newJob.id, ...message });
    }
    return newJob;
  }),

  update: jest.fn(async ({ id, job, message }) => {
    const index = mockJobs.findIndex((j) => j.id === id);
    if (index !== -1) {
      mockJobs[index] = { ...mockJobs[index], ...job };
      if (message) {
        const msgIndex = mockMessages.findIndex((m) => m.id === id);
        if (msgIndex !== -1) {
          mockMessages[msgIndex] = { ...mockMessages[msgIndex], ...message };
        } else {
          mockMessages.push({ id: id, ...message });
        }
      }
      return mockJobs[index];
    }
    return null;
  }),

  deleteOne: jest.fn(async ({ id }) => {
    const jobIndex = mockJobs.findIndex((j) => j.id === id);
    const msgIndex = mockMessages.findIndex((m) => m.id === id);
    if (jobIndex !== -1) mockJobs.splice(jobIndex, 1);
    if (msgIndex !== -1) mockMessages.splice(msgIndex, 1);
    return true;
  }),
};
