import { LANGUAGE } from "src/constants";

export interface IArticleCreatePayload {
  isMain: boolean;
  order: number | null;
  translations: {
    [key in LANGUAGE]: IArticleTranslation;
  };
}

export interface IArticleTranslation {
  title: string;
  source: string;
  description: string;
  link: string;
  isVisible: boolean;
}