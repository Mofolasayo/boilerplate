"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/layout/data-table";
import type { Account } from "@/db/schema";

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Account",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.getValue<string>("createdAt")).toLocaleDateString(),
  },
];

interface AccountTableProps {
  data: Account[];
}

export const AccountTable = ({ data }: AccountTableProps) => {
  return <DataTable columns={columns} data={data} />;
};
