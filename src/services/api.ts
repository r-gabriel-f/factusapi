import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    if (config.url !== "/oauth/token") {
      config.baseURL = config.baseURL + "/v1";
      config.headers["Authorization"] =
        localStorage.getItem("token_type") +
        " " +
        localStorage.getItem("access_token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      try {
        await refreshToken();
        error.config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
        return instance.request(error.config);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No hay refresh token disponible");
  }

  const data = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  const response = await axios.post(
    `${import.meta.env.VITE_URL_API}/oauth/token`,
    data,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const { access_token, refresh_token, token_type, expires_in } = response.data;
  const expiresAt = JSON.stringify(expires_in * 1000 + new Date().getTime());
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("token_type", token_type);
  localStorage.setItem("expires_at", expiresAt);
}

export default instance;
