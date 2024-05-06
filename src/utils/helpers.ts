import moment from 'moment'
export const formatDate = (timestamp: any) => {
  return moment.unix(timestamp).format('DD MMM YYYY')
}
