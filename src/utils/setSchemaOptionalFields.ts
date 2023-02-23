interface TObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const setSchemaOptionalFields = (
  schema: TObj,
  schemaOptional: TObj
): TObj => {
  Object.keys(schemaOptional).forEach(opt => {
    if (schemaOptional[opt]) {
      schema[opt] = schemaOptional[opt]
    }
  })
  return schema
}
