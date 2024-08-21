interface Props {
  text: string;
}
const FormError: React.FC<Props> = ({ text }) => {
  return <p className="text-red-500">{text}</p>;
};

export default FormError;
