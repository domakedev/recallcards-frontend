import { useEffect, useRef } from "react";

const RealisticCat = () => {
  const catRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef<number>(0); // Referencia para almacenar la última posición del gato

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;

    let x = 0;
    let dx = 1; // Velocidad inicial en x (puedes ajustar según sea necesario)
    let isMovingRight = true; // Variable para mantener el estado de dirección

    const updateMaxValues = () => {
      maxX = window.innerWidth - cat.offsetWidth;
    };

    let maxX = window.innerWidth - cat.offsetWidth;

    const moveCat = () => {
      if (Math.random() < 0.01) {
        // Cambio aleatorio de dirección
        dx = (Math.random() * 2 - 1) * 0.5; // Ajuste en el cambio de dirección
      }

      // Actualizar límites de pantalla
      maxX = window.innerWidth - cat.offsetWidth;

      // Verificar y actualizar posición
      if (x + dx > maxX || x + dx < 0) {
        dx = -dx;
        isMovingRight = dx > 0; // Actualizar el estado de dirección
      }

      // Mover el gato
      x += dx;

      // Verificar si ha pasado más de 1 segundo desde la última vez que se volvió
      const currentTime = Date.now();
      if (currentTime - lastPositionRef.current > 500) {
        // Si está moviéndose hacia la derecha, voltear la imagen
        if (isMovingRight) {
          cat.style.transform = "scaleX(-1)";
        } else {
          cat.style.transform = "scaleX(1)";
        }
        // Actualizar la última posición
        lastPositionRef.current = currentTime;
      }

      // Aplicar transformación de posición
      cat.style.transform = `translateX(${x}px)`;

      // Solicitar el siguiente cuadro de animación
      requestAnimationFrame(moveCat);
    };

    // Manejar redimensionamiento de la ventana
    window.addEventListener("resize", updateMaxValues);

    // Iniciar movimiento del gato
    moveCat();

    // Limpiar listener de redimensionamiento al desmontar
    return () => {
      window.removeEventListener("resize", updateMaxValues);
    };
  }, []);

  return (
    <div
      ref={catRef}
      className="absolute top-0 left-0 w-12 h-12"
    >
      <img
        src="https://i.seadn.io/gae/5Z8utCBQ5HO87kqCsFbj59h6Xtax5B6uaIHnA9JUq_dGVWC53t9S6VZOw9rvUTxwkw0M8QbqjfHz4FWGlqH5jPi7YuYKr1GWJpcvzjo?auto=format&dpr=1&w=1000"
        alt="Cat"
        className="w-full h-full"
        style={{
          transform: "scaleX(1)",
          transition: "transform 0.2s ease-in-out",
        }} // Inicialmente sin volteo
      />
    </div>
  );
};

export default RealisticCat;
