export default function Item(props) {
  return (
    <li className="border justify-content-between align-item-end d-flex text-break m-1">
      <div className="p-2">hello </div>
      <button
        className="btn btn-danger h-20"
        onClick={() => props.delFunc(props.id)}>
        Supprimer
      </button>
    </li>
  );
}
