import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"

type NoteLayoutProps = {
  notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()// pegando o id pela url
  const note = notes.find(n => n.id === id)//  procurando nota através  do id

  if (note == null) return <Navigate to="/" replace /> // caso não ache retorna para home

  return <Outlet context={note} />// returnando o context com os dados da nota
}

export function useNote() {
  return useOutletContext<Note>() // hook para usar o context
}
