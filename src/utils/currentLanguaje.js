import { getLocales } from "expo-localization";

const locates = getLocales();

export const currentLanguage = locates[0].languageCode;
