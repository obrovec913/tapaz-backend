import { Controller, Get, Post, Body, HttpCode, HttpStatus, Inject, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { IArticle } from 'src/models/article.model';
import { ArticleService } from 'src/services/ArticleService/article.service';
import { IArticleCreatePayload } from './article.controller.interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('/article')
export class ArticleController {
  constructor(
    @Inject(ArticleService) private readonly articleService: ArticleService,
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getArticles(): Promise<IArticle[]> {
    return this.articleService.getArticles();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async createArticle(@Body() payload: IArticleCreatePayload): Promise<IArticle> {
    return this.articleService.createArticle(payload);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async updateArticle(@Body() payload: IArticleCreatePayload, @Param('id') articleId: string): Promise<IArticle> {
    return this.articleService.updateArticle(articleId, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(@Param('id') articleId: string): Promise<void> {
    return this.articleService.deleteArticle(articleId);
  }
}
