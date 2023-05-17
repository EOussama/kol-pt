import styles from './Entry.module.scss';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useEntry } from '../../../hooks/entry.hook';
import Error from '../../layout/generic/error/Error';
import { Entry } from '../../../core/models/entry.model';
import EntryAka from '../../layout/entry/entry-aka/EntryAka';
import EntryHead from '../../layout/entry/entry-head/EntryHead';
import EntryLinks from '../../layout/entry/entry-links/EntryLinks';
import EntryReactions from '../../layout/entry/entry-reactions/EntryReactions';



/**
 * @description
 * The entry detail page
 */
function EntryPage(): JSX.Element {
  const params = useParams();
  const entryId = useMemo(() => params.entryId, [params]);
  const { loading, entry, description, photo, viewCount, altTitles, genres, reactions } = useEntry(entryId ?? '');

  return (
    <Error error={!entry} message='Could not retrieve entry'>
      <div className={styles['root']}>
        <EntryHead
          photo={photo}
          genres={genres}
          loading={loading}
          viewCount={viewCount}
          description={description}
          entry={entry as Entry}
        />

        <EntryAka
          altTitles={altTitles}
        />

        <EntryLinks
          entry={entry as Entry}
        />

        <EntryReactions
          reactions={reactions}
          entry={entry as Entry}
        />
      </div>
    </Error >
  );
}

export default EntryPage;