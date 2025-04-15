import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LanguageCodes } from '../../../utils/constants';

export interface LanguageState {
  selectedLanguage: string;
}

const initialState: LanguageState = {
  selectedLanguage: LanguageCodes.ENGLISH,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
