import { Translations } from './translations.type';

export interface League {
  leagueId: number;
  leagueCategoryId: number;
  caption: string;
  translations: Translations;
}