import Mail from '../../lib/Mail';

class DeliveryCancelledMail {
  get key() {
    return 'DeliveryCancelledMail';
  }

  async handle({ data }) {
    const { deliveryman, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada.',
      template: 'deliveryCancelled',
      context: {
        deliveryman: deliveryman.name,
        product,
      },
    });
  }
}

export default new DeliveryCancelledMail();
