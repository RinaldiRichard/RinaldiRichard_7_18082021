export default function Item(props) {
  return (
    <li className="border justify-content-between align-item-center d-flex m-1">
      <div className="p-2">{props.txt} </div>
      <button
        className="btn btn-danger h-20"
        onClick={() => props.delFunc(props.id)}>
        Supprimer
      </button>
    </li>
  );
}
