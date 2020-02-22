import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import DeliveryCancelledMail from '../jobs/DeliveryCancelledMail';

class DeliveryProblemController {
  async index(req, res) {
    const { delivery_id } = req.params;

    if (!delivery_id) {
      return res.status(400).json({ error: 'Delivery id not found' });
    }

    const deliveryProblems = await DeliveryProblem.findByPk(delivery_id);

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    if (!delivery_id) {
      return res.status(400).json({ error: 'Delivery id not found' });
    }

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found.' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      description: req.body.description,
      delivery_id,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found.' });
    }

    const cancelled_delivery = await delivery.update({
      canceled_at: new Date(),
    });

    const deliveryman = await DeliveryMan.findOne({
      where: {
        id: delivery.deliveryman_id,
      },
    });

    await Queue.add(DeliveryCancelledMail.key, {
      deliveryman,
      product: delivery.product,
    });

    return res.json(cancelled_delivery);
  }
}

export default new DeliveryProblemController();
