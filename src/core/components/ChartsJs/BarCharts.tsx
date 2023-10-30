import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export type BarChartModel = {
  labels: string[];
  datasets: BarChartDataSetModel[];
};

export type BarChartDataSetModel = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderWidth: string[];
};

interface BarChartsProps {
  data: BarChartModel;
}

export const BarCharts: React.FC<BarChartsProps> = ({ data }) => {
  const options = { maintainAspectRatio: false };

  return (
    <div className="flex justify-center">
      <Bar data={data} options={options} width={405} height={250} />
    </div>
  );
};

export const defaultBarChartModel = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [],
      borderWidth: [],
    },
  ],
};
