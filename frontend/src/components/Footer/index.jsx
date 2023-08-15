const Footer = () => {
  return (
    <footer className="my-8 flex flex-col px-8">
    <hr className="border-1 border-gray-300" />
      <p className="text-black text-lg mt-4 font-normal text-center">
        © {new Date().getFullYear()} Manage. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
