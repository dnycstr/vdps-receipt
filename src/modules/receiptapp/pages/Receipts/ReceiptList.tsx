import { useEffect, useState } from 'react';

import { Box, BoxBodyColumn } from '@components/Box';
import { TableContainer } from '@components/Container';
import { PrimaryActionLink, PrimaryLink } from '@components/Links';
import { Loading } from '@components/Loading';
import {
  Pagination,
  Table,
  TableDataCenter,
  TableDataLeft,
  TableDataRight,
  TableHeaderCenter,
  TableHeaderLeft,
  TableHeaderRight,
  TableSearchHead,
} from '@components/Table';
import { routes } from '@config/routes';
import { defaultReceiptTableViewModel } from '@models/Receipt';
import { ReceiptService } from '@services/Receipt';
import { numberFormat } from '@utils/numberFormat';
import { getNextPage, getPreviousPage } from '@utils/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const ReceiptList: React.FC = () => {
  const [dataUrlQueryPage, setDataUrlQueryPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultReceiptTableViewModel);
  const [searchString, setSearchString] = useState('');
  const [academicYearFilter, setAcademicYearFilter] = useState<string>('');
  const [paymentDateFilter, setPaymentDateFilter] = useState<string>('');
  const [yearLevelFilter, setYearLevelFilter] = useState<string>('');

  const loadData = () => {
    setIsLoading(true);

    ReceiptService.getList(
      dataUrlQueryPage,
      DEFAULT_PAGE_SIZE,
      searchString,
      yearLevelFilter,
      academicYearFilter,
      paymentDateFilter
    ).then((result) => {
      setData(result);
      setIsLoading(false);
    });
  };

  const nextPage = () => {
    const nextPage = getNextPage(data.page, data.totalPages);
    setDataUrlQueryPage(nextPage);
  };

  const previousPage = () => {
    const prevPage = getPreviousPage(data.page);
    setDataUrlQueryPage(prevPage);
  };

  const deleteRecord = (id: number) => {
    ReceiptService.delete(id)
      .then((response) => {
        if (response === true) {
          loadData();
        }
      })
      .catch((error) => {
        console.log('Error: Failed to handle the request.');
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, [dataUrlQueryPage, searchString]);

  return (
    <>
      <Box>
        <div className="w-full flex flex-row justify-between p-2 border-b-2">
          <div className="flex flex-row">
            <input
              type="text"
              className="w-full border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 rounded-md"
              placeholder="Year Level Filter"
              value={yearLevelFilter}
              onChange={(e) => {
                setYearLevelFilter(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 rounded-md"
              placeholder="AY Filter"
              value={academicYearFilter}
              onChange={(e) => {
                setAcademicYearFilter(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-full border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 rounded-md"
              placeholder="Payment Date Filter"
              value={paymentDateFilter}
              onChange={(e) => {
                setPaymentDateFilter(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={loadData}
            >
              Filter
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-400 text-gray-700 hover:text-white font-bold py-2 px-4 rounded-md"
              onClick={() => {
                setAcademicYearFilter('');
                setYearLevelFilter('');
                setPaymentDateFilter('');
                loadData();
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <TableSearchHead
          searchEnabled={true}
          setSearchString={setSearchString}
          loadData={loadData}
          createRoute={`${routes.RECEIPTS}/create`}
        />
        <BoxBodyColumn>
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <TableHeaderLeft>Payment Date</TableHeaderLeft>
                      <TableHeaderCenter>Name</TableHeaderCenter>
                      <TableHeaderCenter>Year Level</TableHeaderCenter>
                      <TableHeaderCenter>A.Y.</TableHeaderCenter>
                      <TableHeaderCenter>
                        <div className="w-full text-center">Total</div>
                      </TableHeaderCenter>
                      <TableHeaderRight></TableHeaderRight>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.data.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? undefined : 'bg-gray-50'}
                      >
                        <TableDataLeft>
                          {row.paymentDate.toString().substring(0, 10)}
                        </TableDataLeft>
                        <TableDataCenter>{row.payee}</TableDataCenter>
                        <TableDataCenter>{row.yearLevel}</TableDataCenter>
                        <TableDataCenter>{row.academicYear}</TableDataCenter>
                        <TableDataCenter>
                          <div className="w-full text-right">
                            <span className="mr-2">₱</span>
                            {numberFormat.format(
                              Number(
                                row.items.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue.total,
                                  0
                                )
                              )
                            )}
                          </div>
                        </TableDataCenter>
                        <TableDataRight>
                          <PrimaryActionLink
                            id={Number(row.id)}
                            onClick={deleteRecord}
                          >
                            Delete
                          </PrimaryActionLink>

                          <PrimaryLink to={`${routes.RECEIPTS}/${row.id}`}>
                            Details
                          </PrimaryLink>

                          <PrimaryLink to={`${routes.RECEIPTS}/${row.id}/edit`}>
                            Edit
                          </PrimaryLink>
                        </TableDataRight>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
              <Pagination
                page={data.page}
                pageSize={data.pageSize}
                total={data.total}
                onPrevious={() => (data.page > 0 ? previousPage() : undefined)}
                onNext={() =>
                  data.page < data.totalPages ? nextPage() : undefined
                }
              />
            </>
          )}
        </BoxBodyColumn>
      </Box>
    </>
  );
};
