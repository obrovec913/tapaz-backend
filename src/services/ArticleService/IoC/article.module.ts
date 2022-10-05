import { Module } from '@nestjs/common';
import { ArticleRepository } from '../repository/article.repository';
import { ArticleService } from '../article.service';

@Module({
  imports: [],
  exports: [ArticleService],
  providers: [ArticleRepository, ArticleService],
})
export class ArticleModule {}
