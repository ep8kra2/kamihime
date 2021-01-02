import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import effectSlice from '../state/effect/slice';
import effectLevelSlice from '../state/effectlevel/slice';
import weaponSlice from '../state/weapon/slice';
import skillSlice from '../state/skill/slice';
import categorySlice from '../state/category/slice';
import impactSlice from '../state/impact/slice';
import powerSlice from '../state/power/slice';
import pageSlice from '../state/page/slice';
import weaponTypeSlice from '../state/weapontype/slice';
import raritySlice from '../state/rarity/slice';
import calcurateSlice from '../state/calculate/slice';
import calculationSlice from '../state/calculation/slice';
import phantomSlice from '../state/phantom/slice';

export const store = configureStore({

  reducer: {
    page: pageSlice.reducer,
    skill: skillSlice.reducer,
    weapon: weaponSlice.reducer,
    effect: effectSlice.reducer,
    effectLevel: effectLevelSlice.reducer,
    category: categorySlice.reducer,
    impact: impactSlice.reducer,
    power: powerSlice.reducer,
    weaponType: weaponTypeSlice.reducer,
    rarity: raritySlice.reducer,
    calcurate: calcurateSlice.reducer,
    calculation: calculationSlice.reducer,
    phantom: phantomSlice.reducer
  },
  middleware: getDefaultMiddleware({
    ...getDefaultMiddleware,serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;