import axios from "axios";

interface PostData {
  title: string;
  description: string;
  requiredtech: string[];
  whatyouwillgain: string[];
  duaration: string;
  noofparticipants: string;
  credits: string;
}

export const createPostService = async (postData: PostData, token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/create",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    let message = "Failed to create post";
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error instanceof Error && error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
};
