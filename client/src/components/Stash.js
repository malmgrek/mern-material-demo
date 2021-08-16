import React, { useEffect, useState } from "react";

import { DataGrid } from "@material-ui/data-grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import api from "../api";

// TODO: Change to functional form
// TODO: Change basket contents to localStorage
// NOTE: Interesting reading
//       - State or props? https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props
//       - Especially https://github.com/uberVU/react-guide/blob/master/props-vs-state.md

const Stash = () => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const checkTakenItems = async () => {
      const {
        data: { data },
      } = await api.readTakenItems();
      setRows(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          rating: item.rating,
        }))
      );
    };
    checkTakenItems();
  }, []);

  async function handleDeleteRow(id) {
    const { data } = await api.releaseItem(id);
    setRows(rows.filter((item) => item.id !== data.id));
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div style={{ height: 400, width: "90%", margin: "auto" }}>
          {!rows ? null : (
            <DataGrid
              rows={rows}
              columns={[
                { field: "name", headerName: "Name", width: 300 },
                {
                  field: "rating",
                  headerName: "Rating",
                  width: 130,
                  type: "number",
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  sortable: false,
                  width: 150,
                  renderCell: (params) => (
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteRow(params.row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ),
                },
                // NOTE: a value getter like below is supported
                // {
                //   field: "fullName",
                //   headerName: "Full name",
                //   description: "This column has a value getter and is not sortable.",
                //   sortable: false,
                //   width: 160,
                //   valueGetter: (params) =>
                //     `${params.getValue("firstName") || ""} ${params.getValue("lastName") || ""}`,
                // },
              ]}
              pageSize={10}
              /* checkboxSelection */
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Stash;
