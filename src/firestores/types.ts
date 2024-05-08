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
      tagihan?: number
      bayar: number
    }
  }
}

export interface MemberDocument {
  nama: string
  sudahDapat: boolean
  gelarDepan?: string
}
