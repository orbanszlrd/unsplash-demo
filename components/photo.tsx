import { FunctionComponent } from 'react';
import { UnsplashPhoto } from 'types/unsplash';

import styles from './photo.module.css';

export interface PhotoProps {
  photo: UnsplashPhoto;
}

const Photo: FunctionComponent<PhotoProps> = ({ photo }) => {
  return (
    <article className={styles.item}>
      <div
        className={styles.cover}
        title={photo.description ?? photo.alt_description ?? ''}
        style={{
          backgroundImage: `url(${photo.urls.regular})`,
        }}
      ></div>
      <div className={styles.credits}>
        Photo by{' '}
        <a href={photo.user.links.html} target="_blank" rel="noreferrer">
          {photo.user.name}
        </a>{' '}
        on{' '}
        <a href={'https://unsplash.com'} target="_blank" rel="noreferrer">
          Unsplash
        </a>
      </div>
    </article>
  );
};

export default Photo;
