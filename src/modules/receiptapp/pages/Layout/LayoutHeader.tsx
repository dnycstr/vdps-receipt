import { useNavigate } from 'react-router-dom';

import vdps from './vdps.png';

export const LayoutHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="bg-green-900 text-white mx-auto flex items-center justify-center"
        onClick={() => {
          navigate('/');
        }}
      >
        <div>
          <img className="h-20 w-20 md:h-32 md:w-32 mx-auto" src={vdps} />
        </div>
        <div className="text-center py-4 md:py-10">
          <div className="text-lg md:text-3xl">VIRGEN DEL PILAR SCHOOL</div>
          <div className="text-xs md:text-base">
            Ilo-Ilo St., Metro Montana, Phase 2,
          </div>
          <div className="text-xs md:text-base">Burgos, 1860 Rodriguez </div>
          <div className="text-xs md:text-base">(Montalban) Rizal </div>
        </div>
      </div>
    </>
  );
};
