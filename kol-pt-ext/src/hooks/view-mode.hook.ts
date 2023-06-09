import { useEffect } from 'react';
import { useAuthStore } from '../state/auth.state';
import { ViewMode } from '../core/enums/view-mode.enum';
import { useSettingsStore } from '../state/settings.state';
import { SettingsHelper } from '../core/helpers/firebase/repositories/settings.helper';



/**
 * @description
 * Manages view mode.
 */
export function useViewMode() {
  const user = useAuthStore(e => e.user);
  const viewMode = useSettingsStore(e => e.viewMode);
  const setViewMode = useSettingsStore(e => e.setViewMode);

  const compactViewColor: 'primary' | 'default' = viewMode === ViewMode.Compact ? 'primary' : 'default';
  const expandedViewColor: 'primary' | 'default' = viewMode === ViewMode.Expanded ? 'primary' : 'default';

  useEffect(() => {
    if (user) {
      SettingsHelper
        .get(user.uid, 'viewMode')
        .then(userViewMode => {
          setViewMode(userViewMode);
        });
    }
  }, [user?.uid]);

  return { viewMode, compactViewColor, expandedViewColor, setViewMode };
}