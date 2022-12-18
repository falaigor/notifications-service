import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Notification } from '@application/entities/notification';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { NotificationsRepository } from '@application/repositories/notifications.repository';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
      select: {
        id: true,
        canceledAt: true,
        category: true,
        content: true,
        createdAt: true,
        readAt: true,
        recipientId: true,
      },
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
