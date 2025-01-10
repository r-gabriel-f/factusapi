import type { Facturas } from '../../models/facturas';
import QueryService from '../query.service';

export default new class FacturasService extends QueryService<Facturas>{
  constructor() {
    super(`/bills`, 'facturas');
  }
};