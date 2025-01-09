import type { Rangosdenumeracion } from '../../models/rangosdenumeracion';
import QueryService from '../query.service';

export default new class RangosdenumeracionService extends QueryService<Rangosdenumeracion>{
  constructor() {
    super(`/numbering-ranges`, 'rangosdenumeracion');
  }
};
