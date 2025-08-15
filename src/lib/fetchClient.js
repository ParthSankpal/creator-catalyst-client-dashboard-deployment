const fetchClient = async (url, options = {}) => {
  const defaultHeaders = { "Content-Type": "application/json" };
  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return await response.json();
};

export default fetchClient;
