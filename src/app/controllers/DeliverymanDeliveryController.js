import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  parseISO,
  startOfHour,
  isWithinInterval,
  isBefore,
  setHours,
} from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanDeliveryController {
  /**
   * Route to search all deliveries of one deliveryman.
   * To search for already delivered items, pass delivered=true on query params
   */
  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const { delivered = false } = req.query;

    if (delivered) {
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: id,
          end_date: {
            [Op.not]: null,
          },
        },
      });

      return res.json(deliveries);
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(deliveries);
  }

  /**
   * Route to start a delivery by a deliveryman
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { start_date } = req.body;
    const parsedStartDate = parseISO(start_date);

    if (isBefore(parsedStartDate, setHours(new Date(), 0))) {
      return res
        .status(400)
        .json({ error: 'Start date cannot be before actual date' });
    }

    if (
      !isWithinInterval(parsedStartDate, {
        start: startOfHour(setHours(new Date(), 8)),
        end: startOfHour(setHours(new Date(), 18)),
      })
    ) {
      return res
        .status(400)
        .json({ error: 'Start date must be between 08:00 and 18:00' });
    }

    const { id, delivery_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [
            startOfHour(setHours(new Date(), 8)),
            startOfHour(setHours(new Date(), 18)),
          ],
        },
      },
    });

    if (deliveries && deliveries.length === 5) {
      return res
        .status(400)
        .json({ error: 'You can only have 5 deliveries per day.' });
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  /**
   * Route to end a delivery by a deliveryman
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
      signature_id: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failed.' });
    }

    const { id, delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery already finished.' });
    }

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' });
    }

    const signatureId = req.body.signature_id;
    if (signatureId) {
      const file = await File.findByPk(signatureId);

      if (!file) {
        return res.status(400).json({ error: 'Signature file not found.' });
      }
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }
}

export default new DeliverymanDeliveryController();
