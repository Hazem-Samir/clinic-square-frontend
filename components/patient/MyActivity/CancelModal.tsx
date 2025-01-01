import Spinner from "@/components/Spinner"
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
      isLoading: boolean
      onClose: () => void
      onConfirm: () => void
      itemName: string
    }
    
    export default function CancelModal({ isOpen, onClose, onConfirm,isLoading, itemName }: CancelModalProps) {
      return (
        <AlertDialog open={isOpen} >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently cancel your {itemName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>{onConfirm()}}>{isLoading?<Spinner />:"Confirm"}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
    
    