import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      deliveryman,
      recipient,
      product,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient does not exist' });
      }
    }

    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exist' });
      }
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found.' });
    }

    await delivery.destroy();
    return res.json({
      message: `Delivery ${delivery.id} deleted successfully`,
    });
  }
}

export default new DeliveryController();
