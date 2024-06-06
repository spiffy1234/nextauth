export default function User({ params }: { params: { user: string } }) {
  return (
    <div>
      <h2>This is {params.user}</h2>
    </div>
  );
}
