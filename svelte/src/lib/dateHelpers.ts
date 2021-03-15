export type ISO8601Datetime = string;

export function dateFormat (d : ISO8601Datetime) : string {
  return new Date(d).toLocaleDateString(undefined, { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
}

export function dateTimeFormat (d : ISO8601Datetime) : string {
  return new Date(d).toLocaleString(undefined, { 
    year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'
  });
}