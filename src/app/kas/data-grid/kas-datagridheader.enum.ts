import {EnumOperation} from '../../shared/enums/enum-operation';

export enum ConfigurationImportTableColumn {
  NAME = 'name',
  DESCRIPTION = 'description',
  TYPE = 'type',
  CREATED_ON = 'createdOn',
  CREATED_BY = 'createdBy',
  ACTION = 'Action'
}

export namespace ConfigurationImportTableColumn {

  export function values() {
    return EnumOperation.values(ConfigurationImportTableColumn);
  }
}
