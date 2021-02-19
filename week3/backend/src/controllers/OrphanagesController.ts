import { Request, Response } from 'express';
import { getConnection, getRepository, Repository } from 'typeorm';
import Image from '../models/Image';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';



export default {

  async index(request: Request, response: Response): Promise<Response> {
    const orphanageRepository = getRepository(Orphanage);
    const orphanges = await orphanageRepository.find({
      relations: ['images'],
    });

    return response.json(orphanageView.rederMany(orphanges));
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const orphanageRepository = getRepository(Orphanage);
    const orphanage = await orphanageRepository.findOneOrFail({
      where: {
        id: Number.parseInt(id),
      },
      relations: ['images'],
    });

    const formatedOrphanage = orphanageView.render(orphanage);

    return response.json(formatedOrphanage);
  },

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Campo requerido'),
      latitude: Yup.number().required('Campo requerido'),
      longitude: Yup.number().required('Campo requerido'),
      about: Yup.string()
        .required('Campo requerido')
        .max(300, 'No máximo 300 caracteres'),
      instructions: Yup.string().required('Campo requerido'),
      opening_hours: Yup.string().required('Campo requerido'),
      open_on_weekends: Yup.boolean().required('Campo requerido'),
      images: Yup.array().of(
        Yup.object({
          path: Yup.string().required('Campo requerido'),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });
    const orphanageRepository = getRepository(Orphanage);
    const newOrphanage = orphanageRepository.create(data);

    const orphanage = await orphanageRepository.save(newOrphanage);

    return response.status(201).json({ orphanage });
  }
}
