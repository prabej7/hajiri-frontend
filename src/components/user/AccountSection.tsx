import useAuth from "@/hooks/useAuth";
import Nav from "./Nav";

interface Props {
  children?: React.ReactNode;
  title?: string;
  titleElement?: React.ReactNode;
  nameSideElement?: React.ReactNode;
}

const AccountSection: React.FC<Props> = ({
  children,
  title,
  titleElement,
  nameSideElement,
}) => {
  useAuth();
  return (
    <div className="flex">
      <Nav>
        <div className="flex-grow px-12 py-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {title && (
                <h1 className="font-bold text-slate-900 text-xl">{title}</h1>
              )}
              {nameSideElement}
            </div>

            {titleElement && <div>{titleElement}</div>}
          </div>
          <div>{children}</div>
        </div>
      </Nav>
    </div>
  );
};

export default AccountSection;
