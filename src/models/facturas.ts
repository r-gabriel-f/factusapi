export type Facturas = {
  data?:       Datum[];
  pagination?: Pagination;
}

export type Datum = {
  id?:                          number;
  number?:                      string;
  api_client_name?:             string;
  reference_code?:              string;
  identification?:              string;
  graphic_representation_name?: string;
  company?:                     string;
  trade_name?:                  string;
  names?:                       string;
  email?:                       string;
  total?:                       string;
  status?:                      number;
  errors?:                      any[];
  send_email?:                  number;
  has_claim?:                   number;
  is_negotiable_instrument?:    number;
  payment_form?:                PaymentForm;
  created_at?:                  string;
  credit_notes?:                any[];
  debit_notes?:                 any[];
}

export type PaymentForm = {
  code?: string;
  name?: Name;
}

export type Name = string;

export type Pagination = {
  total?:        number;
  per_page?:     number;
  current_page?: number;
  last_page?:    number;
  from?:         number;
  to?:           number;
  links?:        Link[];
}

export type Link = {
  url?:    null | string;
  label?:  number | string;
  active?: boolean;
  page?:   number;
}

export type Company = '' | "Halltec S.a.s";

export type ItNote = {
  id?:     number;
  number?: string;
}

export type Verfactura = {
  file_name?:           string;
  pdf_base_64_encoded?: string;
}
