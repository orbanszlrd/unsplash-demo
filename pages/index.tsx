import Loader from 'components/loader';
import Photo from 'components/photo';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { UnsplashPhoto, UnsplashPhotosResponse } from '../types/unsplash';

const Home: NextPage = () => {
  const [photos, setPhotos] = useState([] as UnsplashPhoto[]);
  const [isLoading, setIsloading] = useState(true);
  const [query, setQuery] = useState('');

  async function fetchPhotos() {
    setIsloading(true);
    const response = await fetch(`/api/search/${query}`);
    const data: UnsplashPhotosResponse = await response.json();
    setPhotos(data.results);
  }

  useEffect(() => {
    setIsloading(false);
  }, [photos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Nomad Images</title>
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="Digital Nomad Images" />
        <meta name="application-name" content="images.dinodev.hu" />
        <meta name="keywords" content="Digital Nomad Developers dinodev" />
        <meta
          name="author"
          content="Szilard Orban; e-mail: orbanszlrd@dinodev.hu"
        />
        <meta name="reply-to" content="info@dinodev.hu" />
        <meta name="owner" content="Szilard Orban" />
        <meta name="url" content="https://images.dinodev.hu" />
        <meta name="category" content="travel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-72x72.png"
          sizes="16x16 32x32 72x72"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-128x128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-144x144.png"
          sizes="144x144"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-152x152.png"
          sizes="152x152"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-384x384.png"
          sizes="384x384"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/icon-512x512.png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
        <link rel="manifest" href="manifest.webmanifest" />
      </Head>

      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
