import { Thead, Tr, Th } from "@chakra-ui/react";

const TableHeader: React.FC<{ tableHeaders: string[] }> = ({
  tableHeaders,
}) => {
  return (
    <Thead>
      <Tr>
        {tableHeaders.map((header, index) => (
          <Th display={{ base: "none", md: "table-cell" }} key={index}>
            {header}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default TableHeader;
