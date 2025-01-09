
import type { Unidadmedida } from '../../models/unidadmedida';
import QueryService from '../query.service';

export default new class UnidadmedidaService extends QueryService<Unidadmedida>{
  constructor() {
    super(`/measurement-units`, 'unidadmedidas');
  }
};