import { useState } from "react";

const TableComponent = ({
  headers,
  rows,
  currentPage,
  itemsPerPage,
  onCheckChange,
  onRowClick, // row 클릭 시 호출할 함수 props 추가
}) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState(
    new Array(rows.length).fill(false)
  );

  // 전체 체크박스 클릭 시 실행되는 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    const updatedCheckedRows = new Array(rows.length).fill(checked);
    setCheckedRows(updatedCheckedRows);
    onCheckChange(updatedCheckedRows); // 체크된 상태를 부모로 전달
  };

  // 개별 row의 체크박스 클릭 시 실행되는 핸들러
  const handleRowCheck = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);
    onCheckChange(updatedCheckedRows); // 체크된 상태를 부모로 전달
  };

  return (
    <table className="table-fixed w-full text-left bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b w-full">
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-4 py-2 border text-center"
              style={{ width: header.width }}
            >
              {header.isCheckbox ? (
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-blue-600"
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                </div>
              ) : (
                header.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick(row)} // row 클릭 시 호출
          >
            {headers.map((header, headerIndex) => (
              <td
                key={headerIndex}
                className="px-4 py-2 text-center"
                style={{ width: header.width }}
              >
                {header.isCheckbox ? (
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-6 w-6 text-blue-600"
                      checked={checkedRows[rowIndex]}
                      onChange={() => handleRowCheck(rowIndex)}
                      onClick={(e) => e.stopPropagation()} // 클릭 시 체크박스 이벤트와 row 클릭 이벤트가 겹치지 않도록 방지
                    />
                  </div>
                ) : header.formatter ? (
                  header.formatter(
                    row,
                    (currentPage - 1) * itemsPerPage + rowIndex + 1
                  )
                ) : (
                  row[header.field] || "-"
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
