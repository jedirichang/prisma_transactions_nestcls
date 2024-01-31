import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [
            // module in which the PrismaClient is provided
            PrismaModule,
          ],
          adapter: new TransactionalAdapterPrisma({
            // the injection token of the PrismaClient
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
