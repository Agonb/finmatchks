import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export interface Loan {
  id: string;
  company: string;
  trust: number;
  readiness: number;
  amount: string;
  collateral: string;
  pitchId: number;
  logo: string;
  badges: string[];
  files: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

interface LoanTableProps {
  loans: Loan[];
  onViewLoan: (loan: Loan) => void;
}

const LoanTable: React.FC<LoanTableProps> = ({ loans, onViewLoan }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Trust
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Readiness
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {loans.map((loan, index) => (
            <motion.tr
              key={loan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-dark-700 cursor-pointer"
              onClick={() => onViewLoan(loan)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
                    <img src={loan.logo} alt={loan.company} className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{loan.company}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <span className="text-sm text-primary font-semibold">{loan.trust}</span>
                  <span className="text-sm text-gray-400">/100</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <span className="text-sm text-primary font-semibold">{loan.readiness}</span>
                  <span className="text-sm text-gray-400">/10</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-white">€{loan.amount}</div>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="text-primary hover:text-primary-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewLoan(loan);
                  }}
                >
                  <Eye size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;