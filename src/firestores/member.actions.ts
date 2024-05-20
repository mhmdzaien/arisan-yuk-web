import { query, orderBy, collection, setDoc, doc, updateDoc } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import { db } from '@/firebaseInit'
import moment from 'moment'

const memberRef = collection(db, 'members')
const seedMember = [
  'GURU AQLI',
  'ABDUL BASIT',
  'ARFAWI',
  'ASIM',
  'BOMAN',
  'FANI',
  'FAUQAL',
  'H.HUSIN',
  'HAMDAN',
  'M. FARID',
  'M. ZAIEN',
  'MUHYAR',
  'RAHMADI',
  'RUSLI',
  'SANI',
  'SUPRIYADI',
  'SOFYAN',
  'TAJUDINOR',
  'TEGUH',
  'USTADZ YASIR',
  'WAHYU',
  'YUDI RAMADHAN',
  'ZAINI',
  'SUPRI NASGOR',
  'BAHRUDIN'
]
export const initialTanggal = async () => {
  seedMember.forEach((row) => {
    setDoc(doc(db, 'members', doc(memberRef).id), {
      nama: row,
      sudahDapat: false,
      tanggalDaftar: moment('2023-01-01', 'YYYY-MM-DD').toDate()
    })
  })
}
