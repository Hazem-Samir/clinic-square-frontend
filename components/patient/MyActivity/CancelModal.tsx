import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
    } from "@/components/ui/alert-dialog"
    
    type CancelModalProps = {
      isOpen: boolean
      onClose: () => void
      onConfirm: () => void
      itemName: string
    }
    
    export default function CancelModal({ isOpen, onClose, onConfirm, itemName }: CancelModalProps) {
      return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently cancel your {itemName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
    
    