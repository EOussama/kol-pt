import styles from './EntryHead.module.scss';

import millify from 'millify';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../core/enums/page.enum';
import { Anime } from '../../../core/models/anime.model';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { YouTube } from '../../../core/models/youtube.model';
import { EntryType } from '../../../core/enums/entry-type.enum';
import { JikanHelper } from '../../../core/helpers/api/jikan.helper';
import { YouTubeHelper } from '../../../core/helpers/api/youtube.helper';
import { IEntryPageSectionProps } from '../../../core/types/props/entry-section.props.type';
import Loader from '../loader/Loader';
import TextExpand from '../text-expand/TextExpand';



/**
 * @description
 * The entry head component.
 */
function EntryHead(props: IEntryPageSectionProps): JSX.Element {
  const { entry } = props;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState<Array<string>>([]);
  const [photo, setPhoto] = useState('./images/graphs/placeholder.jpg');

  /**
   * @description
   * Navigates back to the entries list.
   */
  const onBack = () => {
    navigate(`${Page.Index}${Page.Entries}`);
  }

  useEffect(() => {
    if (entry.id) {
      setLoading(true);

      if (entry.type === EntryType.Anime) {
        JikanHelper
          .getAnimeInfo((entry as Anime).malId)
          .then(e => {
            setPhoto(e.photo);
            setGenres(e.genres);
            setDescription(e.description);
          })
          .finally(() => setLoading(false));
      } else if (entry.type === EntryType.YouTube) {
        YouTubeHelper
          .getVideoInfo((entry as YouTube).videoId)
          .then(e => {
            setPhoto(e.thumbnail);
            setViewCount(e.totlaViews);
            setDescription(e.description);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [entry.id]);

  return (
    <div className={styles['entry-head']}>
      <div className={styles['head__back']} onClick={onBack}>
        <ArrowBackIcon />
      </div>

      <div className={styles['head__hero']}>
        {loading
          ? <Loader height='250px' flat={true} overlay={true} />
          : <>
            <div
              className={styles['head__photo']}
              style={{ backgroundImage: `url(${photo}), url(./images/graphs/placeholder.jpg)` }}
            >
            </div>
          </>
        }
      </div>

      <div className={styles['head__content']}>
        <h5 className={styles['head__type']}>
          {entry.getTypeName()}
          {entry.type === EntryType.YouTube &&
            <> - {millify(viewCount)} views</>
          }
        </h5>

        <h3 className={styles['head__title']}>{entry.title}</h3>
      </div>

      <div className={styles['head__description-wrapper']}>
        <div className={styles['head__description']}>
          {loading
            ? <Loader height='100px' />
            : <TextExpand content={description} />
          }
        </div>
      </div>

      {genres.length > 0 &&
        <div className={styles['head__genres']}>
          {genres.map((e, i) => <Chip
            key={i}
            label={e}
            size='small'
            className={styles['head__genre']}
          />)}
        </div>
      }
    </div>
  );
}

export default EntryHead;