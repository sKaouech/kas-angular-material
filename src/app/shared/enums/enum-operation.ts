export namespace EnumOperation {

  export function values(Enum) {
    return Object.keys(Enum)
      .filter((type) => isNaN(type as any) && type !== 'values')
      .map(k => Enum[k]);
  }
}
