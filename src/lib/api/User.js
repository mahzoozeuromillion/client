export const fetchUserDetails = async (token) => {
  try {
    const response = await fetch("/api/user-details", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
