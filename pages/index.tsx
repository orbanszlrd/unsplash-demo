import Photo from 'components/photo';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { UnsplashPhoto, UnsplashPhotosResponse } from '../types/unsplash';

const Home: NextPage = () => {
  const [photos, setPhotos] = useState([] as UnsplashPhoto[]);
  const [query, setQuery] = useState('');

  async function fetchPhotos() {
    const response = await fetch(`/api/search/${query}`);
    const data: UnsplashPhotosResponse = await response.json();
    setPhotos(data.results);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Unsplash Demo</title>
        <meta name="description" content="Unsplash Demo" />
      </Head>

      <main>
        <div className={styles.search}>
          <input
            type="search"
            value={query}
            placeholder="Search Photos"
            onInput={(e) => setQuery(e.currentTarget.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? fetchPhotos() : null)}
          />
          <button onClick={fetchPhotos}>Search</button>
        </div>
        <div className={styles['grid-container']}>
          {photos.map((photo: UnsplashPhoto) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
