import axios from "axios";

export const end_point = {
  user: "api/user",
  "user-login": "api/user/login",
  "user-detail": (id) => `api/user/${id}`,

  city: "api/city",
  "city-detail": (id) => `api/city/${id}`,

  district: "api/district",
  "district-detail": (id) => `api/district/${id}`,

  type: "api/type",
  "type-detail": (id) => `api/type/${id}`,

  job: "api/job",
  "job-detail": (id) => `api/job/${id}`,

  cv: "api/cv",
  "cv-detail": (id) => `api/cv/${id}`,

  apply: "api/apply",
  "apply-detail": (id) => `api/apply/${id}`,
};

export const apiUtil = axios.create({
  baseURL: "http://localhost:8080",
});

export const authApiUtil = () => {
  const user = localStorage.getItem("user");
  return user
    ? axios.create({
        baseURL: "http://localhost:8080",
        headers: {
          Authorization: `Bearer ${JSON.parse(user).token}`,
        },
      })
    : apiUtil;
};
