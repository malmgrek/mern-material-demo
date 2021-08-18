import React, { useEffect } from "react";

import { DataGrid } from "@material-ui/data-grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { getReservations, removeItem } from "../actions/itemActions";

// NOTE: Interesting reading
//       - State or props? https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props
//       - Especially https://github.com/uberVU/react-guide/blob/master/props-vs-state.md

const Stash = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  function handleDeleteRow(id) {
    dispatch(removeItem(id));
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div style={{ height: 400, width: "90%", margin: "auto" }}>
          <DataGrid
            rows={reservations ? reservations : []}
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
        </div>
      </main>
    </>
  );
};

export default Stash;
