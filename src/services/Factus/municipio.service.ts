
import type { Municipio } from '../../models/municipio';
import QueryService from '../query.service';

export default new class MunicipioService extends QueryService<Municipio>{
  constructor() {
    super(`/municipalities`, 'municipios');
  }
};