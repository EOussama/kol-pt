import styles from './Entries.module.scss';

import Empty from '../../layout/empty/Empty';
import Error from '../../layout/error/Error';
import Search from '../../layout/search/Search';
import { ListItemText } from '../../styled/ListItemText';
import { useEntries } from '../../../hooks/entries.hook';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { Avatar, Chip, Divider, List, ListItem, ListItemAvatar, Tooltip } from '@mui/material';



/**
 * @description
 * The entries page, lists all available entries
 * on one place.
 */
function Entries(): JSX.Element {
  const { entries, error, loading, search, entriesCount, onSearch } = useEntries();
  const emptyMessage = entriesCount > 0 ? <>No posts match <b>{search}</b></> : 'No entries found';

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
            ? <div className={styles['entries__loader']}>{<RestartAltOutlinedIcon />}</div>
            : <>
              <Empty message={emptyMessage}>
                {entries.map(entry => <div key={entry.id}>
                  <ListItem className={styles['entry']}>
                    <ListItemAvatar className={`${styles['entry__type']} ${styles[`entry__type--${entry.type}`]}`}>
                      <Tooltip title={entry.getTypeName()}>
                        <Avatar className={styles['entry__avatar']}>{entry.getTypeName()[0]}</Avatar>
                      </Tooltip>
                    </ListItemAvatar>

                    <ListItemText
                      primary={entry.title}
                      className={styles['entry__detail']}
                      secondary={<span className={styles['entry__alt']}>{entry.altTitles.join(', ')}</span>}
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

export default Entries;