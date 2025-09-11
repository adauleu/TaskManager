import { useParams } from 'react-router-dom'

export default function EditTask() {
  const { id } = useParams()
  return <div>Edit {id}</div>
}
