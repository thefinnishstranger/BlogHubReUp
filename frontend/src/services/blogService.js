import axios from "axios";
const baseUrl = "https://bloghubbackend.fly.dev/api/blogs"
const userUrl = "https://bloghubbackend.fly.dev/api/users"

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const fetchBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const fetchUsers = () => {
  const request = axios.get(userUrl)
  return request.then((response => response.data))
}

const createUser = async (newUser) => {
  const response = await axios.post(userUrl, newUser)
  return response.data
}

const fetchComment = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`);
  return request.then((response) => response.data);
};


const fetchParticularBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const fetchMostRecentBlogs = () => {
  const request = axios.get(`${baseUrl}/latest`)
  return request.then((response) => response.data)
}

const fetchParticularUser = (id) => {
  const request = axios.get(`${userUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (id, newComment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config.headers);
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default {
  fetchBlogs,
  create,
  update,
  setToken,
  fetchParticularBlog,
  deleteBlog,
  fetchUsers,
  fetchParticularUser,
  fetchComment,
  createComment,
  fetchMostRecentBlogs,
  createUser
};
