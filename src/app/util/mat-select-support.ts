export function compareIds(id1: any, id2: any): boolean{
  // console.log(`compare ${id1} to ${id2}`);
  const a1 = determineId(id1);
  const a2 = determineId(id2);
  return a1===a2;
}

export function determineId(id: any): string{
  if(id.constructor.name==='array' && id.length > 0){
    return ''+id[0];
  }
  return ''+id[0];
}
