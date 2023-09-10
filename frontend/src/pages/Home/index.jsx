import hero from "../../assets/hero.avif";
import smiling from "../../assets/smiling.webp";
import manage from "../../assets/manage.webp";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="flex mr-4 flex-col h-screen overflow-scroll no-scrollbar max-w-lg-[1200px] lg:items-center">
      <section className="mt-16 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-blue-950">Manage</h1>
          <p className="text-lg font-medium mt-3 text-black">
            Your employees, timesheets, projects, tasks, and entries in one
            place
          </p>

          <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-950 hover:text-white transition-all"            
            onClick={() => navigate("/login")}
            >
              Get Started
            </button>
            <button className="bg-transparent text-blue-950 font-bold py-2 px-4 rounded-full hover:bg-blue-950 hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img src={hero} alt="" className="rounded w-[500px] h-auto " />
        </div>
      </section>
      <section className="mt-16 flex flex-col-reverse lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex-1">
          <img src={smiling} alt="" className="rounded w-[500px] h-auto " />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-blue-950">
            Enjoy the flexibility
          </h1>
          <p className="text-normal font-medium mt-3 text-black max-w-[60ch]">
            Embrace the freedom to work anywhere, anytime, on any device; manage
            your workday from wherever you are. No more endless paperwork, no
            more chasing timesheets, no more hassle. Enjoy the flexibility, feel
            the freedom, and embrace the future of work.
          </p>
          <div className="flex flex-col lg:flex-row items-start justify-start gap-4 mt-8">
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-950 hover:text-white transition-all"            
            onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      <section className="mt-16 flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1">
          <h1 className="text-lg font-bold text-blue-950">
            Manage your employees
          </h1>
          <p className="text-normal font-medium mt-3 text-black max-w-[60ch]">
            Tired of managing your employees&#39; timesheets, projects, tasks,
            and entries in different places? Manage them all in one place with
            Manage. Let your employees focus on what they do best, and let
            Manage do the rest.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-950 hover:text-white transition-all"
            onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img src={manage} alt="" className="rounded w-[500px] h-auto " />
        </div>
      </section>
      <section className="my-16 flex flex-col gap-4 items-start lg:items-center">
        <h1 className="text-2xl font-bold text-blue-950">
          Join the future of work
        </h1>
        <p className="text-normal font-medium mt-3 text-black max-w-[50ch] text-start lg:text-center">
          Manage is the future of work. It&#39;s the only tool you&#39;ll ever
          need to manage your employees, timesheets, projects, tasks, and
          entries. It&#39;s the only tool you&#39;ll ever need to manage your
          workday.
        </p>
        <div className="flex flex-col justify-start gap-4 mt-8">
          <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-950 hover:text-white transition-all"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
