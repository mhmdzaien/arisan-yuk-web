import { db } from '@/firebaseInit'
import type { IuranDocument } from './types'
import {
  collection,
  doc,
  orderBy,
  runTransaction,
  writeBatch,
  query,
  where,
  getDocs,
  getDoc,
  type DocumentData
} from 'firebase/firestore'
import { useCollection, useDocument } from 'vuefire'

export const getById = async (id: string) => {
  const data = await useDocument(doc(db, 'iuran', id)).promise.value
  return data
}

export const saveIuran = async (iuran: IuranDocument) => {
  const iuranRef = collection(db, 'iuran')
  const lastIuranRef = await getDocs(
    query(iuranRef, where('tanggal', '<', iuran.tanggal), orderBy('tanggal', 'desc'))
  )
  const members = await getDocs(
    query(collection(db, 'members'), where('tanggalDaftar', '<=', iuran.tanggal))
  )
  const id = iuran.id ?? doc(iuranRef).id
  const batch = writeBatch(db)
  const tagihanMember: { [key: string]: { tagihan?: number; bayar: number } } = {}
  if (lastIuranRef.size > 0) {
    const last = lastIuranRef.docs.at(0)?.data()
    members.docs.forEach((row) => {
      const iuranMember = iuran.tagihanMember?.[row.id] ?? { tagihan: 0, bayar: 0 }
      const tagihanSebelumnya = Number(last?.tagihanMember[row.id]?.tagihan ?? 0)
      const pembayaranSebelumnya = Number(last?.tagihanMember[row.id]?.bayar ?? 0)
      iuranMember.tagihan = tagihanSebelumnya - pembayaranSebelumnya + iuran.nominal
      tagihanMember[row.id] = iuranMember
      batch.set(doc(db, `tagihan/${row.id}/iuranMember/${id}`), iuranMember)
    })
    iuran.tagihanMember = tagihanMember
    batch.set(doc(db, `iuran/${id}`), iuran)
    await batch.commit()
  }
}

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
