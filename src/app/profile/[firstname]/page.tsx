export default function User({ params }: { params: { firstname: string } }) {
  return (
    <div>
      <h2>This is {params.firstname}</h2>
    </div>
  );
}
