import { Button } from "@/components/ui/button";
import Section from "@/components/user/Section";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(`/${route}`);
  };
  return (
    <>
      <Section>
        <div className="flex justify-center items-center h-screen flex-col gap-3">
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-5xl font-bold">Hajiri</h1>
            <p className="text-sm">"Keep your attendance like attendance."</p>
          </div>
          <div className="flex gap-6">
            <Button onClick={() => handleNavigate("register")}>Register</Button>
            <Button variant="outline" onClick={() => handleNavigate("login")}>
              Login
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
