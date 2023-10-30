import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from 'react-chartjs-2';

export type PieChartModel = {
  labels: string[];
  datasets: PieChartDataSetModel[];
};

export type PieChartDataSetModel = {
  data: number[];
  backgroundColor: string[];
};

interface PieChartsProps {
  data: PieChartModel;
  onLabelClick: (label: string) => void;
}

export const PieCharts: React.FC<PieChartsProps> = ({ data, onLabelClick }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    onClick: (event: MouseEvent, elements: any[]) => {
      if (elements.length > 0) {
        const segmentIndex = elements[0].index;
        const label = data.labels[segmentIndex];
        onLabelClick(label);
      }
    },
  };

  return (
    <>
      <div className="p-5 w-full flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </>
  );
};

export const defaultPieChartModel = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
};
