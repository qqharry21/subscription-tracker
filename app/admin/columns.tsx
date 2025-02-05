import { Tables } from "@/lib/database.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tables<"subscription">>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
