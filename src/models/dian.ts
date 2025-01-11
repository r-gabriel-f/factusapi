export type Dian = {
    company?:           Company;
    customer?:          Customer;
    numbering_range?:   NumberingRange;
    billing_period?:    BillingPeriod;
    bill?:              Bill;
    items?:             Item[];
    withholding_taxes?: any[];
    credit_notes?:      any[];
    debit_notes?:       any[];
}

export type Bill = {
    id?:                       number;
    number?:                   string;
    reference_code?:           string;
    status?:                   number;
    send_email?:               number;
    qr?:                       string;
    cufe?:                     string;
    validated?:                string;
    discount_rate?:            string;
    discount?:                 string;
    gross_value?:              string;
    taxable_amount?:           string;
    tax_amount?:               string;
    total?:                    string;
    observation?:              string;
    errors?:                   string[];
    created_at?:               string;
    payment_due_date?:         null;
    qr_image?:                 string;
    has_claim?:                number;
    is_negotiable_instrument?: number;
    payment_form?:             Payment;
    payment_method?:           Payment;
}

export type Payment = {
    code?: string;
    name?: string;
}

export type BillingPeriod = {
    start_date?: string;
    start_time?: string;
    end_date?:   string;
    end_time?:   string;
}

export type Company = {
    url_logo?:                    string;
    nit?:                         string;
    dv?:                          string;
    company?:                     string;
    name?:                        string;
    graphic_representation_name?: string;
    registration_code?:           string;
    economic_activity?:           string;
    phone?:                       string;
    email?:                       string;
    direction?:                   string;
    municipality?:                string;
}

export type Customer = {
    identification?:              string;
    dv?:                          null;
    graphic_representation_name?: string;
    trade_name?:                  string;
    company?:                     string;
    names?:                       string;
    address?:                     string;
    email?:                       string;
    phone?:                       string;
    legal_organization?:          LegalOrganization;
    tribute?:                     LegalOrganization;
    municipality?:                LegalOrganization;
}

export type LegalOrganization = {
    id?:   number;
    code?: string;
    name?: string;
}

export type Item = {
    code_reference?:    string;
    name?:              string;
    quantity?:          number;
    discount_rate?:     string;
    discount?:          string;
    gross_value?:       string;
    tax_rate?:          string;
    taxable_amount?:    string;
    tax_amount?:        string;
    price?:             string;
    is_excluded?:       number;
    unit_measure?:      LegalOrganization;
    standard_code?:     LegalOrganization;
    tribute?:           LegalOrganization;
    total?:             number;
    withholding_taxes?: any[];
}

export type NumberingRange = {
    prefix?:            string;
    from?:              number;
    to?:                number;
    resolution_number?: string;
    start_date?:        string;
    end_date?:          string;
    months?:            number;
}
