import { Link } from '@remix-run/react';
import type { Post, Tag as TagType } from '~/typings';
import Tag from '../Tag';
import { tagLinks } from '../Tag/Tag';
import styles from './Card.css';

export function cardLinks() {
  return [{ rel: 'stylesheet', href: styles }, ...tagLinks()];
}

type CardProps = {
  post?: Post;
}

export default function Card({ post }: CardProps) {
  const tags = post?.attributes.tags.data;
  const coverImage = post?.attributes.coverImage.data;

  return (
    <div style={{ display: 'grid', background: '#ffffff', gridAutoRows: 'min-content' }}>
      {coverImage ? (
        <img src={coverImage.attributes.url} alt="Post Cover" width="100%" />
      ) : null}
      <div className="card-container">

        <div>
          <h3>{post?.attributes.title}</h3>
          <p>{post?.attributes.summary}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <div>
            {tags?.map((tag: TagType) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
          <Link to={`/${post?.attributes.slug}`}>
            <button className='icon-button'>
              <img src="/images/arrow-right.svg" alt="View article" width="24" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}