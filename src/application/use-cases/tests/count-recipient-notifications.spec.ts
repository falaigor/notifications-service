import { CountRecipientNotifications } from '../count-recipient-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification.facotory';

describe('Count notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-two' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-one',
    });

    expect(count).toEqual(2);
  });
});
