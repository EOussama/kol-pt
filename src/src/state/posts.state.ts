import { create } from "zustand";
import { IPostsState } from "../core/types/state/posts-state.type";
import { PostsHelper } from "../core/helpers/firebase/posts.helper";
import { CacheHelper } from "../core/helpers/firebase/cache.helper";



/**
 * @description
 * State management for posts.
 */
export const usePostStore = create<IPostsState>(set => ({

  /**
   * @description
   * Array of posts.
   */
  posts: [],

  /**
   * @description
  * Flag to indicate if posts are currently being loaded.
  */
  loading: false,

  /**
   * @description
   * Loads posts from cache or from Firebase and sets the posts array.
   * 
   * @param cache If true, tries to load the posts from cache first,
   * then falls back to Firebase if no cache is available. If false, forces a load from Firebase.
   */
  loadPosts: async (cache: boolean = true) => {
    set({ loading: true });

    const data = await PostsHelper.load(cache);

    set({ loading: false });
    set(() => ({ posts: data }));
  },

  /**
   * @description
   * Clears the cache for posts.
   */
  clearCache: () => { CacheHelper.clear() }
}));