import { UnsplashPhotosResponse } from 'types/unsplash';

export const getUnsplashPhotos = async (
  query: string
): Promise<UnsplashPhotosResponse> => {
  const bearerToken = `Bearer ${process.env.UNSPLASH_TOKEN}`;
  const page = 1;
  const perPage = 30;
  const orientation = 'landscape;';

  const result = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&orientation=${orientation}&query=${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: bearerToken,
      },
    }
  );
  return result.json();
};
