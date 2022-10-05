import { Injectable, Inject } from '@nestjs/common';
import { IArticle } from 'src/models/article.model';
import { ArticleRepository } from './repository/article.repository';
import { IArticleCreatePayload } from '../REST-service/controllers/article-controller/article.controller.interfaces';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleRepository) private readonly articleRepository: ArticleRepository,
  ) {}

  public async getArticles(): Promise<IArticle[]> {
    return this.articleRepository.getArticles();
  }

  public async createArticle(payload: IArticleCreatePayload): Promise<IArticle> {
    return this.articleRepository.createArticle(payload);
  }

  public async updateArticle(id: string, payload: IArticleCreatePayload): Promise<IArticle> {
    return this.articleRepository.updateArticle(id, payload);
  }

  public async deleteArticle(id: string): Promise<void> {
    return this.articleRepository.deleteArticle(id);
  }
}
