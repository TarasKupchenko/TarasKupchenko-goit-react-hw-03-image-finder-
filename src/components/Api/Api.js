const API_KEY = '40756450-2b62d5efbb9c5d98f0ec642a2';

export const fetchImagesApi = async (searchQuery, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
