import { GrGithub } from "react-icons/gr";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { config } from "./data/config";
import { GoMail } from "react-icons/go";

const Footer = () => {
  return (
    <div className="px-4 py-6">
      <div className="bg-[#1D2021] font-inter text-[#D4BE98] py-4 px-12 text-start fixed bottom-0 left-0 w-full flex justify-between items-center">
        <p className="text-lg">
          <a className="text-[#A06776]">S O U R C E&nbsp; C O D E</a> — {config.prodName.toUpperCase()}. THIS WEB PAGE & DESIGN CREATED BY{" "}
          <a href="https://github.com/TPashaxrd">TOPRAK.ALTIN</a>
        </p>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/TPashaxrd">
            <GrGithub className="text-2xl" />
          </a>
          <a href="https://twitter.com/">
            <FaTwitter className="text-2xl" />
          </a>
          <a href={config.mail}>
            <GoMail className="text-2xl"/>
          </a>
          <a href="https://instagram.com/toprak.altins">
           <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;