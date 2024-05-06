export interface IuranDocument {
  id: string
  tempat: string
  nominal: number
  tanggal: {
    seconds: number
    nanoseconds: number
  }
  tagihanMember?: {
    [key: string]: {
      total: number
      bayar: number
    }
  }
}
