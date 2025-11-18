import { useEffect, useState } from "react";

const Alertas = ({alerta}: any ) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
    if (alerta.msg) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  if (!alerta.msg || !visible) return null;

    return (
        <div className={`
    ${alerta.error 
        ? 'from-red-600 to-red-800 border-2 border-red-900' 
        : 'from-blue-600 to-blue-800 border-2 border-blue-900'} 
    bg-gradient-to-br text-center p-4 rounded-lg uppercase text-white font-extrabold text-base 
    shadow-2xl fixed top-5 right-5 z-50 max-w-sm w-full transition-all duration-300 transform 
`}>
    {alerta.msg}
</div>
    );
}

export default Alertas;
