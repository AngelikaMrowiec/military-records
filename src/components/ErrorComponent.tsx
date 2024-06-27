type Props = {
  title: string;
  message: string;
};
export default function ErrorComponent({ title, message }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
