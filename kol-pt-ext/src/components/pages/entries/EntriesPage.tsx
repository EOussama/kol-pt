import styles from './EntriesPage.module.scss';

import { useNavigate } from 'react-router-dom';
import { Page } from '../../../core/enums/page.enum';
import Empty from '../../layout/generic/empty/Empty';
import Error from '../../layout/generic/error/Error';
import Search from '../../layout/generic/search/Search';
import { ListItemText } from '../../styled/ListItemText';
import { useEntries } from '../../../hooks/entries.hook';
import { Entry } from '../../../core/models/entry.model';
import { YouTube } from '../../../core/models/youtube.model';
import { EntryType } from '../../../core/enums/entry-type.enum';
import { Avatar, Chip, CircularProgress, Divider, List, ListItem, ListItemAvatar, Tooltip } from '@mui/material';



/**
 * @description
 * The entries page, lists all available entries
 * on one place.
 */
function EntriesPage(): JSX.Element {
  const navigate = useNavigate();
  const { entries, error, loading, search, entriesCount, onSearch } = useEntries();
  const emptyMessage = entriesCount > 0 ? <>No posts match <b>{search}</b></> : 'No entries found';

  /**
   * @description
   * Handles entry detail navigation
   *
   * @param entryId The entry ID to navigate to
   */
  const onEntryClick = (entryId: string) => {
    navigate(`/${Page.Entry}/${entryId}`);
  }

  /**
   * @description
   * Returns the proper entry subtitle.
   *
   * @param entry The target entry.
   */
  const getSubtitle = (entry: Entry) => {
    switch (entry.type) {
      case EntryType.YouTube: return `@${(entry as YouTube).handle}`;
      default: return entry.altTitles.join(', ');
    }
  }

  return (
    <>
      <Search
        onSearch={onSearch}
        actions={
          <>
            <Tooltip title="Available Entries">
              <Chip className={styles['actions__count']} size='small' label={entriesCount} />
            </Tooltip>
          </>
        }
      />

      <List className={styles['entries']}>
        <Error error={error} message='Could not load data'>
          {loading
            ? <div className={styles['entries__loader']}>{<CircularProgress />}</div>
            : <>
              <Empty message={emptyMessage}>
                {entries.map(entry => <div key={entry.id}>
                  <ListItem className={styles['entry']} onClick={() => onEntryClick(entry.id)}>
                    <ListItemAvatar className={`${styles['entry__type']} ${styles[`entry__type--${entry.type}`]}`}>
                      <Tooltip title={entry.getTypeName()}>
                        <Avatar className={styles['entry__avatar']}>{entry.getTypeName()[0]}</Avatar>
                      </Tooltip>
                    </ListItemAvatar>

                    <ListItemText
                      primary={entry.title}
                      className={styles['entry__detail']}
                      secondary={<span className={styles['entry__alt']}>{getSubtitle(entry)}</span>}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
                )}
              </Empty>
            </>
          }
        </Error>
      </List>
    </>
  );
}

export default EntriesPage;