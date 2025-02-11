export const userInfoQ = `{
  user {
    attrs
    createdAt
    campus
  }
}`;
export const startAtQ=`{
 user{
  sessions{
    started_at
  }
}
}`
export const transactionQ = ` {
    transaction{
        type
        amount
        createdAt
        path
        campus
    }
}`;

export const piscineGoFall = `{
  progress_aggregate(
    where: {_and: [{path: {_like: "/oujda/piscine-go/%"}}, {grade: {_eq: 0}}]}
  ) {
    aggregate {
      count
    }
  }
}
`;
export const piscineGoPass = `{
  progress_aggregate(
    where: {_and: [{path: {_like: "/oujda/piscine-go/%"}}, {grade: {_eq: 1}}]}
  ) {
    aggregate {
      count
    }
  }
}
`;

export const piscineJsFall=`{
  progress_aggregate(
    where: {_and: [{path: {_like: "/oujda/module/piscine-js/%"}}, {grade: {_eq: 0}}]}
  ) {
    aggregate {
      count
    }
  }
}`
export const piscineJsPass=`{
  progress_aggregate(
    where: {_and: [{path: {_like: "/oujda/module/piscine-js/%"}}, {grade: {_eq: 1}}]}
  ) {
    aggregate {
      count
    }
  }
}`
export const moduleFall=`{
  progress_aggregate(
    where: {
      _and: [
        { path: { _like: "/oujda/module/%" } },
        { path: { _nlike: "/oujda/module/checkpoint%" } },
        { path: { _nlike: "/oujda/module/piscine-js/%" } },
        { grade: { _lt: 1 } }  
      ]
    }
  ) {
    aggregate {
      count
    }
  }
}`
export const modulePass=`{
  progress_aggregate(
    where: {
      _and: [
        { path: { _like: "/oujda/module/%" } },
        { path: { _nlike: "/oujda/module/checkpoint%" } },
        { path: { _nlike: "/oujda/module/piscine-js/%" } },
        { grade: { _gt: 1 } }  
      ]
    }
  ) {
    aggregate {
      count
    }
  }
}`

export const checkpointPass=`{
  progress_aggregate(
    where: {
      _and: [
        { path: { _like: "/oujda/module/checkpoint%" } },
        { grade: { _eq: 1 } }  
      ]
    }
  ) {
    aggregate {
      count
    }
  }
}`
export const checkpointFail=`{
  progress_aggregate(
    where: {
      _and: [
        { path: { _like: "/oujda/module/checkpoint%" } },
        { grade: { _eq: 0 } }  
      ]
    }
  ) {
    aggregate {
      count
    }
  }
}`