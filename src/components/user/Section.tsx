interface Props {
  children?: React.ReactNode;
  style?: string;
}

const Section: React.FC<Props> = ({ children, style }) => {
  return <div className={`h-screen w-screen   ${style}`}>{children}</div>;
};

export default Section;
