import React from "react";

import styles from "./footer.module.css";

export const Footer = () => (
  <div
    className={`row p-5 justify-content-center align-items-center ${styles.bottomdiv}`}
  >
    <span>
      Desenvolvido por Resultados Digitais. Traduzido por Viajar faz Bem.
    </span>
  </div>
);
