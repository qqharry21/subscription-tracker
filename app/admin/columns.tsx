import { Tables } from "@/types/supabase";
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
