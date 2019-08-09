export interface KasDatagridModel {
  name: string,
  description?: string,
  type?: string,
  createdOn?: string,
  createdBy?: string
}

export class KasDatagridModel implements KasDatagridModel {
  constructor(name: string,
              description?: string,
              type?: string,
              createdOn?: string,
              createdBy?: string) {

  }
}
