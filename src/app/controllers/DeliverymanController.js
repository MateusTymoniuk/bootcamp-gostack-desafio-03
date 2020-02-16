import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failed.' });
    }

    const avatarId = req.body.avatar_id;
    if (avatarId) {
      const file = await File.findByPk(avatarId);

      if (!file) {
        return res.status(400).json({ error: 'Validations failed.' });
      }
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.status(201).json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failed.' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found.' });
    }

    const avatarId = req.body.avatar_id;
    if (avatarId) {
      const file = await File.findByPk(avatarId);

      if (!file) {
        return res.status(400).json({ error: 'Validations failed.' });
      }
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found.' });
    }

    const { id } = await deliveryman.destroy();
    return res.json(id);
  }
}

export default new DeliverymanController();
