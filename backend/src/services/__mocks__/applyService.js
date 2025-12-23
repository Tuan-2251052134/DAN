const mockApplies = [
  {
    id: 1,
    jobId: 1,
    jobSeekerId: 3,
    status: "WAIT",
    createdDate: new Date("2025-12-23T10:30:00Z"),
  },
];

const mockCVs = [{ id: 3, url: "https://example.com/cv3.pdf" }];

const mockJobs = [{ id: 1, name: "Job 1", typeId: 1, createdDate: new Date() }];

const mockTypes = [{ id: 1, name: "Full-time" }];

const mockUsers = [
  { id: 3, name: "TuanJobseeker", email: "jobseeker@example.com", avatar: "" },
];

module.exports = {
  getOne: jest.fn(async ({ jobId, jobSeekerId, id }) => {
    return mockApplies.find(
      (a) =>
        (id && `${a.id}` === `${id}`) ||
        (jobId &&
          a.jobId === jobId &&
          jobSeekerId &&
          a.jobSeekerId === jobSeekerId) ||
        (jobId && !jobSeekerId && a.jobId === jobId) ||
        (jobSeekerId && !jobId && a.jobSeekerId === jobSeekerId)
    );
  }),

  getAll: jest.fn(async ({ jobId, jobSeekerId, offset = 0 }) => {
    let applies = [...mockApplies];
    if (jobId) applies = applies.filter((a) => a.jobId === jobId);
    if (jobSeekerId)
      applies = applies.filter((a) => a.jobSeekerId === jobSeekerId);

    const limit = parseInt(process.env.QUERY_LIMIT || 10);
    const start = offset * limit;

    // giả lập include
    return applies.slice(start, start + limit).map((a) => {
      return {
        ...a,
        job: jobSeekerId ? mockJobs.find((j) => j.id === a.jobId) : undefined,
        type: jobSeekerId ? mockTypes.find((t) => t.id === a.jobId) : undefined,
        cv: !jobSeekerId
          ? mockCVs.find((c) => c.id === a.jobSeekerId)
          : undefined,
      };
    });
  }),

  getDetailOne: jest.fn(async ({ id }) => {
    const apply = mockApplies.find((a) => a.id === id);
    if (!apply) return null;
    const user = mockUsers.find((u) => u.id === apply.jobSeekerId);
    return {
      ...apply,
      jobSeeker: {
        ...user,
        cv: mockCVs.find((c) => c.id === user.id),
      },
    };
  }),

  create: jest.fn(async ({ apply }) => {
    const newApply = {
      id: mockApplies.length + 1,
      ...apply,
      createdDate: new Date(),
    };
    mockApplies.push(newApply);
    return newApply;
  }),

  update: jest.fn(async ({ apply, id }) => {
    const index = mockApplies.findIndex((a) => a.id === id);
    if (index !== -1) {
      mockApplies[index] = { ...mockApplies[index], ...apply };
      return mockApplies[index];
    }
    return null;
  }),

  deleteOne: jest.fn(async ({ id }) => {
    const index = mockApplies.findIndex((a) => a.id === id);
    if (index !== -1) {
      return mockApplies.splice(index, 1)[0];
    }
    return null;
  }),

  checkOne: jest.fn(async ({ jobId, jobSeekerId }) => {
    return mockApplies.find(
      (a) => a.jobId === jobId && a.jobSeekerId === jobSeekerId
    );
  }),
};
