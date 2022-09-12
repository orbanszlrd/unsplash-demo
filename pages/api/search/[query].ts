import type { NextApiRequest, NextApiResponse } from 'next';
import { UnsplashPhotosResponse } from 'types/unsplash';
import { getUnsplashPhotos } from 'util/UnsplashApi';

export default async function ApiSearchPhotos(
  req: NextApiRequest,
  res: NextApiResponse<UnsplashPhotosResponse>
) {
  const query: string = req.query.query as string;
  const data: UnsplashPhotosResponse = await getUnsplashPhotos(query);

  res.status(200).json(data);
}
