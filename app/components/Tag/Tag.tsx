import type { Tag as TagType } from '~/typings';
import styles from './Tag.css';

export function tagLinks() {
  return [
    { rel: 'stylesheet', href: styles }
  ]
}

type TagProps = {
  tag: TagType
}

export default function Tag({ tag }: TagProps) {
  console.log(tag);
  return (
    <span className="tag">{tag.attributes.title}</span>
  )
}