import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query;

    if (!city || !uf || !items)
      return response.status(400).json({ message: 'Faltando parametros' });

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .where('city', 'like', `%${city.toString().toLowerCase()}%`)
      .where('uf', 'like', `%${uf.toString().toLowerCase()}%`)
      .distinct()
      .select('points.*');
    const seriaLizedPoints = points.map((point) => ({
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    }));

    return response.json(seriaLizedPoints);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();
    if (!point)
      return response.status(400).json({ message: 'Point not found' });

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', 'id')
      .select('items.title');

    const seriaLizedPoint = {
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    };

    return response.json({ point: seriaLizedPoint, items });
  }

  public async post(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    console.log(request.body);

    /* const trx = await knex.transaction();
    const point = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image: request.file.filename,
    };

    const insertedPoint = await trx('points').insert(point);

    const point_id = insertedPoint[0];

    const formatedItems = items
      .split(',')
      .map((item: string) => Number.parseInt(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id: insertedPoint[0],
        };
      });

    const pointItems = await trx('points_items').insert(formatedItems);

    await trx.commit(); */

    return response.status(201).json({
      /* id: point_id, ...point */
    });
  }
}
