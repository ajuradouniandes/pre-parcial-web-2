// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelPlansModule } from './travelplans/travelplans.module';
import { UsersModule } from './users/users.module';
import { AuditMiddleware } from './middleware/audit.middleware';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/traveldb'),
        TravelPlansModule,
        UsersModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuditMiddleware).forRoutes('travel-plans', 'users');
    }
}