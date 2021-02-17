import Orphanage from '../models/Orphanage';
import image_View from './images_view';

export default {
  render(orphanage: Orphanage) {
    const {
      id,
      instructions,
      about,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
    } = orphanage;
    return {
      id,
      instructions,
      about,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      images: image_View.renderMany(orphanage.images),
    };
  },

  rederMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
