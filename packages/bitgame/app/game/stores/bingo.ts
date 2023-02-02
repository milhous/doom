import {configureStore} from '@reduxjs/toolkit';

import bingoReducer from '@game/reducers/bingo';

const store = configureStore({
  reducer: {
    bingo: bingoReducer,
  },
});

export default store;

export type BingoState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type BingoDispatch = typeof store.dispatch;
