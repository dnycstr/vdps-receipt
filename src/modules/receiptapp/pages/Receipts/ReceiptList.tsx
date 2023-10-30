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
import { getNextPage, getPreviousPage } from '@utils/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const ReceiptList: React.FC = () => {
  const [dataUrlQueryPage, setDataUrlQueryPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultReceiptTableViewModel);

  const loadData = () => {
    setIsLoading(true);

    ReceiptService.getList(dataUrlQueryPage, DEFAULT_PAGE_SIZE).then(
      (result) => {
        setData(result);
        console.log(result);
        setIsLoading(false);
      }
    );
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
    console.log('useEffect LoadData');
    loadData();
  }, [dataUrlQueryPage]);

  return (
    <>
      <Box>
        <TableSearchHead
          searchEnabled={false}
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
                      <TableHeaderLeft>Date</TableHeaderLeft>
                      <TableHeaderCenter>Name</TableHeaderCenter>
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
