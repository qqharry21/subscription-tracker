import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const UnsavedAlertDialog = ({
  open,
  onOpenChange,
  onContinueAction,
  onCanceledAction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueAction?: () => void;
  onCanceledAction?: () => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Unsaved changes will be lost. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCanceledAction}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onContinueAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
