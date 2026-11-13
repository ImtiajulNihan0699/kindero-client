
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EventActionsProps {
  showEdit?: boolean;
  showDelete?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EventActions({
  onEdit,
  onDelete,
  showEdit = true,
  showDelete = true,
}: EventActionsProps) {
  return (
    <div className="flex w-full gap-2">
      {showEdit && (
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onEdit}
        >
          <Pencil className="size-4" />
          Edit
        </Button>
      )}

      {showDelete && (
        <Button
          type="button"
          variant="destructive"
          className="flex-1"
          onClick={onDelete}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      )}
    </div>
  );
}
