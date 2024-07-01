import { FaWhatsapp } from "react-icons/fa";

const SolicitarAcceso = () => {
  return (
    <blockquote className="bg-yellow-200 p-4 rounded-lg shadow-md flex items-center gap-2">
      <p className="text-base font-semibold">
        ⚠️ Si deseas crear contenido solicita acceso en:
      </p>
      <a
        href="https://api.whatsapp.com/send?phone=51943047804&text=Hola%2C%20me%20gustaria%20contactar%20contigo%20sobre%3A%20"
        className="text-green-800 hover:text-green-600"
        target="_blank"
      >
        <FaWhatsapp size={24} />
      </a>
    </blockquote>
  );
};

export default SolicitarAcceso;
