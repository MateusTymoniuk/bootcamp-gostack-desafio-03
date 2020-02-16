import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega cadastrada.',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.nome,
        product,
      },
    });
  }
}

export default new NewDeliveryMail();
