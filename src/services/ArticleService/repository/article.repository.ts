import { Injectable } from '@nestjs/common';
import { IArticle, ArticleModel } from 'src/models/article.model';
import { IArticleCreatePayload } from 'src/services/REST-service/controllers/article-controller/article.controller.interfaces';

@Injectable()
export class ArticleRepository {
  async getArticles(): Promise<IArticle[]> {
    return ArticleModel.find();
  }

  async createArticle(payload: IArticleCreatePayload): Promise<IArticle> {
    return ArticleModel.create(payload);
  }

  async updateArticle(
    id: string,
    payload: IArticleCreatePayload,
  ): Promise<IArticle> {
    return ArticleModel.findOneAndUpdate(
      { _id: id },
      payload,
    );
  }

  async deleteArticle(id: string): Promise<void> {
    await ArticleModel.findOneAndDelete({ _id: id });
  }
}
