import * as mongoose from 'mongoose';
import { LANGUAGE } from '../constants';

const TranslationSchema = {
  title: String,
  source: String,
  description: String,
  link: String,
  isVisible: Boolean,
};

const articleSchema = new mongoose.Schema(
  {
    isMain: Boolean,
    order: Number,
    translations: {
      en: {
        title: String,
        source: String,
        description: String,
        link: String,
        isVisible: Boolean,
      },
      ru: {
        title: String,
        source: String,
        description: String,
        link: String,
        isVisible: Boolean,
      },
    },
  },
  { collection: 'article', timestamps: true },
);

export interface IArticle extends mongoose.Document {
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

export const ArticleModel = mongoose.model<IArticle>('article', articleSchema);
