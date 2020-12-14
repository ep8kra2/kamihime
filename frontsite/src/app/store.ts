import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import effectSlice from '../state/effect/slice';
import effectLevelSlice from '../state/effectlevel/slice';
import weaponSlice from '../state/weapon/slice';
import skillSlice from '../state/skill/slice';
import categorySlice from '../state/category/slice';
import powerSlice from '../state/power/slice';
import pageSlice from '../state/page/slice';
import weaponTypeSlice from '../state/weapontype/slice';
import raritySlice from '../state/rarity/slice';
import calcurateSlice from '../state/calcurate/slice';

export const store = configureStore({

  reducer: {
    page: pageSlice.reducer,
    skill: skillSlice.reducer,
    weapon: weaponSlice.reducer,
    effect: effectSlice.reducer,
    effectLevel: effectLevelSlice.reducer,
    category: categorySlice.reducer,
    power: powerSlice.reducer,
    weaponType: weaponTypeSlice.reducer,
    rarity: raritySlice.reducer,
    calcurate: calcurateSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;