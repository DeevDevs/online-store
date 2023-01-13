import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './prchsModuleContainer.scss';
import PurchaseFormModule from '../purchaseFormModule/PurchaseFormModule';
import CountdownModule from '../countdownModule/CountdownModule';

function PrchsModuleContainer() {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  function countToZero(): void {
    if (counter === 5 || counter === -1) return;
    setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        document.body.style.overflow = 'visible';
        navigate('/');
        setCounter(5);
      }
    }, 1000);
  }

  useEffect((): void => {
    countToZero();
  }, [counter]);

  return (
    <div className="pchs-module-overlay hidden dissolved">
      <CountdownModule seconds={counter} />
      <PurchaseFormModule setCounter={setCounter} />
    </div>
  );
}

export default PrchsModuleContainer;
