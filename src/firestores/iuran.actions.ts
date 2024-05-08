import { db } from '@/firebaseInit'
import type { IuranDocument } from './types'
import { doc, writeBatch } from 'firebase/firestore'

export const bayarIuran = async (iuran: IuranDocument, memberId: string, nominal: number) => {
  if (!iuran.tagihanMember) {
    iuran.tagihanMember = { [memberId]: { bayar: nominal } }
  } else if (iuran.tagihanMember[memberId]) {
    iuran.tagihanMember[memberId].bayar = nominal
  } else {
    iuran.tagihanMember[memberId] = { bayar: nominal }
  }
  const batch = writeBatch(db)
  batch.set(doc(db, `iuran/${iuran.id}`), iuran)
  batch.set(doc(db, `tagihan/${memberId}/iuranMember/${iuran.id}`), {
    bayar: nominal
  })
  await batch.commit()
}
