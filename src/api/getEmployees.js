import employeeQuery from "../constants/endpoints";
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'bxno5me3',
  dataset: 'development',
}); 

export default function getEmployees () {
  return client.fetch(employeeQuery)
    .then(result => result)
    .catch(error => error);
}